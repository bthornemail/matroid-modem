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
const BASIS_HASH = process.env.BASIS_HASH || null;
const ENTRY_HTML = process.env.ENTRY_HTML || 'wesiri-modem-full-calibrated-autoqr.html';
const MQTT_PUBLISH = process.env.MQTT_PUBLISH !== '0';
const PUBLIC_DIR = path.join(__dirname, 'public');

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
app.use(express.static(PUBLIC_DIR, { extensions: ['html'] }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, ENTRY_HTML));
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

/** @type {Set<{res: import('http').ServerResponse, types: Set<string> | null}>} */
const sseClients = new Set();

function broadcast(text) {
  const msg = (typeof text === 'string') ? text : JSON.stringify(text);
  for (const ws of wss.clients) {
    if (ws.readyState === ws.OPEN) ws.send(msg);
  }
  // SSE fanout (best-effort)
  let parsedType = null;
  for (const client of sseClients) {
    try {
      if (client.types) {
        if (parsedType === null) {
          const rec = parseMaybeJson(msg);
          parsedType = rec?.type ? String(rec.type) : '';
        }
        if (!client.types.has(parsedType)) continue;
      }
      client.res.write(`data: ${msg}\n\n`);
    } catch {
      // if write fails, connection is dead; it will be cleaned up on 'close'
    }
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

function parseTypesFilter(req) {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const raw = url.searchParams.get('types');
  if (!raw) return null;
  const types = new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  );
  return types.size ? types : null;
}

function addHop(record, hop) {
  const next = { ...record };
  const prev = next._hop;
  const arr = Array.isArray(prev) ? prev.slice() : (typeof prev === 'string' ? [prev] : []);
  if (!arr.includes(hop)) arr.push(hop);
  next._hop = arr;
  return next;
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
    basisHash: BASIS_HASH,
    topics: TOPICS,
    remote: req.socket.remoteAddress,
  }));

  ws.on('message', (buf) => {
    // Browser → gateway: accept NDJSON lines and re-broadcast (and optionally publish to MQTT).
    const text = buf.toString('utf8');
    const lines = ndjsonLinesFromBody(text);
    for (const line of lines) {
      const rec = parseMaybeJson(line);
      const stamped = rec ? addHop(rec, 'ws') : null;
      const outLine = stamped ? JSON.stringify(stamped) : line;
      broadcast(outLine);
      if (!MQTT_PUBLISH) continue;
      if (!stamped) continue;
      if (Array.isArray(stamped._hop) && stamped._hop.includes('mqtt')) continue; // loop prevention
      mqttClient.publish(mqttTopicForRecord(stamped), outLine, { qos: 0 }, () => {});
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
  // Smart wrap:
  // - NDJSON payload (contains \n): forward line-split; if a line is JSON, stamp topic + hop.
  // - Single JSON object: add topic provenance + hop stamp, then forward.
  // - Non-JSON: forward as-is.
  if (text.includes('\n')) {
    for (const line of ndjsonLinesFromBody(text)) {
      const rec = parseMaybeJson(line);
      if (rec) {
        const withMeta = addHop(
          {
            ...rec,
            _mqtt_topic: rec._mqtt_topic || topic,
          },
          'mqtt'
        );
        broadcast(JSON.stringify(withMeta));
      } else {
        broadcast(line);
      }
    }
  } else {
    const rec = parseMaybeJson(text);
    if (rec) {
      const withMeta = addHop(
        {
          ...rec,
          _mqtt_topic: rec._mqtt_topic || topic,
        },
        'mqtt'
      );
      broadcast(JSON.stringify(withMeta));
    } else {
      broadcast(text);
    }
  }

  // Optional lightweight envelope for debugging/observability.
  // Keep it off by default to preserve pure NDJSON streams.
  if (process.env.DEBUG_MQTT_ENVELOPE === '1') {
    broadcast(JSON.stringify({ type: 'mqtt_rx', t: Date.now(), topic, bytes: payload.length }));
  }
});

mqttClient.on('error', (e) => console.error('MQTT error:', e));

app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const types = parseTypesFilter(req);
  const client = { res, types };
  sseClients.add(client);

  // Initial status event (as a normal NDJSON line)
  res.write(`data: ${JSON.stringify({ type: 'sse_status', t: Date.now(), ok: true, basis: BASIS, basisHash: BASIS_HASH, types: types ? Array.from(types) : null })}\n\n`);
  res.write(`: connected\n\n`);

  req.on('close', () => {
    sseClients.delete(client);
  });
});

// Keep-alive pings for SSE clients (prevents some proxies from closing idle streams).
setInterval(() => {
  for (const client of sseClients) {
    try {
      client.res.write(`: ping ${Date.now()}\n\n`);
    } catch {}
  }
}, 25_000);

app.post('/probe', (req, res) => {
  // Server-side probe emission endpoint (hardware/evidence domain).
  const body = req.is('application/json') ? req.body : String(req.body || '');
  const lines = ndjsonLinesFromBody(body);
  let published = 0;
  for (const line of lines) {
    const rec = parseMaybeJson(line);
    const stamped = rec ? addHop(rec, 'http_probe') : null;
    const outLine = stamped ? JSON.stringify(stamped) : line;
    broadcast(outLine);
    if (!MQTT_PUBLISH) continue;
    if (!stamped) continue;
    if (Array.isArray(stamped._hop) && stamped._hop.includes('mqtt')) continue; // loop prevention
    mqttClient.publish(mqttTopicForRecord(stamped), outLine, { qos: 0 }, () => {});
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
    basisHash: BASIS_HASH,
    deviceId: 'sim-esp32-s3-01',
    sensor: 'lux',
    value: 412,
    unit: 'lux',
    w_hint: 0.125,
  };
  const stamped = addHop(record, 'http_probe');
  const line = JSON.stringify(stamped);
  broadcast(line);
  if (MQTT_PUBLISH) mqttClient.publish(mqttTopicForRecord(stamped), line, { qos: 0 }, () => {});
  res.json({ ok: true, record: stamped });
});

server.listen(PORT, () => {
  console.log(`WESIRI gateway: http://127.0.0.1:${PORT}`);
  console.log(`WS bridge: ws://127.0.0.1:${PORT}/ws`);
  console.log(`MQTT: ${MQTT_URL} (basis=${BASIS})`);
  console.log(`Entry: ${ENTRY_HTML}`);
});
