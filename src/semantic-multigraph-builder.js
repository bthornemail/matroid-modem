/**
 * Semantic Basis Protocol — Multigraph Builder
 * =============================================
 * Implements the protocol defined in semantic-basis-protocol-v0.1.docx
 *
 * KEY AXIOM: The word IS its simplex.
 * A word's identity is its synset tree + hypernym closure + usage edges
 * within a declared, versioned, cryptographically anchored basis.
 * A word without a versioned basis is an unanchored string.
 *
 * Usage:
 *   node semantic-multigraph-builder.js
 *
 * Dependencies:
 *   npm install wordnet-magic
 *   npm install node-nlp   (optional: for SPO extraction from corpus docs)
 *
 * Before running: set WORDNET_DB path and CORPUS_DOCS below.
 */

'use strict';

const wn = require('wordnet-magic');
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// ─────────────────────────────────────────────────────────────
// 1. BASIS DECLARATION
//    Every deployment must declare its basis.
//    The basis is NOT the protocol version — it is the specific
//    versioned WordNet + signed corpus that anchors all simplices.
// ─────────────────────────────────────────────────────────────

const WORDNET_DB = process.env.WORDNET_DB || '/path/to/wordnet.sqlite';

// Signed corpus documents that define sparse/proper-noun simplices.
// Each entry is a local file path. Their Merkle root becomes part of
// the basis declaration hash. Replace with your actual corpus files.
const CORPUS_DOCS = [
  // e.g. './corpus/genesis.txt',
  // e.g. './corpus/axioms.txt',
  // e.g. './corpus/org-notes.org',
];

// ─────────────────────────────────────────────────────────────
// 2. THE GOLDEN TWELVE — Icosahedron vertices
//    Three faces of four. Fixed once. Published as protocol standard.
//    These are the ONLY hubs. Domain words (Metatron, Fano, etc.)
//    are stub nodes in the signed corpus, NOT additional hubs.
// ─────────────────────────────────────────────────────────────

const GOLDEN_TWELVE = [
  // Face 0 — Agency (Intent / Subject / Known-Known)
  { word: 'freedom',     face: 'agency',  faceIndex: 0, wordIndex: 0 },
  { word: 'autonomy',    face: 'agency',  faceIndex: 0, wordIndex: 1 },
  { word: 'sovereignty', face: 'agency',  faceIndex: 0, wordIndex: 2 },
  { word: 'reciprocity', face: 'agency',  faceIndex: 0, wordIndex: 3 },

  // Face 1 — Ethics (Event / Predicate / Known-Unknown)
  { word: 'grace',         face: 'ethics', faceIndex: 1, wordIndex: 0 },
  { word: 'love',          face: 'ethics', faceIndex: 1, wordIndex: 1 },
  { word: 'understanding', face: 'ethics', faceIndex: 1, wordIndex: 2 },
  { word: 'empathy',       face: 'ethics', faceIndex: 1, wordIndex: 3 },

  // Face 2 — Logic/Control (Incidence / Object / Unknown-Known)
  { word: 'stop',  face: 'logic', faceIndex: 2, wordIndex: 0 },
  { word: 'no',    face: 'logic', faceIndex: 2, wordIndex: 1 },
  { word: 'yes',   face: 'logic', faceIndex: 2, wordIndex: 2 },
  { word: 'maybe', face: 'logic', faceIndex: 2, wordIndex: 3 },
];

// ─────────────────────────────────────────────────────────────
// 3. REPL / RUMSFELDIAN / IO MAPPING
//    The Logic/Control face maps onto computation.
//    These are not additional hubs — they are annotations on the
//    Logic/Control simplex nodes.
// ─────────────────────────────────────────────────────────────

const LOGIC_MAPPING = {
  yes:   { epistemic: 'known-known',   repl: 'read',  io: 'stdin',  awkType: 'string',  rumsfeldian: 'Known Known'   },
  no:    { epistemic: 'known-unknown', repl: 'eval',  io: 'stdout', awkType: 'number',  rumsfeldian: 'Known Unknown' },
  maybe: { epistemic: 'unknown-known', repl: 'print', io: 'port',   awkType: 'pattern', rumsfeldian: 'Unknown Known' },
  stop:  { epistemic: 'unknown-unknown', repl: 'loop', io: 'file', awkType: 'array',   rumsfeldian: 'Unknown Unknown' },
};

// ─────────────────────────────────────────────────────────────
// 4. META LAYER — The 16×16 SharedArrayBuffer projection
//    The 12 golden words fill rows 0-11.
//    Rows 12-15 are basis meta, NOT additional hubs.
//    They describe the coordinate system itself.
// ─────────────────────────────────────────────────────────────

const SAB_META_ROWS = [
  { index: 12, role: 'Document',         desc: 'The encoded document reference and its basis declaration hash' },
  { index: 13, role: 'DataView',         desc: 'The w-coefficient layer — floating point WordNet depth scale' },
  { index: 14, role: 'SharedArrayBuffer', desc: 'The versioned WordNet basis anchor (SHA-256 of synset graph)' },
  { index: 15, role: 'Space',            desc: 'The full (x,y,z,w) coordinate space of the deployment' },
];

// ─────────────────────────────────────────────────────────────
// 5. CRYPTOGRAPHIC BASIS ANCHORING
// ─────────────────────────────────────────────────────────────

/**
 * Compute SHA-256 of the WordNet database file.
 * This is the immutable anchor for all standard synset simplices.
 * If the DB changes, the basis changes.
 */
function hashWordNetDB(dbPath) {
  if (!fs.existsSync(dbPath)) {
    console.warn(`⚠️  WordNet DB not found at ${dbPath} — using placeholder hash`);
    return 'WORDNET_HASH_PLACEHOLDER_SET_WORDNET_DB_PATH';
  }
  const data = fs.readFileSync(dbPath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Build a Merkle tree over corpus documents.
 * Each document's SHA-256 becomes a leaf. Pairs are hashed upward.
 * The root anchors all sparse/proper-noun simplex stubs.
 */
function buildCorpusMerkleRoot(docPaths) {
  if (docPaths.length === 0) {
    return 'CORPUS_MERKLE_PLACEHOLDER_ADD_CORPUS_DOCS';
  }

  // Leaf hashes
  let layer = docPaths.map(p => {
    if (!fs.existsSync(p)) {
      console.warn(`⚠️  Corpus doc not found: ${p}`);
      return crypto.createHash('sha256').update(`missing:${p}`).digest('hex');
    }
    const data = fs.readFileSync(p);
    return crypto.createHash('sha256').update(data).digest('hex');
  });

  // Reduce up the tree
  while (layer.length > 1) {
    const next = [];
    for (let i = 0; i < layer.length; i += 2) {
      const left = layer[i];
      const right = layer[i + 1] || left; // odd node pairs with itself
      next.push(crypto.createHash('sha256').update(left + right).digest('hex'));
    }
    layer = next;
  }

  return layer[0];
}

/**
 * The full basis declaration.
 * Hash of (wordnetHash + corpusMerkleRoot) is the deployment's
 * unique semantic coordinate system identifier.
 */
function buildBasisDeclaration(wordnetHash, corpusMerkleRoot) {
  const basisHash = crypto
    .createHash('sha256')
    .update(wordnetHash + corpusMerkleRoot)
    .digest('hex');

  return {
    protocolVersion: '0.1',
    wordnetHash,
    corpusMerkleRoot,
    basisHash,
    goldenTwelve: GOLDEN_TWELVE.map(g => g.word),
    timestamp: new Date().toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────
// 6. (x, y, z, w) COORDINATE COMPUTATION
//
//    x = Agency face closure magnitude   (0.0 – 1.0)
//    y = Ethics face closure magnitude   (0.0 – 1.0)
//    z = Logic face closure magnitude    (0.0 – 1.0)
//    w = WordNet depth at closure / MAX_DEPTH  (sharding key)
// ─────────────────────────────────────────────────────────────

const MAX_WORDNET_DEPTH = 16; // approximate max noun hypernym depth

/**
 * Compute the (x, y, z, w) coordinate for a synset node.
 * level     = depth in the trie at which this node was reached
 * faceIndex = 0 (agency), 1 (ethics), 2 (logic)
 * closureDist = graph distance to nearest shared hypernym node
 *               (0 = fully closed, higher = more open)
 */
function computeCoordinates(faceIndex, level, closureDist = null) {
  const w = Math.min(level / MAX_WORDNET_DEPTH, 1.0);

  // Closure magnitude: 1.0 = fully closed (distance 0), decays with distance
  const closureMag = closureDist !== null
    ? Math.max(0, 1 - closureDist / MAX_WORDNET_DEPTH)
    : 1.0 - w; // fallback: deeper = less closed

  const coords = { x: 0, y: 0, z: 0, w };
  if (faceIndex === 0) coords.x = closureMag;
  if (faceIndex === 1) coords.y = closureMag;
  if (faceIndex === 2) coords.z = closureMag;

  return coords;
}

/**
 * Map (x, y, z, w) to the 16×16 SharedArrayBuffer grid position.
 * Rows 0-3   = Agency words (x axis)
 * Rows 4-7   = Ethics words (y axis)
 * Rows 8-11  = Logic words  (z axis)
 * Rows 12-15 = Basis meta   (w / declaration layer)
 * Column     = w depth quantized to 16 buckets
 */
function toGridPosition(coords, faceIndex) {
  const row = (faceIndex * 4) + Math.min(Math.floor(coords.w * 4), 3);
  const col = Math.min(Math.floor(coords.w * 16), 15);
  return [row, col];
}

// ─────────────────────────────────────────────────────────────
// 7. SYNSET TRIE EXPANSION
//    Each word IS its simplex — we expand recursively to build it.
//    Domain words (Metatron, Fano, Garden, etc.) become stub nodes
//    within the nearest golden word's subtree, NOT separate hubs.
// ─────────────────────────────────────────────────────────────

const graph = { nodes: new Map(), edges: [] };
const visited = new Set();

async function expandSynset(synset, hubWord, faceIndex, level = 0, parentId = null, relType = null) {
  const id = synset.synsetid
    ? `${hubWord}::synset::${synset.synsetid}`
    : `${hubWord}::stub::${synset.lemma || hubWord}`;

  if (visited.has(id) || level > 7) return;
  visited.add(id);

  const coords = computeCoordinates(faceIndex, level);
  const gridPos = toGridPosition(coords, faceIndex);

  const isGoldenRoot = level === 0 && GOLDEN_TWELVE.some(g => g.word === hubWord);

  if (!graph.nodes.has(id)) {
    const hub = GOLDEN_TWELVE.find(g => g.word === hubWord);

    graph.nodes.set(id, {
      id,

      // Simplex identity — the word IS this structure
      simplex: {
        hubWord,                       // which golden word this belongs to
        face: hub ? hub.face : null,   // agency | ethics | logic
        faceIndex,
        synsetId: synset.synsetid || null,
        label: synset.words ? synset.words.map(w => w.lemma).join(', ') : (synset.lemma || hubWord),
        words: synset.words ? synset.words.map(w => w.lemma) : [synset.lemma || hubWord],
        pos: synset.pos || 'n',
        definition: synset.definition || 'Stub — enrich via signed corpus',
        level,
        isGoldenRoot,
        isStub: !synset.synsetid,
      },

      // Basis reference — every node knows which basis defines it
      basisRef: 'POPULATED_AFTER_BUILD', // replaced with basisHash after build

      // Coordinates in the (x, y, z, w) semantic space
      coords,

      // Position in the 16×16 SharedArrayBuffer grid
      gridPos,

      // Logic/Control face gets the REPL/Rumsfeldian mapping
      ...(hub && hub.face === 'logic' && LOGIC_MAPPING[hubWord]
        ? { logicMapping: LOGIC_MAPPING[hubWord] }
        : {}),
    });
  }

  if (parentId && relType) {
    graph.edges.push({
      from: parentId,
      to: id,
      type: relType,      // 'hypernym' | 'hyponym' | 'stub'
      hubWord,
      face: GOLDEN_TWELVE.find(g => g.word === hubWord)?.face || null,

      // Drift type annotation:
      //   platonic     = same-face, canonical
      //   archimedean  = cross-face, inter-document
      //   catalan      = intra-narrative role shift
      // (set by the consumer when comparing across documents)
      driftType: null,
    });
  }

  // Recursive expansion — this IS the simplex being built
  try {
    const hyper = await new Promise(r => synset.getHypernymsTree((e, t) => r(t)));
    if (hyper) for (const b of hyper) await expandSynset(b, hubWord, faceIndex, level + 1, id, 'hypernym');
  } catch (_) {}

  try {
    const hypo = await new Promise(r => synset.getHyponymsTree((e, t) => r(t)));
    if (hypo) for (const b of hypo) await expandSynset(b, hubWord, faceIndex, level + 1, id, 'hyponym');
  } catch (_) {}
}

// ─────────────────────────────────────────────────────────────
// 8. DOMAIN WORD STUB INJECTION
//    Metatron, Solomon, Fano, Garden, Tetrahedron, Merkle, Agent
//    and any other domain-specific terms are NOT hubs.
//    They are stub nodes anchored to the signed corpus,
//    inserted into the nearest golden word's subtree.
// ─────────────────────────────────────────────────────────────

// Map each domain word to its nearest golden word by semantic proximity.
// This is the manual bootstrap — once the corpus is signed and the
// WordNet closure is computed, these assignments can be derived automatically.
const DOMAIN_STUBS = [
  // Proper nouns / esoteric — anchored to Ethics face (relational/narrative words)
  { word: 'Metatron',    nearestGolden: 'grace',         pos: 'n', definition: 'Celestial scribe; mediator between divine and human — stub from signed corpus' },
  { word: 'Solomon',     nearestGolden: 'understanding', pos: 'n', definition: 'King; archetype of wisdom and judgment — stub from signed corpus' },
  { word: 'Solon',       nearestGolden: 'sovereignty',   pos: 'n', definition: 'Athenian lawgiver; archetype of just governance — stub from signed corpus' },
  { word: 'Asabiyyah',   nearestGolden: 'reciprocity',   pos: 'n', definition: 'Ibn Khaldun: social cohesion and group solidarity — stub from signed corpus' },
  { word: 'Enoch',       nearestGolden: 'grace',         pos: 'n', definition: 'Patriarch who walked with God; mystical ascent — stub from signed corpus' },
  { word: 'Genesis',     nearestGolden: 'freedom',       pos: 'n', definition: 'Origin; first cause; beginning of narrative — stub from signed corpus' },
  { word: 'Speaker',     nearestGolden: 'autonomy',      pos: 'n', definition: 'Agent of utterance; subject of speech act — stub from signed corpus' },

  // Geometric / computational — anchored to Agency and Logic faces
  { word: 'Fano',        nearestGolden: 'stop',          pos: 'n', definition: 'Fano plane: 7-point projective geometry; block design basis — stub from signed corpus' },
  { word: 'Garden',      nearestGolden: 'love',          pos: 'n', definition: 'Enclosed cultivated space; site of origin and tending — stub from signed corpus' },
  { word: 'Tetrahedron', nearestGolden: 'maybe',         pos: 'n', definition: 'Simplest 3D simplex; 4 vertices, 4 faces, 6 edges — stub from signed corpus' },
  { word: 'Merkle',      nearestGolden: 'yes',           pos: 'n', definition: 'Merkle tree: cryptographic hash structure for data integrity — stub from signed corpus' },
  { word: 'Agent',       nearestGolden: 'autonomy',      pos: 'n', definition: 'Autonomous actor; subject capable of intent and action — stub from signed corpus' },
];

function injectDomainStubs(basisDeclaration) {
  for (const stub of DOMAIN_STUBS) {
    const hub = GOLDEN_TWELVE.find(g => g.word === stub.nearestGolden);
    if (!hub) continue;

    const id = `${stub.nearestGolden}::stub::${stub.word}`;
    if (graph.nodes.has(id)) continue;

    const coords = computeCoordinates(hub.faceIndex, MAX_WORDNET_DEPTH); // deep = specific
    const gridPos = toGridPosition(coords, hub.faceIndex);

    graph.nodes.set(id, {
      id,
      simplex: {
        hubWord: stub.nearestGolden,
        face: hub.face,
        faceIndex: hub.faceIndex,
        synsetId: null,
        label: stub.word,
        words: [stub.word],
        pos: stub.pos,
        definition: stub.definition,
        level: MAX_WORDNET_DEPTH,
        isGoldenRoot: false,
        isStub: true,
        // Stub is anchored to the signed corpus Merkle root, not WordNet
        anchoredTo: 'corpus',
        corpusMerkleRoot: basisDeclaration.corpusMerkleRoot,
      },
      basisRef: basisDeclaration.basisHash,
      coords,
      gridPos,
    });

    // Edge from nearest golden word root to this stub
    const goldenRootId = `${stub.nearestGolden}::stub::${stub.nearestGolden}`;
    graph.edges.push({
      from: goldenRootId,
      to: id,
      type: 'stub',
      hubWord: stub.nearestGolden,
      face: hub.face,
      driftType: null,
      note: 'Enriched via signed corpus — not a standard WordNet synset',
    });
  }
}

// ─────────────────────────────────────────────────────────────
// 9. LLM INTROSPECTION FUNCTION
//    Updated to resolve against basis position, not named hub.
//    Any node — golden word, domain stub, or derived synset —
//    returns its full simplex identity and basis coordinates.
// ─────────────────────────────────────────────────────────────

function introspect(nodeId, loadedGraph) {
  const node = loadedGraph.nodes.find(n => n.id === nodeId);
  if (!node) return null;

  const { simplex, coords, gridPos, basisRef, logicMapping } = node;

  // Find all edges involving this node
  const outgoing = loadedGraph.edges.filter(e => e.from === nodeId);
  const incoming = loadedGraph.edges.filter(e => e.to === nodeId);

  return {
    node,

    // Simplex identity — the word IS this
    simplex,

    // Basis coordinates — where this node sits in semantic space
    coords,          // { x, y, z, w }
    gridPos,         // [row, col] in 16×16 SAB

    // Basis declaration reference — which semantic space this belongs to
    basisRef,

    // REPL/Rumsfeldian mapping if this is a Logic/Control face node
    ...(logicMapping ? { logicMapping } : {}),

    // Synset cloud for LLM context
    synsetCloud: {
      label: simplex.label,
      words: simplex.words,
      definition: simplex.definition,
      face: simplex.face,
      pos: simplex.pos,
    },

    // Graph neighborhood
    outgoingEdges: outgoing.map(e => ({ to: e.to, type: e.type, driftType: e.driftType })),
    incomingEdges: incoming.map(e => ({ from: e.from, type: e.type, driftType: e.driftType })),
  };
}

// ─────────────────────────────────────────────────────────────
// 10. BUILD
// ─────────────────────────────────────────────────────────────

async function build() {
  console.log('── Semantic Basis Protocol Multigraph Builder ──');
  console.log('   Protocol version: 0.1\n');

  // Step 1: Declare the basis
  console.log('1. Computing basis declaration...');
  const wordnetHash = hashWordNetDB(WORDNET_DB);
  const corpusMerkleRoot = buildCorpusMerkleRoot(CORPUS_DOCS);
  const basisDeclaration = buildBasisDeclaration(wordnetHash, corpusMerkleRoot);

  console.log(`   WordNet hash:       ${wordnetHash.slice(0, 16)}...`);
  console.log(`   Corpus Merkle root: ${corpusMerkleRoot.slice(0, 16)}...`);
  console.log(`   Basis hash:         ${basisDeclaration.basisHash.slice(0, 16)}...\n`);

  // Step 2: Register WordNet
  if (fs.existsSync(WORDNET_DB)) {
    wn.registerDatabase(WORDNET_DB);
  } else {
    console.warn('   ⚠️  WordNet DB not found — golden words will be stub nodes only\n');
  }

  // Step 3: Expand synset tries for each golden word (each word IS its simplex)
  console.log('2. Expanding synset tries for the Golden Twelve...');
  for (const hub of GOLDEN_TWELVE) {
    process.stdout.write(`   ${hub.word} (${hub.face})... `);

    try {
      const wordObj = new wn.Word(hub.word);
      const synsets = await new Promise((res, rej) => {
        wordObj.getSynsets((err, s) => err ? rej(err) : res(s));
      });

      if (!synsets || synsets.length === 0) {
        // Fallback: create stub synset
        await expandSynset(
          { lemma: hub.word, definition: `${hub.word} — basis word stub` },
          hub.word, hub.faceIndex
        );
        console.log('stub');
      } else {
        for (const s of synsets) {
          await expandSynset(s, hub.word, hub.faceIndex);
        }
        console.log(`${synsets.length} synsets`);
      }
    } catch (err) {
      // WordNet unavailable — create stub
      await expandSynset(
        { lemma: hub.word, definition: `${hub.word} — basis word stub (WordNet unavailable)` },
        hub.word, hub.faceIndex
      );
      console.log('stub (WordNet error)');
    }
  }

  // Step 4: Inject domain word stubs (Metatron, Fano, etc.)
  // These are corpus-anchored stubs, NOT additional hubs
  console.log('\n3. Injecting domain word stubs from signed corpus...');
  injectDomainStubs(basisDeclaration);
  console.log(`   ${DOMAIN_STUBS.length} domain stubs injected`);

  // Step 5: Stamp all nodes with the basis hash
  console.log('\n4. Stamping all nodes with basis declaration hash...');
  for (const [id, node] of graph.nodes) {
    node.basisRef = basisDeclaration.basisHash;
  }

  // Step 6: Build the 16×16 SharedArrayBuffer projection map
  console.log('\n5. Building 16×16 SharedArrayBuffer projection...');
  const sabGrid = Array.from({ length: 16 }, () => Array(16).fill(null));

  for (const [id, node] of graph.nodes) {
    const [row, col] = node.gridPos;
    if (!sabGrid[row][col]) {
      sabGrid[row][col] = id;
    }
  }

  // Rows 12-15: basis meta
  for (const meta of SAB_META_ROWS) {
    for (let col = 0; col < 16; col++) {
      sabGrid[meta.index][col] = `meta::${meta.role}::col${col}`;
    }
  }

  // Step 7: Assemble and write
  console.log('\n6. Writing output...');

  const exportGraph = {
    // Basis declaration — the semantic coordinate system
    basisDeclaration,

    // Protocol metadata
    protocol: {
      version: '0.1',
      axiom: 'The word is its simplex',
      goldenTwelve: GOLDEN_TWELVE,
      logicMapping: LOGIC_MAPPING,
      sabMetaRows: SAB_META_ROWS,
      driftLevels: {
        platonic:    'Same-face canonical — Euclidean distance from (0,0,0,0)',
        archimedean: 'Cross-face inter-document — variance in predicate face assignments',
        catalan:     'Intra-narrative — variance in vertex positions within a single document',
      },
    },

    // The graph — every node is a simplex, every edge is a relation
    nodes: Array.from(graph.nodes.values()),
    edges: graph.edges,

    // 16×16 SharedArrayBuffer projection
    // Row 0-3: Agency words | Row 4-7: Ethics | Row 8-11: Logic | Row 12-15: Basis meta
    sabProjection: {
      dimensions: [16, 16],
      rowGroups: {
        '0-3':   'Agency face (x axis) — Intent / Subject / Known-Known',
        '4-7':   'Ethics face (y axis) — Event / Predicate / Known-Unknown',
        '8-11':  'Logic face (z axis) — Incidence / Object / Unknown-Known',
        '12-15': 'Basis meta (w axis) — Document / DataView / SAB / Space',
      },
      colAxis: 'w coefficient — WordNet depth (0=abstract, 15=concrete)',
      grid: sabGrid,
    },

    // Introspection function (serialized for reference — use the live function in code)
    introspectUsage: 'import { introspect } from this module; call introspect(nodeId, loadedGraph)',

    timestamp: new Date().toISOString(),
  };

  const outPath = 'semantic-multigraph.json';
  fs.writeFileSync(outPath, JSON.stringify(exportGraph, null, 2));

  console.log(`\n✅ Built semantic multigraph:`);
  console.log(`   ${exportGraph.nodes.length} nodes`);
  console.log(`   ${exportGraph.edges.length} edges`);
  console.log(`   Basis hash: ${basisDeclaration.basisHash}`);
  console.log(`   Output: ${outPath}`);
  console.log(`\n⚠️  Next steps:`);
  console.log(`   1. Set WORDNET_DB path to your WordNet SQLite file`);
  console.log(`   2. Add your corpus documents to CORPUS_DOCS`);
  console.log(`   3. Run again — basis hash will stabilize once corpus is signed`);
  console.log(`   4. Publish the basisDeclaration as your semantic coordinate system`);
}

// ─────────────────────────────────────────────────────────────
// EXPORTS — for use as a module in other scripts
// ─────────────────────────────────────────────────────────────

module.exports = {
  GOLDEN_TWELVE,
  LOGIC_MAPPING,
  SAB_META_ROWS,
  DOMAIN_STUBS,
  introspect,
  computeCoordinates,
  toGridPosition,
  buildBasisDeclaration,
  buildCorpusMerkleRoot,
  hashWordNetDB,
};

// Run if called directly
if (require.main === module) {
  build().catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });
}
