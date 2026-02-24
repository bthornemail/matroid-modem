#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';

const root = process.cwd();
const manifestPath = path.join(root, 'public', 'docs', 'narrative-series', 'templates.manifest.json');
const outDir = path.join(root, 'out');
const outFile = path.join(outDir, 'founding.ndjson');

if (!fs.existsSync(manifestPath)) {
  process.stderr.write('templates.manifest.json not found. Run `npm run templates:manifest` first.\n');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const basis = process.env.DEMO_BASIS || manifest.templatesVersion || 'founding-v1';
const basisHash = process.env.DEMO_BASIS_HASH || null;
const maxPerDoc = String(process.env.DEMO_MAX_PER_DOC || '40');

fs.mkdirSync(outDir, { recursive: true });
const fd = fs.openSync(outFile, 'w');

const header = {
  type: 'templates_header',
  t: Date.now(),
  basisRef: basis,
  basisHash: basisHash || undefined,
  templatesVersion: manifest.templatesVersion,
  templatesMerkleRoot: manifest.templatesMerkleRoot,
  templateCount: manifest.fileCount,
};
fs.writeSync(fd, JSON.stringify(header) + '\n');

for (const file of manifest.files) {
  const sourcePath = path.join(root, file.path);
  const args = [
    'scripts/civic-compiler.js',
    sourcePath,
    '--basis',
    basis,
    '--emit-synset',
    '--max',
    maxPerDoc,
  ];
  if (basisHash) {
    args.push('--basisHash', basisHash);
  }

  const run = spawnSync('node', args, { cwd: root, encoding: 'utf8' });
  if (run.status !== 0) {
    fs.closeSync(fd);
    process.stderr.write(run.stderr || run.stdout || `compile failed for ${file.path}\n`);
    process.exit(run.status || 1);
  }
  fs.writeSync(fd, run.stdout);
}

fs.closeSync(fd);
process.stdout.write(`wrote ${path.relative(root, outFile)}\n`);

