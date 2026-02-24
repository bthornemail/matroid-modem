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

// Serve all repo files (HTML, sw.js, manifest.json, icons, etc.)
app.use(express.static(__dirname, { extensions: ['html'] }));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, ENTRY_HTML));
});

app.post('/ingest', (req, res) => {
  const body = String(req.body || '');
  broadcast(body);
  res.json({ ok: true, bytes: body.length });
});

const server = http.createServer(app);

const wss = new WebSocketServer({ server, path: '/ws' });

function broadcast(text) {
  const msg = (typeof text === 'string') ? text : JSON.stringify(text);
  for (const ws of wss.clients) {
    if (ws.readyState === ws.OPEN) ws.send(msg);
  }
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
  broadcast(text);

  // Optional lightweight envelope for debugging/observability.
  // Keep it off by default to preserve pure NDJSON streams.
  if (process.env.DEBUG_MQTT_ENVELOPE === '1') {
    broadcast(JSON.stringify({ type: 'mqtt_rx', t: Date.now(), topic, bytes: payload.length }));
  }
});

mqttClient.on('error', (e) => console.error('MQTT error:', e));

server.listen(PORT, () => {
  console.log(`WESIRI gateway: http://127.0.0.1:${PORT}`);
  console.log(`WS bridge: ws://127.0.0.1:${PORT}/ws`);
  console.log(`MQTT: ${MQTT_URL} (basis=${BASIS})`);
  console.log(`Entry: ${ENTRY_HTML}`);
});

