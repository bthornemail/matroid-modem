#!/usr/bin/env node
/**
 * Semantic Basis Protocol — NDJSON ↔ JSON Canvas Streaming Layer
 * ===============================================================
 * Platform-agnostic runtime bridge.
 *
 * DESIGN AXIOMS:
 *   1. The newline \n is the atomic transaction boundary.
 *      One complete JSON object per line = one committed record.
 *   2. Every record is self-describing — it carries its basisRef,
 *      gridPos, face, and canvas type. No external state needed.
 *   3. Pure character encoding — no runtime, VM, or type system
 *      dependency beyond "read bytes until \n, parse JSON".
 *   4. Each record maps to exactly one JSON Canvas node or edge.
 *      The canvas is assembled by any consumer that can read lines.
 *
 * PIPELINE:
 *
 *   [multigraph.json]
 *        │
 *        ▼
 *   emit()  ──→  NDJSON stream (stdout or file)
 *                  one line per node/edge
 *                  each line = atomic SAB write
 *        │
 *        ▼
 *   consume() ──→  JSON Canvas (.canvas)
 *                  valid for Obsidian / any JSON Canvas app
 *        │
 *        ▼
 *   Any compatible computational field:
 *     AWK    — awk -F'\n' '{ process($0) }'   POSIX, zero deps
 *     Haskell— Data.Aeson streaming / eDSL     algebraic closure
 *     Browser— SharedArrayBuffer + Atomics      concurrent reads
 *     WASM   — linear memory, same byte layout  universal target
 *
 * USAGE:
 *   # Emit NDJSON from multigraph
 *   node stream.js emit semantic-multigraph.json > stream.ndjson
 *
 *   # Consume NDJSON into JSON Canvas
 *   node stream.js consume stream.ndjson > canvas.canvas
 *
 *   # Pipe directly (no intermediate file)
 *   node stream.js emit semantic-multigraph.json | node stream.js consume > canvas.canvas
 *
 *   # AWK consumer example (POSIX — processes each record independently)
 *   node stream.js emit semantic-multigraph.json | awk -f process.awk
 *
 * ATOMIC TRANSACTION SEMANTICS:
 *   Each NDJSON line maps to SharedArrayBuffer position:
 *     SAB[record.gridPos[0] * 16 + record.gridPos[1]] = record
 *   Atomics.store() on the row*16+col index.
 *   Atomics.load() to read without lock.
 *   The \n boundary = the Atomics commit point.
 */

'use strict';

const fs   = require('fs');
const path = require('path');
const readline = require('readline');

// ─────────────────────────────────────────────────────────────
// RECORD SCHEMA
// Every NDJSON line is one of these record types.
// The schema is the same regardless of target runtime.
// ─────────────────────────────────────────────────────────────

const RECORD_TYPE = {
  // Canvas primitives
  NODE:   'node',   // → JSON Canvas text node
  EDGE:   'edge',   // → JSON Canvas edge
  GROUP:  'group',  // → JSON Canvas group node

  // Stream control (consumed by runtime, not written to canvas)
  HEADER: 'header', // basis declaration — first record in every stream
  META:   'meta',   // SAB meta row (rows 12-15)
  FLUSH:  'flush',  // signal: all records emitted, canvas is complete
};

// ─────────────────────────────────────────────────────────────
// CANVAS LAYOUT
// The icosahedron projects onto a 2D canvas grid.
// Three face groups at 120° intervals, centroid at origin.
// Units are canvas pixels (JSON Canvas spec uses integers).
// ─────────────────────────────────────────────────────────────

const LAYOUT = {
  origin:    { x: 0,     y: 0    },
  faceRadius: 900,   // distance from origin to face group center
  wordSpread: 220,   // distance between words within a face
  nodeW:      180,
  nodeH:      80,
  groupPad:   70,

  // Face centers at 120° intervals (top, lower-right, lower-left)
  faceCenters: [
    { x:  0,    y: -900 },  // agency  — top
    { x:  779,  y:  450 },  // ethics  — lower right  (900 * cos30, 900 * sin30)
    { x: -779,  y:  450 },  // logic   — lower left
  ],

  // 2×2 word offsets within each face group
  wordOffsets: [
    { dx: -110, dy: -50 },
    { dx:  110, dy: -50 },
    { dx: -110, dy:  50 },
    { dx:  110, dy:  50 },
  ],

  // Canvas colors per face (JSON Canvas preset colors)
  faceColors: {
    agency: '4',   // green
    ethics: '2',   // orange
    logic:  '6',   // purple
  },

  // Drift type → edge color
  driftColors: {
    platonic:    '4',  // green  — canonical
    archimedean: '2',  // orange — inter-document
    catalan:     '6',  // purple — intra-narrative
    stub:        '1',  // red    — corpus stub link
    hypernym:    '5',  // cyan   — wordnet relation
    hyponym:     '5',  // cyan
    null:        '5',  // cyan   — default
  },
};

// ─────────────────────────────────────────────────────────────
// COORDINATE HELPERS
// ─────────────────────────────────────────────────────────────

function faceCenter(faceIndex) {
  return LAYOUT.faceCenters[faceIndex] || LAYOUT.origin;
}

function wordCanvasPos(faceIndex, wordIndex) {
  const center = faceCenter(faceIndex);
  const offset = LAYOUT.wordOffsets[wordIndex] || { dx: 0, dy: 0 };
  return {
    x: center.x + offset.dx,
    y: center.y + offset.dy,
  };
}

function centroidCanvasPos() {
  return {
    x: LAYOUT.origin.x - Math.floor(LAYOUT.nodeW / 2),
    y: LAYOUT.origin.y - Math.floor(LAYOUT.nodeH / 2),
  };
}

// ─────────────────────────────────────────────────────────────
// EMIT — multigraph.json → NDJSON stream
// Converts the multigraph to a flat stream of self-describing
// atomic records, one per line.
// ─────────────────────────────────────────────────────────────

function emit(multigraphPath, outStream = process.stdout) {

  const raw = fs.readFileSync(multigraphPath, 'utf8');
  const mg  = JSON.parse(raw);

  const write = (record) => {
    outStream.write(JSON.stringify(record) + '\n');
  };

  // ── Record 0: HEADER — basis declaration ──────────────────
  // First record in every stream. Consumers validate basisHash
  // before processing any subsequent records.
  write({
    type: RECORD_TYPE.HEADER,
    basisHash:         mg.basisDeclaration.basisHash,
    wordnetHash:       mg.basisDeclaration.wordnetHash,
    corpusMerkleRoot:  mg.basisDeclaration.corpusMerkleRoot,
    protocolVersion:   mg.basisDeclaration.protocolVersion,
    goldenTwelve:      mg.basisDeclaration.goldenTwelve,
    timestamp:         mg.basisDeclaration.timestamp,
    // SAB position: row 14 (SharedArrayBuffer meta row), col 0
    gridPos: [14, 0],
    sabIndex: 14 * 16 + 0,
  });

  // ── Group records — one per face ──────────────────────────
  const faceGroups = [
    { face: 'agency', faceIndex: 0, label: 'Agency — Intent — Subject' },
    { face: 'ethics', faceIndex: 1, label: 'Ethics — Event — Predicate' },
    { face: 'logic',  faceIndex: 2, label: 'Logic/Control — Incidence — Object' },
  ];

  for (const fg of faceGroups) {
    const center = faceCenter(fg.faceIndex);
    const halfSpread = LAYOUT.wordSpread + LAYOUT.groupPad;
    write({
      type:       RECORD_TYPE.GROUP,
      canvasType: 'group',
      id:         `group::${fg.face}`,
      face:       fg.face,
      faceIndex:  fg.faceIndex,
      label:      fg.label,
      color:      LAYOUT.faceColors[fg.face],
      basisHash:  mg.basisDeclaration.basisHash,
      // Canvas geometry
      x:      center.x - halfSpread,
      y:      center.y - halfSpread - 30,
      width:  halfSpread * 2,
      height: halfSpread * 2 + 30,
      // SAB: row = faceIndex * 4, col = 0 (group anchor)
      gridPos:  [fg.faceIndex * 4, 0],
      sabIndex: fg.faceIndex * 4 * 16,
    });
  }

  // ── Centroid node ─────────────────────────────────────────
  const cPos = centroidCanvasPos();
  write({
    type:       RECORD_TYPE.NODE,
    canvasType: 'text',
    id:         'centroid',
    label:      'Centroid (0,0,0,0)',
    face:       null,
    faceIndex:  null,
    coords:     { x: 0, y: 0, z: 0, w: 0 },
    gridPos:    [15, 15],  // Space meta row, last column
    sabIndex:   15 * 16 + 15,
    basisHash:  mg.basisDeclaration.basisHash,
    // Canvas geometry
    x:      cPos.x,
    y:      cPos.y,
    width:  LAYOUT.nodeW * 2,
    height: LAYOUT.nodeH * 2,
    color:  '#2E75B6',
    text:   '**Centroid (0,0,0,0)**\n\nMeaning\nUnknown Unknown\n\nDual Dodecahedron\n\nIntent × Event × Incidence',
    // Atomic semantics
    atomic: { op: 'store', value: 'centroid', encoding: 'utf8' },
  });

  // ── Node records — one per graph node ────────────────────
  for (const node of mg.nodes) {
    const { simplex, coords, gridPos, basisRef, logicMapping } = node;

    // Determine canvas position
    let canvasX, canvasY;
    const isGoldenRoot = simplex.isGoldenRoot;

    if (isGoldenRoot) {
      const pos = wordCanvasPos(simplex.faceIndex, node.simplex.level);
      canvasX = pos.x - Math.floor(LAYOUT.nodeW / 2);
      canvasY = pos.y - Math.floor(LAYOUT.nodeH / 2);
    } else {
      // Non-root synset nodes: offset from their golden root
      // by w-depth, spiraling outward
      const center = faceCenter(simplex.faceIndex);
      const angle  = (simplex.level / 12) * Math.PI * 2;
      const radius = 300 + simplex.level * 60;
      canvasX = Math.round(center.x + radius * Math.cos(angle)) - Math.floor(LAYOUT.nodeW / 2);
      canvasY = Math.round(center.y + radius * Math.sin(angle)) - Math.floor(LAYOUT.nodeH / 2);
    }

    // Build display text
    let text = `**${simplex.label}**`;
    if (simplex.definition) text += `\n${simplex.definition.slice(0, 80)}${simplex.definition.length > 80 ? '…' : ''}`;
    if (logicMapping) {
      text += `\n\n${logicMapping.rumsfeldian}\n${logicMapping.repl.toUpperCase()} · ${logicMapping.io} · ${logicMapping.awkType}`;
    }
    if (simplex.isStub) text += '\n\n_(corpus stub)_';

    const record = {
      type:       RECORD_TYPE.NODE,
      canvasType: 'text',
      id:         node.id,
      label:      simplex.label,
      face:       simplex.face,
      faceIndex:  simplex.faceIndex,
      isGoldenRoot,
      isStub:     simplex.isStub,
      coords,
      gridPos,
      sabIndex:   gridPos[0] * 16 + gridPos[1],
      basisHash:  basisRef,
      // Canvas geometry
      x:      canvasX,
      y:      canvasY,
      width:  LAYOUT.nodeW,
      height: LAYOUT.nodeH,
      color:  LAYOUT.faceColors[simplex.face] || '5',
      text,
      // Atomic write semantics
      // Each line is one Atomics.store() to SAB[sabIndex]
      atomic: {
        op:       'store',
        index:    gridPos[0] * 16 + gridPos[1],
        value:    node.id,
        encoding: 'utf8',
        // w coefficient = sharding key
        shard:    Math.floor(coords.w * 16),
      },
      // Logic/Control mapping if present
      ...(logicMapping ? { logicMapping } : {}),
    };

    write(record);
  }

  // ── Edge records ──────────────────────────────────────────
  for (const edge of mg.edges) {
    write({
      type:       RECORD_TYPE.EDGE,
      canvasType: 'edge',
      id:         `edge::${edge.from}::${edge.to}`,
      fromNode:   edge.from,
      toNode:     edge.to,
      edgeType:   edge.type,   // hypernym | hyponym | stub
      driftType:  edge.driftType, // platonic | archimedean | catalan | null
      face:       edge.face,
      hubWord:    edge.hubWord,
      basisHash:  mg.basisDeclaration.basisHash,
      // Canvas rendering
      color:    LAYOUT.driftColors[edge.driftType] || LAYOUT.driftColors[edge.type] || '5',
      fromEnd:  'none',
      toEnd:    edge.type === 'hypernym' || edge.driftType ? 'arrow' : 'none',
      label:    edge.driftType
                  ? `${edge.driftType}`
                  : edge.type,
      // Atomic semantics: edges are read-only observations, not SAB writes
      atomic: { op: 'load', note: 'edge — observe only, no SAB write' },
    });
  }

  // ── SAB Meta rows (12-15) ─────────────────────────────────
  const metaRows = [
    { index: 12, role: 'Document',          desc: `Encoded document ref · basis: ${mg.basisDeclaration.basisHash.slice(0,16)}…` },
    { index: 13, role: 'DataView',           desc: `w-coefficient layer · WordNet depth scale · sharding key` },
    { index: 14, role: 'SharedArrayBuffer',  desc: `WordNet basis anchor · ${mg.basisDeclaration.wordnetHash.slice(0,16)}…` },
    { index: 15, role: 'Space',              desc: `(x,y,z,w) coordinate space · basis: ${mg.basisDeclaration.basisHash.slice(0,16)}…` },
  ];

  for (const meta of metaRows) {
    write({
      type:       RECORD_TYPE.META,
      canvasType: 'text',
      id:         `meta::${meta.role}`,
      label:      meta.role,
      role:       meta.role,
      desc:       meta.desc,
      gridPos:    [meta.index, 0],
      sabIndex:   meta.index * 16,
      basisHash:  mg.basisDeclaration.basisHash,
      // Canvas geometry — meta row displayed to the right of main graph
      x:      1300,
      y:      (meta.index - 12) * 120 - 240,
      width:  380,
      height: 100,
      color:  '#888888',
      text:   `**${meta.role}**\n${meta.desc}`,
      atomic: {
        op:    'store',
        index: meta.index * 16,
        value: meta.role,
      },
    });
  }

  // ── FLUSH — stream complete ───────────────────────────────
  write({
    type:      RECORD_TYPE.FLUSH,
    basisHash: mg.basisDeclaration.basisHash,
    stats: {
      nodes: mg.nodes.length,
      edges: mg.edges.length,
    },
    timestamp: new Date().toISOString(),
    // AWK-friendly sentinel: awk '$1 == "flush"' to detect end
    sentinel: 'STREAM_COMPLETE',
  });
}

// ─────────────────────────────────────────────────────────────
// CONSUME — NDJSON stream → JSON Canvas
// Reads lines from stdin or file.
// Each line is validated (basisHash must match header),
// then routed to the canvas nodes or edges array.
// Writes the final .canvas JSON on FLUSH or EOF.
// ─────────────────────────────────────────────────────────────

async function consume(inStream = process.stdin, outStream = process.stdout) {

  const canvas   = { nodes: [], edges: [] };
  let   basisHash = null;  // set from HEADER, validated on every record
  let   nodeCount = 0;
  let   edgeCount = 0;

  const rl = readline.createInterface({
    input:     inStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (!line.trim()) continue;

    let record;
    try {
      record = JSON.parse(line);
    } catch (err) {
      process.stderr.write(`[consume] Parse error on line: ${line.slice(0, 80)}\n`);
      continue;
    }

    // ── HEADER: establish and lock the basis ────────────────
    if (record.type === RECORD_TYPE.HEADER) {
      basisHash = record.basisHash;
      process.stderr.write(`[consume] Basis: ${basisHash.slice(0, 16)}… (protocol ${record.protocolVersion})\n`);
      continue;
    }

    // ── Validate every record against the declared basis ────
    // This is the atomic integrity check.
    // Records from a different basis are rejected — they are in
    // a different semantic space and cannot be mixed.
    if (record.basisHash && basisHash && record.basisHash !== basisHash) {
      process.stderr.write(
        `[consume] BASIS MISMATCH — rejecting record id=${record.id}\n` +
        `  expected: ${basisHash.slice(0, 16)}…\n` +
        `  got:      ${record.basisHash.slice(0, 16)}…\n`
      );
      continue;
    }

    // ── FLUSH: finalize and write canvas ────────────────────
    if (record.type === RECORD_TYPE.FLUSH) {
      process.stderr.write(
        `[consume] Stream complete — ${nodeCount} nodes, ${edgeCount} edges\n`
      );
      break;
    }

    // ── META: add as canvas text node ───────────────────────
    if (record.type === RECORD_TYPE.META) {
      canvas.nodes.push({
        id:     record.id,
        type:   'text',
        x:      record.x,
        y:      record.y,
        width:  record.width,
        height: record.height,
        color:  record.color,
        text:   record.text,
      });
      nodeCount++;
      continue;
    }

    // ── GROUP: canvas group node ─────────────────────────────
    if (record.type === RECORD_TYPE.GROUP) {
      // Groups go first (lowest z-index — render below everything)
      canvas.nodes.unshift({
        id:     record.id,
        type:   'group',
        label:  record.label,
        color:  record.color,
        x:      record.x,
        y:      record.y,
        width:  record.width,
        height: record.height,
      });
      nodeCount++;
      continue;
    }

    // ── NODE → canvas text node ──────────────────────────────
    if (record.type === RECORD_TYPE.NODE) {
      canvas.nodes.push({
        id:     record.id,
        type:   'text',
        x:      record.x,
        y:      record.y,
        width:  record.width,
        height: record.height,
        color:  record.color,
        text:   record.text,
      });
      nodeCount++;
      continue;
    }

    // ── EDGE → canvas edge ───────────────────────────────────
    if (record.type === RECORD_TYPE.EDGE) {
      canvas.edges.push({
        id:       record.id,
        fromNode: record.fromNode,
        toNode:   record.toNode,
        color:    record.color,
        fromEnd:  record.fromEnd,
        toEnd:    record.toEnd,
        label:    record.label,
      });
      edgeCount++;
      continue;
    }
  }

  // Write final JSON Canvas
  outStream.write(JSON.stringify(canvas, null, 2) + '\n');
}

// ─────────────────────────────────────────────────────────────
// AWK COMPANION SCRIPT
// Written alongside the NDJSON stream for POSIX consumers.
// Reads one NDJSON record per line, extracts key fields.
// No JSON parser needed — uses basic field extraction.
// ─────────────────────────────────────────────────────────────

const AWK_COMPANION = `#!/usr/bin/awk -f
# Semantic Basis Protocol — POSIX AWK consumer
# Compatible with mawk, nawk, gawk (POSIX match only — no 3-arg arrays).
# Reads NDJSON stream line by line.
# Each line is one atomic record (committed at \\n boundary).
#
# Usage:
#   node stream.js emit multigraph.json | awk -f process.awk
#
# For richer parsing pipe through jq first:
#   node stream.js emit multigraph.json | jq -c '{type,id,face,sabIndex}' | awk -f process.awk

function extract(src, key,    pat, val, s, e) {
  # Extract value of "key":"value" or "key":number from JSON string.
  # POSIX-compatible: uses substr + index, no 3-arg match.
  pat = "\\"" key "\\":\\"?"
  s = index(src, "\\"" key "\\":")
  if (s == 0) return ""
  s = s + length("\\"" key "\\":")
  # skip optional opening quote
  if (substr(src, s, 1) == "\\"") s++
  val = substr(src, s)
  # find end: quote, comma, or brace
  e = length(val)
  for (i = 1; i <= length(val); i++) {
    c = substr(val, i, 1)
    if (c == "\\"" || c == "," || c == "}" || c == "]") { e = i - 1; break }
  }
  return substr(val, 1, e)
}

BEGIN {
  basis = ""
  print "\\u2500\\u2500 Semantic Basis Protocol NDJSON Consumer (AWK/POSIX) \\u2500\\u2500"
}

/"type":"header"/ {
  basis = extract($0, "basisHash")
  print "BASIS: " substr(basis, 1, 16) "..."
  next
}

/"basisHash"/ {
  rec_basis = extract($0, "basisHash")
  if (rec_basis != basis && basis != "") {
    print "REJECTED (basis mismatch): " substr($0, 1, 60)
    next
  }
}

/"type":"node"/ {
  id     = extract($0, "id")
  face   = extract($0, "face")
  sab    = extract($0, "sabIndex")
  golden = extract($0, "isGoldenRoot")
  printf "NODE  sab=%-4s face=%-8s golden=%-5s id=%s\\n", sab, face, golden, id
  next
}

/"type":"edge"/ {
  id    = extract($0, "id")
  drift = extract($0, "driftType")
  etype = extract($0, "edgeType")
  printf "EDGE  drift=%-12s type=%-10s id=%s\\n", drift, etype, id
  next
}

/"sentinel":"STREAM_COMPLETE"/ {
  print "\\u2500\\u2500 STREAM COMPLETE \\u2500\\u2500"
  exit
}
`;

// ─────────────────────────────────────────────────────────────
// HASKELL eDSL STUB
// Type signatures for the algebraic eDSL layer.
// Compiles to the same semantics as the JS runtime above.
// ─────────────────────────────────────────────────────────────

const HASKELL_EDSL_STUB = `-- Semantic Basis Protocol — Haskell eDSL stubs
-- These types describe the same record schema as the JS stream layer.
-- Use Data.Aeson for JSON, Conduit/Pipes for streaming.
--
-- The key property: every transformation is a pure function over
-- the stream. No side effects except the final Atomics.store equivalent.

{-# LANGUAGE OverloadedStrings #-}

module SemanticBasis.Stream where

import Data.Aeson
import Data.Text (Text)
import Data.Map  (Map)

-- The atomic transaction boundary is the newline.
-- Each record is a complete, self-describing JSON object.

data Face = Agency | Ethics | Logic
  deriving (Show, Eq, Ord)

data Coords = Coords
  { coordX :: Double  -- Intent / Subject closure magnitude
  , coordY :: Double  -- Event / Predicate closure magnitude
  , coordZ :: Double  -- Incidence / Object closure magnitude
  , coordW :: Double  -- WordNet depth coefficient (sharding key)
  } deriving (Show, Eq)

data RecordType
  = Header
  | Node
  | Edge
  | Group
  | Meta
  | Flush
  deriving (Show, Eq)

data BasisDeclaration = BasisDeclaration
  { basisHash        :: Text
  , wordnetHash      :: Text
  , corpusMerkleRoot :: Text
  , protocolVersion  :: Text
  , goldenTwelve     :: [Text]
  } deriving (Show)

-- Every record in the stream carries its basis reference.
-- Records with mismatched basisHash are in a different semantic space.
data StreamRecord = StreamRecord
  { recordType  :: RecordType
  , recordId    :: Text
  , basisRef    :: Text        -- must match BasisDeclaration.basisHash
  , face        :: Maybe Face
  , coords      :: Maybe Coords
  , gridPos     :: (Int, Int)  -- (row, col) in 16x16 SAB
  , sabIndex    :: Int         -- gridPos[0] * 16 + gridPos[1]
  , canvasAttrs :: Map Text Value
  } deriving (Show)

-- The stream is a list of atomic records.
-- Consume until Flush.
type NDJSONStream = [StreamRecord]

-- Pure transformation: NDJSON record → JSON Canvas node or edge
-- This is the eDSL kernel. Compile to JS/WASM/AWK from here.
toCanvasNode :: StreamRecord -> Maybe Value
toCanvasNode r = case recordType r of
  Node  -> Just $ object [ "id" .= recordId r, "type" .= ("text" :: Text) ]
  Edge  -> Just $ object [ "id" .= recordId r, "type" .= ("edge" :: Text) ]
  Group -> Just $ object [ "id" .= recordId r, "type" .= ("group" :: Text) ]
  _     -> Nothing

-- Validate basis: all records in a stream must share one basisHash.
-- Returns Left for mismatch, Right for valid.
validateBasis :: Text -> StreamRecord -> Either Text StreamRecord
validateBasis expected r
  | basisRef r == expected = Right r
  | otherwise = Left $
      "BASIS MISMATCH: expected " <> expected <> " got " <> basisRef r

-- Atomics.store equivalent: write record to SAB position.
-- In Haskell this would use STM or IORef; here it is the type signature.
atomicStore :: Int -> StreamRecord -> IO ()
atomicStore index record = pure ()
  -- In practice: writeIORef sabArray[index] record
  -- or: atomically $ writeTVar sabTVar[index] record
`;

// ─────────────────────────────────────────────────────────────
// MAIN — CLI dispatch
// ─────────────────────────────────────────────────────────────

async function main() {
  const [,, command, inputFile] = process.argv;

  if (command === 'emit') {
    if (!inputFile) {
      process.stderr.write('Usage: node stream.js emit <multigraph.json>\n');
      process.exit(1);
    }
    emit(inputFile);

  } else if (command === 'consume') {
    const inStream = inputFile
      ? fs.createReadStream(inputFile)
      : process.stdin;
    await consume(inStream, process.stdout);

  } else if (command === 'write-awk') {
    const awkPath = inputFile || 'process.awk';
    fs.writeFileSync(awkPath, AWK_COMPANION);
    fs.chmodSync(awkPath, 0o755);
    process.stderr.write(`AWK companion written to ${awkPath}\n`);

  } else if (command === 'write-haskell') {
    const hsPath = inputFile || 'SemanticBasis/Stream.hs';
    fs.mkdirSync(path.dirname(hsPath), { recursive: true });
    fs.writeFileSync(hsPath, HASKELL_EDSL_STUB);
    process.stderr.write(`Haskell eDSL stub written to ${hsPath}\n`);

  } else {
    process.stderr.write(`
Semantic Basis Protocol — NDJSON ↔ JSON Canvas Stream Layer

Commands:
  emit <multigraph.json>     Emit NDJSON stream to stdout
  consume [input.ndjson]     Consume NDJSON, write JSON Canvas to stdout
  write-awk [process.awk]    Write POSIX AWK consumer companion
  write-haskell [Stream.hs]  Write Haskell eDSL type stubs

Examples:
  node stream.js emit semantic-multigraph.json > stream.ndjson
  node stream.js consume stream.ndjson > output.canvas
  node stream.js emit semantic-multigraph.json | node stream.js consume > output.canvas
  node stream.js emit semantic-multigraph.json | awk -f process.awk
  node stream.js write-awk && node stream.js emit m.json | awk -f process.awk
`);
    process.exit(1);
  }
}

main().catch(err => {
  process.stderr.write(`Error: ${err.message}\n`);
  process.exit(1);
});

module.exports = { emit, consume, LAYOUT, RECORD_TYPE, AWK_COMPANION, HASKELL_EDSL_STUB };
