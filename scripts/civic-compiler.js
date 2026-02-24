#!/usr/bin/env node
/**
 * Civic Compiler (v0)
 * Markdown → NDJSON civic_triple (+ optional synset_call) records.
 *
 * Design goals:
 * - zero dependencies
 * - deterministic IDs/hashes
 * - NDJSON-native (one JSON object per line)
 */

import fs from 'fs';
import path from 'path';

function parseArgs(argv) {
  const out = {
    input: null,
    basis: 'founding-v1',
    basisHash: null,
    doc: null,
    emitSynset: false,
    max: Infinity,
    now: Date.now(),
  };

  const args = argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--help' || a === '-h') out.help = true;
    else if (a === '--basis' || a === '--basisRef') out.basis = args[++i];
    else if (a === '--basisHash') out.basisHash = args[++i];
    else if (a === '--doc') out.doc = args[++i];
    else if (a === '--emit-synset') out.emitSynset = true;
    else if (a === '--max') out.max = Number(args[++i] || 0) || 0;
    else if (!out.input && !a.startsWith('-')) out.input = a;
    else throw new Error(`Unknown arg: ${a}`);
  }
  return out;
}

function hashStr(s) {
  // same FNV-1a-ish stub used in the portal
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  const a = h.toString(16).padStart(8, '0');
  const b = ((h ^ 0xdeadbeef) >>> 0).toString(16).padStart(8, '0');
  return `0x${a}${b}`;
}

function stableBasisHash({ basis, basisHash }) {
  if (basisHash) return basisHash;
  // Ensure it looks like a hex-ish basis hash to match portal query param expectations.
  const h = hashStr(`basis:${basis}`);
  return h;
}

function stripMarkdown(md) {
  let s = String(md || '');
  // Drop code fences entirely.
  s = s.replace(/```[\s\S]*?```/g, '\n');
  // Inline code → keep content.
  s = s.replace(/`([^`]+)`/g, '$1');
  // Images/links: keep visible text.
  s = s.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  s = s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Headings/bullets → keep text.
  s = s.replace(/^\s{0,3}#{1,6}\s+/gm, '');
  s = s.replace(/^\s*[-*+]\s+/gm, '');
  // Blockquotes
  s = s.replace(/^\s*>\s?/gm, '');
  // Collapse whitespace.
  s = s.replace(/\r\n/g, '\n');
  s = s.replace(/[ \t]+/g, ' ');
  s = s.replace(/\n{3,}/g, '\n\n');
  return s.trim();
}

function splitSentences(text) {
  // Legal docs can be clause-heavy; treat blank lines as hard boundaries, then split on punctuation.
  const paras = String(text || '')
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);

  const out = [];
  for (const p of paras) {
    // Keep semicolons as split points.
    const rough = p
      .replace(/\s+/g, ' ')
      .split(/(?<=[.;!?])\s+(?=[A-Z“"'])/g);
    for (const r of rough) {
      const s = r.trim();
      if (s) out.push(s);
    }
  }
  return out;
}

function pickPredicateToken(s) {
  const tokens = [
    { t: 'ordain and establish', re: /\bordain\s+and\s+establish\b/i },
    { t: 'shall not', re: /\bshall\s+not\b/i },
    { t: 'must not', re: /\bmust\s+not\b/i },
    { t: 'may not', re: /\bmay\s+not\b/i },
    { t: 'shall', re: /\bshall\b/i },
    { t: 'must', re: /\bmust\b/i },
    { t: 'may', re: /\bmay\b/i },
    { t: 'will', re: /\bwill\b/i },
    { t: 'hold', re: /\bhold\b/i },
    { t: 'declare', re: /\bdeclare\b/i },
    { t: 'ordain', re: /\bordain\b/i },
    { t: 'establish', re: /\bestablish\b/i },
    { t: 'secure', re: /\bsecure\b/i },
    { t: 'prohibit', re: /\bprohibit\b/i },
    { t: 'provide', re: /\bprovide\b/i },
  ];

  let best = null;
  for (const tok of tokens) {
    const m = tok.re.exec(s);
    if (!m) continue;
    const idx = m.index;
    if (best === null || idx < best.idx) best = { t: tok.t, idx };
  }
  return best;
}

function extractTriple(sentence) {
  const pred = pickPredicateToken(sentence);
  if (!pred) return null;

  const before = sentence.slice(0, pred.idx).trim();
  const after = sentence.slice(pred.idx + pred.t.length).trim();

  if (!before || !after) return null;

  // Expand predicate phrase a bit: modal + next 1–3 words.
  const afterWords = after.split(/\s+/);
  const verbTail = afterWords.slice(0, 3).join(' ');
  const predicate = `${pred.t}${verbTail ? ' ' + verbTail : ''}`.trim();
  const object = afterWords.slice(3).join(' ').trim() || after;

  const subject = before.replace(/[,:—–-]\s*$/, '').trim();
  return { subject, predicate, object };
}

function classifyQuadrant({ sentence, triple }) {
  const s = `${sentence}`.toLowerCase();
  const subj = `${triple?.subject || ''}`.toLowerCase();
  const pred = `${triple?.predicate || ''}`.toLowerCase();

  if (s.includes('declare') || s.includes('independence') || s.includes('emancipation') || s.includes('shall be free')) return 'UU';
  if (subj.includes('we') || subj.includes('we the people') || s.includes('we the people')) return 'UK';
  if (pred.includes('shall not') || s.startsWith('no ') || s.includes('without ') || s.includes('except ')) return 'KU';
  if (pred.includes('may') || pred.includes('must')) return 'KU';
  if (pred.includes('shall')) return 'KK';
  return 'UU';
}

function computeCoord({ sentence, triple, quadrant }) {
  const subj = `${triple.subject}`.toLowerCase();
  const pred = `${triple.predicate}`.toLowerCase();
  const obj = `${triple.object}`.toLowerCase();

  const x = (() => {
    if (subj.includes('we') || subj.includes('people')) return 0.82;
    if (subj.includes('congress') || subj.includes('president') || subj.includes('states')) return 0.68;
    return 0.55;
  })();

  const y = (() => {
    if (pred.includes('shall not')) return 0.86;
    if (pred.includes('shall')) return 0.74;
    if (pred.includes('must')) return 0.78;
    if (pred.includes('may')) return 0.45;
    if (pred.includes('declare')) return 0.80;
    if (pred.includes('hold')) return 0.62;
    return 0.58;
  })();

  const z = (() => {
    const hasIncidence = sentence.toLowerCase().includes('without ') ||
      sentence.toLowerCase().includes('except ') ||
      sentence.toLowerCase().includes('in time') ||
      sentence.toLowerCase().includes('with consent') ||
      obj.includes('except') ||
      obj.includes('without');
    if (hasIncidence) return 0.72;
    if (quadrant === 'UU') return 0.66;
    return 0.56;
  })();

  const w = (() => {
    // Quantize to 1/8 increments to align with the blackboard spec examples.
    const h = hashStr(`w:${triple.subject}|${triple.predicate}|${triple.object}`);
    const n = parseInt(h.slice(-2), 16) % 8; // 0..7
    return n / 8;
  })();

  return { x, y, z, w };
}

function makeCharacters() {
  return {
    subject: { character: 'Solon', face: 'subject' },
    predicate: { character: 'Solomon', face: 'predicate' },
    object: { character: 'ʿAsabiyyah', face: 'object' },
    centroid: { character: 'Enoch/Metatron', face: 'centroid' },
  };
}

function makeId(prefix, fields) {
  return `${prefix}-${hashStr(fields)}`;
}

function writeNdjson(obj) {
  process.stdout.write(JSON.stringify(obj) + '\n');
}

function main() {
  const opts = parseArgs(process.argv);
  if (opts.help || !opts.input) {
    process.stdout.write(
      [
        'Usage:',
        '  node scripts/civic-compiler.js <input.md> [--basis founding-v1] [--basisHash 0x...] [--doc "Title"] [--emit-synset] [--max N]',
        '',
        'Output:',
        '  NDJSON civic_triple records (and optional synset_call records).',
      ].join('\n') + '\n'
    );
    process.exit(opts.help ? 0 : 1);
  }

  const inputPath = opts.input;
  const md = fs.readFileSync(inputPath, 'utf8');
  const clean = stripMarkdown(md);
  const sentences = splitSentences(clean);

  const basisHash = stableBasisHash({ basis: opts.basis, basisHash: opts.basisHash });
  const doc = opts.doc || path.basename(inputPath, path.extname(inputPath));

  let emitted = 0;
  for (const sentence of sentences) {
    if (emitted >= opts.max) break;
    const triple = extractTriple(sentence);
    if (!triple) continue;

    const quadrant = classifyQuadrant({ sentence, triple });
    const coord = computeCoord({ sentence, triple, quadrant });
    const id = makeId('civic', `${doc}|${sentence}`);

    const record = {
      type: 'civic_triple',
      id,
      t: opts.now,
      basisRef: opts.basis,
      basisHash,
      source: { doc, path: inputPath, sentence },
      quadrant,
      characters: makeCharacters(),
      triple,
      coord,
    };

    writeNdjson(record);
    emitted++;

    if (opts.emitSynset) {
      const call = {
        type: 'synset_call',
        id: makeId('synset', `${id}|call`),
        t: opts.now,
        basisRef: opts.basis,
        basisHash,
        call_id: makeId('call', `${id}`),
        target_coord: coord,
        intent_delta: {
          civic_id: id,
          doc,
          quadrant,
          triple,
          characters: Object.values(record.characters).map((c) => c.character),
        },
      };
      writeNdjson(call);
    }
  }
}

main();
