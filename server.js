import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import mqtt from 'mqtt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const MQTT_URL = process.env.MQTT_URL || 'mqtt://127.0.0.1:1883';
const BASIS = process.env.BASIS || 'default';
const ENTRY_HTML = process.env.ENTRY_HTML || 'wesiri-modem-full-calibrated-autoqr.html';
const MQTT_PUBLISH = process.env.MQTT_PUBLISH !== '0';

const TOPICS = [
  `semantic-basis/${BASIS}/commit`,
  `semantic-basis/${BASIS}/synset-rpc`,
  `semantic-basis/${BASIS}/probe/+/#`,
  `semantic-basis/${BASIS}/panel/+/#`,
  `semantic-basis/${BASIS}/device/+/#`,
];

const app = express();
app.disable('x-powered-by');
app.use(express.text({ type: '*/*', limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

// Serve all repo files (HTML, sw.js, manifest.json, icons, etc.)
app.use(express.static(__dirname, { extensions: ['html'] }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, ENTRY_HTML));
});

function ndjsonLinesFromBody(body) {
  const text = (typeof body === 'string') ? body : JSON.stringify(body);
  return String(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}

app.post('/ingest', (req, res) => {
  const body = req.is('application/json') ? req.body : String(req.body || '');
  const lines = ndjsonLinesFromBody(body);
  for (const line of lines) broadcast(line);
  res.json({ ok: true, lines: lines.length });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(text) {
  const msg = (typeof text === 'string') ? text : JSON.stringify(text);
  for (const ws of wss.clients) {
    if (ws.readyState === ws.OPEN) ws.send(msg);
  }
}

function parseMaybeJson(s) {
  try {
    const obj = JSON.parse(s);
    return obj && typeof obj === 'object' ? obj : null;
  } catch {
    return null;
  }
}

function mqttTopicForRecord(record) {
  const type = record?.type;
  if (!type) return `semantic-basis/${BASIS}/commit`;

  if (type === 'synset_call' || type === 'synset_reply' || type === 'synset_error') {
    return `semantic-basis/${BASIS}/synset-rpc`;
  }
  if (typeof type === 'string' && type.startsWith('probe_')) {
    const deviceId = record.deviceId || record.panelId || record.id || 'unknown';
    const sensor = record.sensor || record.signal || type.slice('probe_'.length);
    return `semantic-basis/${BASIS}/probe/${deviceId}/${sensor}`;
  }
  return `semantic-basis/${BASIS}/commit`;
}

wss.on('connection', (ws, req) => {
  ws.send(JSON.stringify({
    type: 'ws_status',
    t: Date.now(),
    ok: true,
    basis: BASIS,
    topics: TOPICS,
    remote: req.socket.remoteAddress,
  }));

  ws.on('message', (buf) => {
    // Browser → gateway: accept NDJSON lines and re-broadcast (and optionally publish to MQTT).
    const text = buf.toString('utf8');
    const lines = ndjsonLinesFromBody(text);
    for (const line of lines) {
      broadcast(line);
      if (!MQTT_PUBLISH) continue;
      const rec = parseMaybeJson(line);
      if (!rec) continue;
      mqttClient.publish(mqttTopicForRecord(rec), line, { qos: 0 }, () => {});
    }
  });
});

const mqttClient = mqtt.connect(MQTT_URL, {
  clientId: `wesiri-gateway-${Math.random().toString(16).slice(2)}`,
});

mqttClient.on('connect', () => {
  mqttClient.subscribe(TOPICS, { qos: 0 }, (err) => {
    if (err) console.error('MQTT subscribe error:', err);
    else console.log('MQTT subscribed:', TOPICS);
  });
});

mqttClient.on('message', (topic, payload) => {
  const text = payload.toString('utf8');
  // Forward as-is; browser splits/parses as NDJSON lines.
  for (const line of ndjsonLinesFromBody(text)) broadcast(line);

  // Optional lightweight envelope for debugging/observability.
  // Keep it off by default to preserve pure NDJSON streams.
  if (process.env.DEBUG_MQTT_ENVELOPE === '1') {
    broadcast(JSON.stringify({ type: 'mqtt_rx', t: Date.now(), topic, bytes: payload.length }));
  }
});

mqttClient.on('error', (e) => console.error('MQTT error:', e));

app.post('/probe', (req, res) => {
  // Server-side probe emission endpoint (hardware/evidence domain).
  const body = req.is('application/json') ? req.body : String(req.body || '');
  const lines = ndjsonLinesFromBody(body);
  let published = 0;
  for (const line of lines) {
    broadcast(line);
    if (!MQTT_PUBLISH) continue;
    const rec = parseMaybeJson(line);
    if (!rec) continue;
    mqttClient.publish(mqttTopicForRecord(rec), line, { qos: 0 }, () => {});
    published++;
  }
  res.json({ ok: true, lines: lines.length, mqtt_published: published });
});

app.get('/probe/sim', (_req, res) => {
  // Deterministic demo probe (lux) with canonical w_hint=0.125 (col 2).
  const record = {
    type: 'probe_sensor',
    t: Date.now(),
    basisRef: BASIS,
    basisHash: process.env.BASIS_HASH || null,
    deviceId: 'sim-esp32-s3-01',
    sensor: 'lux',
    value: 412,
    unit: 'lux',
    w_hint: 0.125,
  };
  const line = JSON.stringify(record);
  broadcast(line);
  if (MQTT_PUBLISH) mqttClient.publish(mqttTopicForRecord(record), line, { qos: 0 }, () => {});
  res.json({ ok: true, record });
});

server.listen(PORT, () => {
  console.log(`WESIRI gateway: http://127.0.0.1:${PORT}`);
  console.log(`WS bridge: ws://127.0.0.1:${PORT}/ws`);
  console.log(`MQTT: ${MQTT_URL} (basis=${BASIS})`);
  console.log(`Entry: ${ENTRY_HTML}`);
});
