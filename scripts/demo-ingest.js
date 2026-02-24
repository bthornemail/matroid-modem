#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const inputPath = process.env.DEMO_NDJSON || path.join(root, 'out', 'founding.ndjson');
const baseUrl = process.env.DEMO_GATEWAY_URL || 'http://127.0.0.1:8787';
const ingestUrl = `${baseUrl.replace(/\/+$/, '')}/ingest`;

if (!fs.existsSync(inputPath)) {
  process.stderr.write(`missing input file: ${path.relative(root, inputPath)}\n`);
  process.stderr.write('run `npm run demo:compile` first\n');
  process.exit(1);
}

const body = fs.readFileSync(inputPath, 'utf8');
const res = await fetch(ingestUrl, {
  method: 'POST',
  headers: { 'content-type': 'text/plain' },
  body,
});

if (!res.ok) {
  const text = await res.text();
  process.stderr.write(`ingest failed (${res.status}): ${text}\n`);
  process.exit(1);
}

const json = await res.json();
process.stdout.write(`ingested ${json.lines ?? 'unknown'} lines to ${ingestUrl}\n`);

