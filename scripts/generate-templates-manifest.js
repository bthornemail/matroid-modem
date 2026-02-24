#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const root = process.cwd();
const templateRoot = path.join(root, 'public', 'docs', 'narrative-series');
const includeDirs = [
  'America Constitution Series',
  'When Wisdom, Law, and the Tribe Sat Down Together',
];
const outPath = path.join(templateRoot, 'templates.manifest.json');

function sha256(buf) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

function listMarkdownFiles(dirAbs) {
  const out = [];
  const entries = fs.readdirSync(dirAbs, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      out.push(...listMarkdownFiles(abs));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(abs);
    }
  }
  return out;
}

const files = [];
for (const dir of includeDirs) {
  const abs = path.join(templateRoot, dir);
  if (!fs.existsSync(abs)) {
    throw new Error(`Missing template directory: ${abs}`);
  }
  for (const fileAbs of listMarkdownFiles(abs)) {
    const rel = path.relative(root, fileAbs).split(path.sep).join('/');
    const buf = fs.readFileSync(fileAbs);
    files.push({
      path: rel,
      bytes: buf.length,
      sha256: sha256(buf),
    });
  }
}

files.sort((a, b) => a.path.localeCompare(b.path));
const merkleRoot = sha256(Buffer.from(files.map((f) => `${f.path}:${f.sha256}`).join('\n'), 'utf8'));

const manifest = {
  templatesVersion: 'founding-v1',
  generatedAt: new Date().toISOString(),
  includeDirs,
  fileCount: files.length,
  templatesMerkleRoot: merkleRoot,
  files,
};

fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');
process.stdout.write(`wrote ${path.relative(root, outPath)} (${files.length} files)\n`);

