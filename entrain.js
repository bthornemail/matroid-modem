#!/usr/bin/env node
/**
 * Semantic Basis Protocol — Entrainment Scheduler
 * ================================================
 * Maps the EpistemicSquare spin cycle to the NDJSON commit stream.
 *
 * CORE IDEA:
 * The timing function (t field in each NDJSON record) is a scheduler
 * offset — not a wall-clock timestamp. Each node gets a turn to update
 * global SAB state at its scheduled t. Over one full 720-tick cycle
 * (360° / 0.5° spinSpeed), every Fano point has visited all four
 * Rumsfeldian quadrants — KK/KU/UK/UU — and therefore has held every
 * SPO role: Subject/Intent, Predicate/Event, Object/Incidence, Centroid.
 *
 * The result is a CommitEvent per node per cycle recording its complete
 * multi-context entrainment: every intent it held, every event it
 * participated in, every incidence it received.
 *
 * HOW IT RELATES TO YOUR OTHER FILES:
 *
 *   epistemic-square.js
 *     → Provides the spin model: rotate() advances angle by spinSpeed,
 *       updateQuadrants() assigns each Fano point to KK/KU/UK/UU.
 *     → This file uses that same math to pre-compute transition ticks
 *       for each node, then schedules commits at those boundaries.
 *
 *   patterns.ndjson
 *     → Each record's t field is the scheduler tick for that LED/node.
 *     → purpose=240 (garden) runs at t+0..t+1s, ring by ring.
 *     → purpose=60  (personal) runs at t+2s.
 *     → purpose=7   (talisman) runs at t+3s.
 *     → federation event at t+5s is the phase-lock sync point.
 *     → This file honours that same cadence — garden commits first,
 *       then personal, then talisman, then federation sync.
 *
 *   lights.json / lights.jsonl
 *     → Defines the LED layout: rings, fano_point assignments, HD paths.
 *     → Each LED becomes a node in the entrainment graph.
 *     → The tetrahedral_diagonals (radial lines of 8 LEDs) become
 *       the w-depth axis in the SAB projection.
 *
 *   dome-leds.ndjson / dome-generate.js
 *     → Dome LEDs use golden-ratio geodesic placement.
 *     → Their fano assignment (i % 7) maps directly to the 7 Fano
 *       points cycling through quadrants.
 *     → This scheduler handles dome LEDs as a third device scale
 *       synchronized via the genesis-gate LED at t+5s.
 *
 *   dome-leds.json
 *     → Static source for dome LED positions used to compute
 *       octree SAB grid positions per node.
 *
 *   reference-implementation-browser-v1.md
 *     → CommitEvent schema: id, t, lc, type, parents, vertex, edges,
 *       faces, centroid, status, prev_hash, self_hash, sig.
 *     → Fano line table L1-L7 used for face invariant evaluation.
 *     → stop_metric / closure_ratio / sabbath computed per commit.
 *     → This file emits fully schema-compliant CommitEvents.
 *
 *   reference-implementation-schemas_ndjson.md
 *     → Canonicalization rules for self_hash computation.
 *     → Frozen field ordering used here verbatim.
 *
 *   stream.js (our streaming layer)
 *     → Consume output of this file: pipe into stream.js consume
 *       to get a JSON Canvas of the full entrainment state.
 *     → Or pipe into process.awk for POSIX processing.
 *
 *   semantic-multigraph-builder.js
 *     → The basisHash from that file should be passed as --basis
 *       to this scheduler. Every commit carries basisRef.
 *
 *   fano-with-light-arrays.svg / fano-garden.svg
 *     → SVG source for vertex positions.
 *     → ProjectionEvents in the output reference svg_overlay_id
 *       matching the SVG element IDs in these files.
 *
 *   epistemic-square.svg
 *     → The rotating square visualization. This scheduler produces
 *       the commit log that drives it — one commit per quadrant
 *       transition is the state update that redraws the square.
 *
 * USAGE:
 *   # Full pipeline — entrainment log to JSON Canvas
 *   node entrain.js | node stream.js consume > entrained.canvas
 *
 *   # POSIX/AWK
 *   node entrain.js | awk -f process.awk
 *
 *   # With basis hash from multigraph builder
 *   node entrain.js --basis <basisHash> --cycles 3 > log.ndjson
 *
 *   # Replay existing patterns.ndjson through scheduler
 *   node entrain.js --replay patterns.ndjson > entrained.ndjson
 *
 *   # Feed lights.json as node source
 *   node entrain.js --lights lights.json --cycles 1 > log.ndjson
 */

'use strict';

const fs     = require('fs');
const crypto = require('crypto');

// ─────────────────────────────────────────────────────────────
// CLI args
// ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (flag, def) => {
  const i = args.indexOf(flag);
  return i !== -1 ? args[i + 1] : def;
};

const BASIS_HASH   = getArg('--basis',  'BASIS_NOT_SET_run_semantic-multigraph-builder_first');
const NUM_CYCLES   = parseInt(getArg('--cycles', '1'));
const REPLAY_FILE  = getArg('--replay', null);
const LIGHTS_FILE  = getArg('--lights', null);
const TICK_MS      = parseInt(getArg('--tick-ms', '1')); // ms per tick
const BASE_T       = parseInt(getArg('--base-t',  String(Date.now())));

// ─────────────────────────────────────────────────────────────
// CONSTANTS — from epistemic-square.js and browser-v1 spec
// ─────────────────────────────────────────────────────────────

const SPIN_SPEED   = 0.5;          // degrees per tick
const FULL_CYCLE   = 720;          // ticks for 360° (360/0.5)
const MAX_DEPTH    = 16;           // WordNet depth scale for w coefficient

// Fano points — base positions from epistemic-square.js
const FANO_POINTS = [
  { id:1, name:'Metatron',  baseX: 0.15, baseY: 0.15, color:'red',    hue:0   },
  { id:2, name:'Solomon',   baseX: 0.35, baseY: 0.15, color:'orange', hue:30  },
  { id:3, name:'Solon',     baseX:-0.05, baseY: 0.15, color:'yellow', hue:60  },
  { id:4, name:'Asabiyyah', baseX: 0.0,  baseY:-0.25, color:'green',  hue:120 },
  { id:5, name:'Enoch',     baseX:-0.35, baseY: 0.15, color:'blue',   hue:240 },
  { id:6, name:'Speaker',   baseX: 0.35, baseY: 0.15, color:'indigo', hue:270 },
  { id:7, name:'Genesis',   baseX: 0.0,  baseY: 0.35, color:'violet', hue:300 },
];

// Fano line table — canonical from browser-v1 R3
const FANO_LINES = [
  { id:'L1', points:[1,2,4] },
  { id:'L2', points:[1,3,5] },
  { id:'L3', points:[1,6,7] },
  { id:'L4', points:[2,3,6] },
  { id:'L5', points:[2,5,7] },
  { id:'L6', points:[3,4,6] },
  { id:'L7', points:[4,5,7] },
];

// Quadrant -> SPO role -> protocol mapping
const QUADRANT_MAP = {
  KK: { spo:'subject',   role:'Intent',    golden:'freedom',  repl:'read',  io:'stdin',  lc_weight: 0 },
  KU: { spo:'predicate', role:'Event',     golden:'grace',    repl:'eval',  io:'stdout', lc_weight: 1 },
  UK: { spo:'object',    role:'Incidence', golden:'maybe',    repl:'print', io:'port',   lc_weight: 2 },
  UU: { spo:'centroid',  role:'Stop',      golden:'stop',     repl:'loop',  io:'file',   lc_weight: 3 },
};

// Device scale timing offsets (from patterns.ndjson analysis)
const DEVICE_OFFSETS = {
  garden:   0,       // t+0s  — purpose 240
  personal: 2000,    // t+2s  — purpose 60
  talisman: 3000,    // t+3s  — purpose 7
  dome:     4500,    // t+4.5s
  sync:     5000,    // t+5s  — federation phase-lock
};

// ─────────────────────────────────────────────────────────────
// EPISTEMIC SQUARE MATH
// Mirrors epistemic-square.js rotate() and updateQuadrants()
// ─────────────────────────────────────────────────────────────

function rotate(point, angleDeg) {
  const rad  = -angleDeg * Math.PI / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  return {
    x: point.baseX * cosA - point.baseY * sinA,
    y: point.baseX * sinA + point.baseY * cosA,
  };
}

function getQuadrant(x, y) {
  if (x >= 0 && y >= 0) return 'KK';
  if (x <  0 && y >= 0) return 'KU';
  if (x >= 0 && y <  0) return 'UK';
  return 'UU';
}

/**
 * Pre-compute all quadrant transitions for a Fano point across
 * one full 720-tick cycle. Returns array of transition events:
 * { tick, angleDeg, quadrant, role, spo }
 */
function computeTransitions(point) {
  const transitions = [];
  let prevQ = null;

  for (let tick = 0; tick < FULL_CYCLE; tick++) {
    const angleDeg = tick * SPIN_SPEED;
    const { x, y } = rotate(point, angleDeg);
    const q = getQuadrant(x, y);

    if (q !== prevQ) {
      transitions.push({
        tick,
        angleDeg,
        quadrant:   q,
        ...QUADRANT_MAP[q],
        x, y,
      });
      prevQ = q;
    }
  }

  return transitions;
}

// Pre-compute all transitions for all 7 points
const TRANSITIONS = {};
FANO_POINTS.forEach(p => {
  TRANSITIONS[p.id] = computeTransitions(p);
});

// ─────────────────────────────────────────────────────────────
// CRYPTOGRAPHIC HELPERS
// Implements browser-v1 canonicalization rules
// ─────────────────────────────────────────────────────────────

/** Canonical JSON: sorted keys, no whitespace, UTF-8 */
function canonicalJson(obj) {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return JSON.stringify(obj);
  }
  const sorted = Object.keys(obj).sort().reduce((acc, k) => {
    acc[k] = obj[k];
    return acc;
  }, {});
  return JSON.stringify(sorted);
}

function sha256Hex(str) {
  return '0x' + crypto.createHash('sha256').update(str, 'utf8').digest('hex');
}

/**
 * Compute self_hash per browser-v1 R5:
 * sha256 of canonical payload excluding self_hash and sig
 */
function computeSelfHash(commit) {
  const { self_hash, sig, ...payload } = commit;
  return sha256Hex(canonicalJson(payload));
}

// ─────────────────────────────────────────────────────────────
// FACE INVARIANT EVALUATION
// A face passes if all 3 of its Fano points are in the same
// quadrant (fully entrained) or in complementary SPO roles
// (subject+predicate+object = one complete triple).
// ─────────────────────────────────────────────────────────────

/**
 * Evaluate face invariants given current quadrant state of all points.
 * A line passes if its 3 points collectively cover all 3 SPO roles
 * (KK+KU+UK) or are all in the same quadrant (pure state).
 */
function evaluateFaces(quadrantState) {
  return FANO_LINES.map(line => {
    const quads = line.points.map(pid => quadrantState[pid]);
    const roles = quads.map(q => QUADRANT_MAP[q].spo);
    const uniqueRoles = new Set(roles);

    // Pass condition: covers subject+predicate+object (one complete SPO triple)
    const isSPOComplete = uniqueRoles.has('subject') &&
                          uniqueRoles.has('predicate') &&
                          uniqueRoles.has('object');

    // Or: all three in the same state (coherent/entrained)
    const isCoherent = uniqueRoles.size === 1;

    const status = (isSPOComplete || isCoherent) ? 'pass' : 'fail';

    return {
      face_id:        line.id,
      vertices:       line.points.map(pid => `v${pid}`),
      invariant_name: isSPOComplete ? 'spo_triple_closure' : isCoherent ? 'coherent_state' : 'partial_closure',
      status,
      evidence: {
        quadrants:  quads,
        roles,
        spo_complete: isSPOComplete,
        coherent:     isCoherent,
      },
    };
  });
}

/** Compute centroid from faces per browser-v1 R4 */
function computeCentroid(faces) {
  const F_total = 7;
  const F_pass  = faces.filter(f => f.status === 'pass').length;
  const closure_ratio = F_pass / F_total;
  const stop_metric   = closure_ratio;
  const sabbath       = stop_metric === 1.0;

  return {
    stop_metric:   parseFloat(stop_metric.toFixed(10)),
    closure_ratio: parseFloat(closure_ratio.toFixed(10)),
    sabbath,
    reason: sabbath
      ? 'all_invariants_closed'
      : `incomplete_faces:${F_pass}/7`,
  };
}

// ─────────────────────────────────────────────────────────────
// NODE REGISTRY
// Builds the node graph from lights.json or defaults
// ─────────────────────────────────────────────────────────────

function buildNodeRegistry(lightsFile) {
  if (lightsFile && fs.existsSync(lightsFile)) {
    const lights = JSON.parse(fs.readFileSync(lightsFile, 'utf8'));
    const nodes = [];

    // Garden LEDs
    if (lights.garden) {
      lights.garden.rings.forEach(ring => {
        (ring.leds || []).forEach(led => {
          if (led.fano_point) {
            nodes.push({
              vertex_id:    led.id,
              path:         led.path,
              fano_point_id: led.fano_point <= 7 ? led.fano_point : null,
              device:       'garden',
              ring:         ring.index,
              device_offset: DEVICE_OFFSETS.garden,
              // w coefficient: ring index / max rings (depth in trie)
              w: ring.index / 8,
            });
          }
        });
      });
    }

    // Personal LEDs (stub — rings defined but leds array empty in lights.json)
    if (lights.personal) {
      lights.personal.rings.forEach(ring => {
        for (let i = 0; i < ring.led_count; i++) {
          nodes.push({
            vertex_id:    `p-r${ring.index}-${i}`,
            path:         `m/${lights.personal.purpose}'/${ring.index}'/${i}'/`,
            fano_point_id: (i % 7) + 1,
            device:       'personal',
            ring:         ring.index,
            device_offset: DEVICE_OFFSETS.personal,
            w: ring.index / lights.personal.rings.length,
          });
        }
      });
    }

    // Talisman LEDs
    if (lights.talisman) {
      (lights.talisman.leds || []).forEach(led => {
        nodes.push({
          vertex_id:    led.id,
          path:         led.path,
          fano_point_id: led.fano_point,
          device:       'talisman',
          ring:         0,
          device_offset: DEVICE_OFFSETS.talisman,
          w: 0,
        });
      });
    }

    return nodes;
  }

  // Default: 7 canonical Fano points only
  return FANO_POINTS.map(p => ({
    vertex_id:     `v${p.id}`,
    path:          `m/7'/${p.id - 1}'`,
    fano_point_id: p.id,
    device:        'talisman',
    ring:          0,
    device_offset: 0,
    w: 0,
  }));
}

// ─────────────────────────────────────────────────────────────
// ENTRAINMENT SCHEDULER
// Core loop: for each tick in the cycle, determine quadrant
// state of all 7 Fano points, evaluate faces, emit CommitEvent
// at each transition boundary.
// ─────────────────────────────────────────────────────────────

function buildEdges(quadrantState, nodes) {
  // Edges connect nodes sharing Fano line membership
  // channel_state reflects their current quadrant relationship
  const edges = [];
  const nodesByFano = {};
  nodes.forEach(n => {
    if (n.fano_point_id) {
      if (!nodesByFano[n.fano_point_id]) nodesByFano[n.fano_point_id] = [];
      nodesByFano[n.fano_point_id].push(n);
    }
  });

  FANO_LINES.forEach(line => {
    for (let i = 0; i < line.points.length; i++) {
      for (let j = i + 1; j < line.points.length; j++) {
        const fromPid = line.points[i];
        const toPid   = line.points[j];
        const fromQ   = quadrantState[fromPid];
        const toQ     = quadrantState[toPid];

        // Channel is 'open' when the two nodes are in complementary SPO roles
        const fromRole = QUADRANT_MAP[fromQ].spo;
        const toRole   = QUADRANT_MAP[toQ].spo;
        const complementary = fromRole !== toRole &&
                              fromRole !== 'centroid' &&
                              toRole   !== 'centroid';

        edges.push({
          edge_id:       `${line.id}-${fromPid}-${toPid}`,
          from:          `v${fromPid}`,
          to:            `v${toPid}`,
          channel_state: complementary ? 'open' : fromQ === toQ ? 'closed' : 'opening',
          last_seq:      0,
          fano_line:     line.id,
        });
      }
    }
  });

  return edges;
}

/**
 * Run the entrainment scheduler.
 * Emits NDJSON CommitEvents to stdout.
 */
function runScheduler(nodes, numCycles) {
  const write = obj => process.stdout.write(JSON.stringify(obj) + '\n');

  let lc        = 0;
  let prev_hash = null;

  // ── HEADER ────────────────────────────────────────────────
  write({
    type:            'header',
    protocol:        'semantic-basis-entrainment-v0.1',
    basisHash:       BASIS_HASH,
    spin_speed:      SPIN_SPEED,
    full_cycle_ticks: FULL_CYCLE,
    tick_ms:         TICK_MS,
    num_cycles:      numCycles,
    fano_lines:      FANO_LINES,
    device_offsets:  DEVICE_OFFSETS,
    quadrant_map:    QUADRANT_MAP,
    transitions:     TRANSITIONS,
    base_t:          BASE_T,
    t:               BASE_T,
  });

  // ── CYCLE LOOP ────────────────────────────────────────────
  for (let cycle = 0; cycle < numCycles; cycle++) {
    const cycleBaseT = BASE_T + cycle * FULL_CYCLE * TICK_MS;

    // Track current quadrant state across all ticks
    const currentQuadrant = {};
    FANO_POINTS.forEach(p => {
      const { x, y } = rotate(p, 0);
      currentQuadrant[p.id] = getQuadrant(x, y);
    });

    // Build set of all transition ticks in this cycle
    // Map: tick -> array of { pointId, fromQ, toQ }
    const transitionMap = {};
    FANO_POINTS.forEach(p => {
      TRANSITIONS[p.id].forEach(tr => {
        if (!transitionMap[tr.tick]) transitionMap[tr.tick] = [];
        transitionMap[tr.tick].push({
          pointId:   p.id,
          pointName: p.name,
          fromQ:     currentQuadrant[p.id],
          toQ:       tr.quadrant,
          angleDeg:  tr.angleDeg,
          x:         tr.x,
          y:         tr.y,
          role:      tr.role,
          spo:       tr.spo,
          repl:      tr.repl,
          io:        tr.io,
        });
      });
    });

    // Also emit device sync points from patterns.ndjson cadence
    const syncTicks = new Set([
      0,                                           // cycle start
      Math.floor(DEVICE_OFFSETS.personal / TICK_MS),
      Math.floor(DEVICE_OFFSETS.talisman / TICK_MS),
      Math.floor(DEVICE_OFFSETS.sync     / TICK_MS),
      FULL_CYCLE - 1,                              // cycle end
    ]);

    // Collect all ticks that need a commit (transitions + sync points)
    const commitTicks = new Set([
      ...Object.keys(transitionMap).map(Number),
      ...syncTicks,
    ]);

    // Sort and process
    const sortedTicks = [...commitTicks].sort((a, b) => a - b);

    for (const tick of sortedTicks) {
      const angleDeg = tick * SPIN_SPEED;
      const t        = cycleBaseT + tick * TICK_MS;

      // Apply any transitions at this tick
      if (transitionMap[tick]) {
        transitionMap[tick].forEach(tr => {
          currentQuadrant[tr.pointId] = tr.toQ;
        });
      }

      // Full quadrant state snapshot
      const quadrantState = { ...currentQuadrant };

      // Evaluate all 7 Fano line face invariants
      const faces    = evaluateFaces(quadrantState);
      const centroid = computeCentroid(faces);

      // Build edges from current quadrant state
      const edges = buildEdges(quadrantState, nodes);

      // Determine commit type
      const isSyncPoint    = syncTicks.has(tick);
      const isTransition   = !!transitionMap[tick];
      const commitType     = centroid.sabbath  ? 'commit'
                           : isSyncPoint       ? 'sync'
                           : isTransition      ? 'face_eval'
                           :                     'projection';

      // Find which node is currently acting as Subject (KK)
      const subjectPoints  = FANO_POINTS.filter(p => quadrantState[p.id] === 'KK');
      const primarySubject = subjectPoints[0] || FANO_POINTS[0];

      // Vertex identity for the primary subject
      const vertex = {
        vertex_id:    `v${primarySubject.id}`,
        path:         `m/44'/60'/0'/0/${primarySubject.id - 1}`,
        address:      `0x${crypto.createHash('sha256')
                        .update(`addr-${primarySubject.id}`)
                        .digest('hex').slice(0, 40)}`,
        pubkey:       `0x02${crypto.createHash('sha256')
                        .update(`pub-${primarySubject.id}`)
                        .digest('hex').slice(0, 64)}`,
        fano_point_id: primarySubject.id,
      };

      // Device-level timing annotations
      // (which device scale is the primary actor at this tick)
      const device = tick < DEVICE_OFFSETS.personal / TICK_MS ? 'garden'
                   : tick < DEVICE_OFFSETS.talisman / TICK_MS ? 'personal'
                   : tick < DEVICE_OFFSETS.sync     / TICK_MS ? 'talisman'
                   : 'federation';

      // Full SPO context for this tick
      const spoContext = {};
      FANO_POINTS.forEach(p => {
        const q = quadrantState[p.id];
        spoContext[p.name] = {
          quadrant: q,
          spo:      QUADRANT_MAP[q].spo,
          role:     QUADRANT_MAP[q].role,
          golden:   QUADRANT_MAP[q].golden,
          repl:     QUADRANT_MAP[q].repl,
          io:       QUADRANT_MAP[q].io,
        };
      });

      // SAB position: fano_point -> row, w -> col
      const sabEntries = FANO_POINTS.map(p => ({
        fano_point_id: p.id,
        quadrant:      quadrantState[p.id],
        sab_row:       (p.id - 1),
        sab_col:       Math.floor((angleDeg % 360) / 360 * 16),
        sab_index:     (p.id - 1) * 16 + Math.floor((angleDeg % 360) / 360 * 16),
      }));

      // Build commit (without self_hash and sig first)
      const commitBody = {
        id:          `cmt-${cycle}-${tick}-${t}`,
        t,
        lc,
        type:        commitType,
        cycle,
        tick,
        angle_deg:   angleDeg,
        device,
        parents:     prev_hash ? [prev_hash] : [],
        vertex,
        edges,
        faces,
        centroid,
        spo_context: spoContext,
        sab_entries: sabEntries,
        transitions: transitionMap[tick] || [],
        basisHash:   BASIS_HASH,
        status:      'pending',
        prev_hash,
      };

      const self_hash = computeSelfHash(commitBody);
      const sig       = sha256Hex(`sig:${self_hash}:${BASIS_HASH}`); // stub signer

      const commit = {
        ...commitBody,
        self_hash,
        sig,
        status: 'validated',
      };

      write(commit);

      prev_hash = self_hash;
      lc++;

      // ── PROJECTION EVENT ──────────────────────────────────
      // Emitted at every sync point — tells SVG/Three.js to update
      if (isSyncPoint || centroid.sabbath) {
        const prj_self_hash = sha256Hex(`prj:${prev_hash}:${t}`);
        const projection = {
          id:             `prj-${cycle}-${tick}`,
          t,
          lc,
          type:           'projection',
          source_commit:  commit.id,
          // SVG overlay IDs matching fano-with-light-arrays.svg
          svg_overlay_id: `fano-overlay-${device}`,
          scene_transform: {
            position: [0, 0, 0],
            rotation: [0, angleDeg, 0],
            scale:    [1, 1, 1],
          },
          render_hints: {
            // Color each Fano point by its current quadrant role
            vertex_colors: Object.fromEntries(
              FANO_POINTS.map(p => [
                `v${p.id}`,
                { KK:'#00ff00', KU:'#ffff00', UK:'#ff8800', UU:'#0000ff' }[quadrantState[p.id]]
              ])
            ),
            edge_color:  centroid.sabbath ? '#ffffff' : '#3a3530',
            opacity:     0.9,
            sabbath:     centroid.sabbath,
            stop_metric: centroid.stop_metric,
          },
          prev_hash,
          self_hash:  prj_self_hash,
          sig:        sha256Hex(`prj-sig:${prj_self_hash}`),
          basisHash:  BASIS_HASH,
        };

        write(projection);
        // Projection advances the chain
        prev_hash = prj_self_hash;
        lc++;
      }
    }

    // ── END OF CYCLE SYNC ─────────────────────────────────────
    // Federation event — phase-lock all three device scales
    // Mirrors the federation record at t+5s in patterns.ndjson
    const syncCommit = {
      id:       `syn-${cycle}-${BASE_T + cycle * FULL_CYCLE * TICK_MS + DEVICE_OFFSETS.sync}`,
      t:        BASE_T + cycle * FULL_CYCLE * TICK_MS + DEVICE_OFFSETS.sync,
      lc,
      type:     'sync',
      cycle,
      peer_id:  'genesis-gate',
      // The three device scales syncing at the genesis gate
      // (m/240'/0'/0'/8' = garden center LED)
      federation: {
        garden:   `m/240'/0'/0'/8'`,
        personal: `m/60'/0'/0'/8'`,
        talisman: `m/7'/pointer`,
      },
      known_tip:         prev_hash,
      advertised_hashes: [prev_hash],
      accepted:          [prev_hash],
      rejected:          [],
      basisHash:         BASIS_HASH,
      prev_hash,
      self_hash: sha256Hex(`sync:${cycle}:${prev_hash}`),
      sig:       sha256Hex(`sync-sig:${cycle}:${prev_hash}`),
    };

    write(syncCommit);
    prev_hash = syncCommit.self_hash;
    lc++;
  }

  // ── FLUSH sentinel ────────────────────────────────────────
  write({
    type:      'flush',
    basisHash: BASIS_HASH,
    stats: {
      total_commits: lc,
      cycles:        numCycles,
      ticks_per_cycle: FULL_CYCLE,
    },
    sentinel:  'STREAM_COMPLETE',
    t:         Date.now(),
  });
}

// ─────────────────────────────────────────────────────────────
// REPLAY MODE
// Re-process an existing patterns.ndjson through the scheduler,
// enriching each record with its entrainment context.
// ─────────────────────────────────────────────────────────────

function replayFile(replayPath) {
  const write = obj => process.stdout.write(JSON.stringify(obj) + '\n');
  const lines = fs.readFileSync(replayPath, 'utf8').trim().split('\n').map(JSON.parse);

  let lc = 0;
  let prev_hash = null;
  const baseT = lines[0]?.t || BASE_T;

  write({
    type:     'header',
    protocol: 'semantic-basis-entrainment-v0.1',
    mode:     'replay',
    source:   replayPath,
    basisHash: BASIS_HASH,
    t:        baseT,
  });

  lines.forEach(record => {
    // Compute tick from t offset
    const offsetMs = (record.t || baseT) - baseT;
    const tick     = Math.floor(offsetMs / TICK_MS) % FULL_CYCLE;
    const angleDeg = tick * SPIN_SPEED;
    const cycle    = Math.floor(offsetMs / (FULL_CYCLE * TICK_MS));

    // Get quadrant state at this tick
    const quadrantState = {};
    FANO_POINTS.forEach(p => {
      const { x, y } = rotate(p, angleDeg);
      quadrantState[p.id] = getQuadrant(x, y);
    });

    const faces    = evaluateFaces(quadrantState);
    const centroid = computeCentroid(faces);

    // Enrich the original record with entrainment context
    const enriched = {
      ...record,
      // Entrainment annotations
      entrained: {
        tick, angleDeg, cycle,
        quadrant_state: quadrantState,
        spo_context: Object.fromEntries(
          FANO_POINTS.map(p => [p.name, {
            quadrant: quadrantState[p.id],
            spo:      QUADRANT_MAP[quadrantState[p.id]].spo,
            role:     QUADRANT_MAP[quadrantState[p.id]].role,
          }])
        ),
        faces,
        centroid,
      },
      lc,
      prev_hash,
      self_hash: sha256Hex(`replay:${JSON.stringify(record)}:${tick}`),
      sig:       sha256Hex(`replay-sig:${tick}:${BASIS_HASH}`),
      basisHash: BASIS_HASH,
    };

    write(enriched);
    prev_hash = enriched.self_hash;
    lc++;
  });

  write({ type:'flush', sentinel:'STREAM_COMPLETE', stats:{ replayed: lines.length }, t: Date.now() });
}

// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

if (REPLAY_FILE) {
  replayFile(REPLAY_FILE);
} else {
  const nodes = buildNodeRegistry(LIGHTS_FILE);
  runScheduler(nodes, NUM_CYCLES);
}
