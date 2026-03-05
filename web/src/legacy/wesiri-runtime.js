// ═══════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════

const FANO_POINTS = [
  { id:1, name:'Metatron',  baseX: 0.15, baseY: 0.15, color:'#ff3028', hue:0   },
  { id:2, name:'Solomon',   baseX: 0.35, baseY: 0.15, color:'#ff9030', hue:30  },
  { id:3, name:'Solon',     baseX:-0.05, baseY: 0.15, color:'#ffe048', hue:60  },
  { id:4, name:'Asabiyyah', baseX: 0.0,  baseY:-0.25, color:'#40d048', hue:120 },
  { id:5, name:'Enoch',     baseX:-0.35, baseY: 0.15, color:'#3090ff', hue:240 },
  { id:6, name:'Speaker',   baseX: 0.35, baseY: 0.15, color:'#5048d8', hue:270 },
  { id:7, name:'Genesis',   baseX: 0.0,  baseY: 0.35, color:'#8830e8', hue:300 },
];

const FANO_LINES = [
  { id:'L1', points:[1,2,4] },
  { id:'L2', points:[1,3,5] },
  { id:'L3', points:[1,6,7] },
  { id:'L4', points:[2,3,6] },
  { id:'L5', points:[2,5,7] },
  { id:'L6', points:[3,4,6] },
  { id:'L7', points:[4,5,7] },
];

const QUADRANT_MAP = {
  KK: { spo:'subject',   role:'Intent',    golden:'freedom',  repl:'READ',  io:'stdin',  color:'#00ff44' },
  KU: { spo:'predicate', role:'Event',     golden:'grace',    repl:'EVAL',  io:'stdout', color:'#ffee00' },
  UK: { spo:'object',    role:'Incidence', golden:'maybe',    repl:'PRINT', io:'port',   color:'#ff8800' },
  UU: { spo:'centroid',  role:'Stop',      golden:'stop',     repl:'LOOP',  io:'file',   color:'#4455ff' },
};

// Physical ring layout — from lights.json
const RINGS = [
  { r:0,   count:1,  purpose:'center'    },
  { r:28,  count:8,  purpose:'fano'      },
  { r:52,  count:12, purpose:'harmonics' },
  { r:76,  count:16, purpose:'canvas'    },
  { r:102, count:24, purpose:'rotation'  },
  { r:130, count:32, purpose:'expansion' },
  { r:160, count:40, purpose:'h58'       },
  { r:190, count:48, purpose:'hex'       },
  { r:222, count:60, purpose:'dodeca'    },
];

// Hardware layers mapped to protocol layers
const HW_LAYERS = [
  { id:'global',   name:'WESIRI 241',    leds:241, purpose:240, color:'#c9b99a', desc:'Full State · Garden Ring' },
  { id:'local',    name:'7-ring talisman', leds:7, purpose:7,   color:'#ff3028', desc:'Local State · Talisman' },
  { id:'shared',   name:'16×16 matrix',  leds:256, purpose:256, color:'#3090ff', desc:'Shared State · Window' },
  { id:'artifact', name:'100px single',  leds:100, purpose:100, color:'#8830e8', desc:'Artifact · SHA360°' },
];

// SVG documents in the federated graph
const SVG_DOCS = [
  { id:'fano-garden-seed-kernel', name:'Seed Kernel',       hash:'0xa1b2c3d4', type:'canonical', color:'#c9b99a' },
  { id:'fano-with-light-arrays',  name:'Light Arrays',      hash:'0xe5f6a7b8', type:'projection', color:'#3090ff' },
  { id:'fano-garden',             name:'Garden',            hash:'0xc9d0e1f2', type:'instance',   color:'#40d048' },
  { id:'epistemic-square',        name:'Epistemic Square',  hash:'0x23a4b5c6', type:'operator',   color:'#ffee00' },
  { id:'dome-svg',                name:'Dome',              hash:'0x78d9e0f1', type:'projection', color:'#ff9030' },
];

// Mock ESP32 nodes in the C3 lattice
const ESP_NODES = [
  { id:'esp-s3-00', role:'controller', state:'sealed',    metric:1.00, color:'#00ff44' },
  { id:'esp-c3-01', role:'sensor',     state:'validated', metric:0.71, color:'#ffee00' },
  { id:'esp-c3-02', role:'sensor',     state:'validated', metric:0.57, color:'#ffee00' },
  { id:'esp-c3-03', role:'sensor',     state:'pending',   metric:0.28, color:'#ff8800' },
  { id:'esp-c3-04', role:'sensor',     state:'pending',   metric:0.14, color:'#ff8800' },
];

// WordNet basis words mapped to golden twelve
const WORDNET_SIMPLEX = [
  { word:'Freedom',     face:'agency', synset:'freedom.n.01', depth:4, w:0.25 },
  { word:'Grace',       face:'ethics', synset:'grace.n.03',   depth:6, w:0.375 },
  { word:'Yes',         face:'logic',  synset:'yes.n.01',     depth:2, w:0.125 },
  { word:'Stop',        face:'logic',  synset:'stop.v.01',    depth:5, w:0.3125 },
  { word:'Love',        face:'ethics', synset:'love.n.01',    depth:7, w:0.4375 },
  { word:'Sovereignty', face:'agency', synset:'sovereignty.n.01', depth:5, w:0.3125 },
];

// ═══════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════

let state = {
  angle:       0,
  spinSpeed:   0.5,
  autoRotate:  true,
  lc:          0,
  prevHash:    null,
  tick:        0,
  cycle:       0,
  quadrants:   {},   // fano_id -> KK|KU|UK|UU
  ledColors:   {},   // path -> {h,s,v}
  activeLine:  null,
  faces:       [],
  centroid:    { stop_metric:0, closure_ratio:0, sabbath:false, reason:'' },
  pattern:     null,
  patternStep: 0,
  basisHash:   '0x' + Array.from({length:32}, () => Math.floor(Math.random()*256).toString(16).padStart(2,'0')).join(''),
  sabGrid:     new Uint32Array(256),
  narratives:  [],
  activeDoc:   SVG_DOCS[0]?.id ?? null,
};

// ═══════════════════════════════════════════════════════
// CRYPTO (lightweight stub — sha256-like via XOR chain)
// ═══════════════════════════════════════════════════════

function hashStr(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return '0x' + h.toString(16).padStart(8,'0') +
         ((h ^ 0xdeadbeef) >>> 0).toString(16).padStart(8,'0');
}

// ═══════════════════════════════════════════════════════
// EPISTEMIC SQUARE MATH (mirrors epistemic-square.js)
// ═══════════════════════════════════════════════════════

function rotatePoint(p, angleDeg) {
  const rad  = -angleDeg * Math.PI / 180;
  const cosA = Math.cos(rad), sinA = Math.sin(rad);
  return {
    x: p.baseX * cosA - p.baseY * sinA,
    y: p.baseX * sinA + p.baseY * cosA,
  };
}

function getQuadrant(x, y) {
  if (x >= 0 && y >= 0) return 'KK';
  if (x <  0 && y >= 0) return 'KU';
  if (x >= 0 && y <  0) return 'UK';
  return 'UU';
}

function updateQuadrants(angleDeg) {
  const q = {};
  FANO_POINTS.forEach(p => {
    const { x, y } = rotatePoint(p, angleDeg);
    q[p.id] = getQuadrant(x, y);
  });
  return q;
}

// ═══════════════════════════════════════════════════════
// FACE EVALUATION
// ═══════════════════════════════════════════════════════

function evaluateFaces(quads) {
  return FANO_LINES.map(line => {
    const qs    = line.points.map(pid => quads[pid]);
    const roles = qs.map(q => QUADRANT_MAP[q].spo);
    const u     = new Set(roles);
    const isSPO = u.has('subject') && u.has('predicate') && u.has('object');
    const isCoherent = u.size === 1;
    return {
      face_id: line.id,
      vertices: line.points.map(pid => `v${pid}`),
      invariant_name: isSPO ? 'spo_triple_closure' : isCoherent ? 'coherent_state' : 'partial',
      status: (isSPO || isCoherent) ? 'pass' : 'fail',
      quadrants: qs,
      roles,
    };
  });
}

function computeCentroid(faces) {
  const pass = faces.filter(f => f.status === 'pass').length;
  const cr   = pass / 7;
  return {
    stop_metric:   cr,
    closure_ratio: cr,
    sabbath:       cr === 1.0,
    reason:        cr === 1.0 ? 'all_invariants_closed' : `incomplete_faces:${pass}/7`,
    pass,
  };
}

// ═══════════════════════════════════════════════════════
// COMMIT EMISSION
// ═══════════════════════════════════════════════════════

function emitCommit(type, extra = {}) {
  const payload = {
    id:     `cmt-${state.cycle}-${state.tick}-${Date.now()}`,
    t:      Date.now(),
    lc:     state.lc++,
    type,
    tick:   state.tick,
    angle:  state.angle.toFixed(2),
    centroid: state.centroid,
    faces:  state.faces,
    basisHash: state.basisHash,
    prev_hash: state.prevHash,
    ...extra,
  };
  payload.self_hash = hashStr(JSON.stringify(payload));
  payload.sig       = hashStr('sig:' + payload.self_hash);
  state.prevHash    = payload.self_hash;

  // Log to stream
  appendStream(payload);

  // Update SAB
  FANO_POINTS.forEach(p => {
    const q   = state.quadrants[p.id] || 'UU';
    const row = p.id - 1;
    const col = Math.floor((state.angle % 360) / 360 * 16);
    const idx = row * 16 + col;
    state.sabGrid[idx] = p.hue;
  });

  // Narrative
  if (type === 'face_eval' || type === 'commit') {
    buildNarrative(payload);
  }

  return payload;
}

// ═══════════════════════════════════════════════════════
// SVG RING BUILDER
// ═══════════════════════════════════════════════════════

function buildRings() {
  const ringsG = document.getElementById('svg-rings');
  const linesG = document.getElementById('svg-fano-lines');
  ringsG.innerHTML = '';
  linesG.innerHTML = '';

  RINGS.forEach((ring, ri) => {
    const g = document.createElementNS('http://www.w3.org/2000/svg','g');
    g.id = `ring-${ri}`;

    if (ri === 0) return; // center handled separately

    for (let li = 0; li < ring.count; li++) {
      const angleDeg = (li / ring.count) * 360;
      const angleRad = (angleDeg - 90) * Math.PI / 180;
      const cx = ring.r * Math.cos(angleRad);
      const cy = ring.r * Math.sin(angleRad);
      const fanoId = (li % 7) + 1;
      const fano   = FANO_POINTS.find(p => p.id === fanoId);
      const ledR   = ri <= 2 ? 5 : ri <= 4 ? 4 : ri <= 6 ? 3 : 2.5;

      const path = `m/240'/${ri}'/${li}'/${fanoId}'`;

      const c = document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx', cx.toFixed(1));
      c.setAttribute('cy', cy.toFixed(1));
      c.setAttribute('r',  ledR);
      c.setAttribute('fill', fano.color);
      c.setAttribute('opacity', '0.7');
      c.setAttribute('class','led');
      c.dataset.path  = path;
      c.dataset.fano  = fanoId;
      c.dataset.ring  = ri;
      c.dataset.led   = li;
      c.id = `led-r${ri}-l${li}`;

      // Click to highlight fano line
      c.addEventListener('click', () => highlightFanoLines(fanoId));
      g.appendChild(c);
    }
    ringsG.appendChild(g);
  });

  // Draw Fano lines using ring-1 positions as anchor points
  const ring1 = RINGS[1];
  const ptPos = {};
  FANO_POINTS.forEach((fp, fi) => {
    const angleDeg = (fi / 7) * 360;
    const angleRad = (angleDeg - 90) * Math.PI / 180;
    ptPos[fp.id] = {
      x: ring1.r * Math.cos(angleRad),
      y: ring1.r * Math.sin(angleRad),
    };
  });

  FANO_LINES.forEach(line => {
    const [a,b,c] = line.points.map(pid => ptPos[pid]);
    const el = document.createElementNS('http://www.w3.org/2000/svg','line');
    // Draw as triangle centroid-connected lines
    const cx2 = (a.x+b.x+c.x)/3, cy2 = (a.y+b.y+c.y)/3;
    // Draw 3 lines from each vertex to centroid
    line.points.forEach(pid => {
      const p = ptPos[pid];
      const seg = document.createElementNS('http://www.w3.org/2000/svg','line');
      seg.setAttribute('x1', p.x.toFixed(1));
      seg.setAttribute('y1', p.y.toFixed(1));
      seg.setAttribute('x2', cx2.toFixed(1));
      seg.setAttribute('y2', cy2.toFixed(1));
      seg.setAttribute('class','fano-line-svg');
      seg.dataset.line = line.id;
      linesG.appendChild(seg);
    });
  });
}

// ═══════════════════════════════════════════════════════
// HIGHLIGHT FANO LINES
// ═══════════════════════════════════════════════════════

function highlightFanoLines(fanoId) {
  const activeLines = FANO_LINES.filter(l => l.points.includes(fanoId));
  document.querySelectorAll('.fano-line-svg').forEach(el => {
    const isActive = activeLines.some(l => l.id === el.dataset.line);
    el.classList.toggle('lit', isActive);
    el.style.stroke = isActive
      ? FANO_POINTS.find(p => p.id === fanoId).color
      : '';
  });
  state.activeLine = activeLines.map(l=>l.id).join(', ');
  document.getElementById('active-line-display').textContent =
    state.activeLine || '—';
}

// ═══════════════════════════════════════════════════════
// UPDATE LED COLORS FROM QUADRANT STATE
// ═══════════════════════════════════════════════════════

function updateLEDColors() {
  document.querySelectorAll('.led[data-fano]').forEach(el => {
    const fanoId = parseInt(el.dataset.fano);
    if (!fanoId || fanoId > 7) return;
    const q     = state.quadrants[fanoId] || 'UU';
    const qColor = QUADRANT_MAP[q].color;
    const base   = FANO_POINTS.find(p => p.id === fanoId)?.color || '#ffffff';

    // Blend base color with quadrant color based on metric
    el.style.fill = q === 'KK' ? base :
                    q === 'UU' ? '#223' : base;
    el.style.opacity = q === 'KK' ? '1' : q === 'KU' ? '0.8' : '0.5';
    if (q === 'KK') el.setAttribute('filter','url(#glow-sm)');
    else el.removeAttribute('filter');
  });

  // Center LED reflects sabbath
  const center = document.getElementById('led-center');
  if (state.centroid.sabbath) {
    center.setAttribute('fill','#ffffff');
    center.setAttribute('filter','url(#glow-lg)');
    document.body.classList.add('sabbath');
  } else {
    center.setAttribute('fill', '#888888');
    center.setAttribute('filter','url(#glow-md)');
    document.body.classList.remove('sabbath');
  }
}

// ═══════════════════════════════════════════════════════
// UPDATE EPISTEMIC SQUARE (mini)
// ═══════════════════════════════════════════════════════

function updateEpistemicSquare() {
  const g = document.getElementById('ep-points-g');
  g.innerHTML = '';
  FANO_POINTS.forEach(fp => {
    const pos = rotatePoint(fp, state.angle);
    const q   = state.quadrants[fp.id] || 'UU';
    const cx  = 100 + pos.x * 200;
    const cy  = 100 - pos.y * 200; // SVG y-flip
    const c   = document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('cx', cx.toFixed(1));
    c.setAttribute('cy', cy.toFixed(1));
    c.setAttribute('r', '5');
    c.setAttribute('fill', QUADRANT_MAP[q].color);
    c.setAttribute('opacity','0.9');
    const t = document.createElementNS('http://www.w3.org/2000/svg','text');
    t.setAttribute('x', cx.toFixed(1));
    t.setAttribute('y', (cy - 8).toFixed(1));
    t.setAttribute('text-anchor','middle');
    t.setAttribute('fill', fp.color);
    t.setAttribute('style','font-size:6px;font-family:monospace');
    t.textContent = fp.name.slice(0,3);
    g.appendChild(c);
    g.appendChild(t);
  });
}

// ═══════════════════════════════════════════════════════
// UPDATE SPO TABLE
// ═══════════════════════════════════════════════════════

function updateSPOTable() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onSPO === 'function') {
    const rows = FANO_POINTS.map((fp) => {
      const q = state.quadrants[fp.id] || 'UU';
      const qm = QUADRANT_MAP[q];
      return {
        id: fp.id,
        name: fp.name,
        color: fp.color,
        q,
        role: qm.role,
        repl: qm.repl,
        io: qm.io,
      };
    });
    bridge.onSPO(rows);
    return;
  }

  const el = document.getElementById('spo-table');
  el.innerHTML = FANO_POINTS.map(fp => {
    const q  = state.quadrants[fp.id] || 'UU';
    const qm = QUADRANT_MAP[q];
    return `<div class="spo-row">
      <span class="spo-name" style="color:${fp.color}">${fp.name}</span>
      <span class="spo-quad ${q}">${q}</span>
      <span class="spo-role">${qm.role}</span>
      <span class="spo-repl">${qm.repl}·${qm.io}</span>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════════
// UPDATE FACE TABLE
// ═══════════════════════════════════════════════════════

function updateFaceTable() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onFaces === 'function') {
    bridge.onFaces(state.faces.map((f) => ({
      face_id: f.face_id,
      vertices: [...f.vertices],
      status: f.status,
      invariant_name: f.invariant_name,
    })));
    return;
  }

  const el = document.getElementById('face-table');
  el.innerHTML = state.faces.map(f => `
    <div class="face-row">
      <span class="face-id">${f.face_id}</span>
      <span class="face-pts">{${f.vertices.join(',')}}</span>
      <span class="face-status ${f.status}">${f.status.toUpperCase()}</span>
      <span class="face-inv">${f.invariant_name}</span>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════
// UPDATE CENTROID
// ═══════════════════════════════════════════════════════

function updateCentroid() {
  const c = state.centroid;
  const bridge = window.__wesiriBridge;

  if (bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidPanel === 'function') {
    bridge.onCentroidPanel({
      stopMetric: c.stop_metric,
      sabbath: c.sabbath,
    });
  }

  if (bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidStatus === 'function') {
    bridge.onCentroidStatus({
      stopMetric: c.stop_metric,
      sabbath: c.sabbath,
    });
  }

  if (!(bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidPanel === 'function')) {
    document.getElementById('cent-metric').textContent = c.stop_metric.toFixed(4);
    document.getElementById('cent-bar').style.width = (c.stop_metric * 100) + '%';
    const sab = document.getElementById('cent-sabbath');
    sab.textContent = c.sabbath ? 'SABBATH ✦' : 'Φ ' + (c.stop_metric * 7).toFixed(0) + '/7';
    sab.style.color = c.sabbath ? '#00ff44' : 'var(--dim)';
  }

  // Header
  if (!(bridge && bridge.renderMode === 'react' && typeof bridge.onCentroidStatus === 'function')) {
    document.getElementById('hdr-metric').textContent = 'Φ:' + c.stop_metric.toFixed(2);
    document.getElementById('hdr-sabbath').textContent = c.sabbath ? 'SABBATH:✦' : 'SABBATH:—';
    document.getElementById('hdr-sabbath').style.color = c.sabbath ? '#00ff44' : 'var(--dim)';
  }
}

// ═══════════════════════════════════════════════════════
// UPDATE 16x16 SAB WINDOW
// ═══════════════════════════════════════════════════════

function updateWindow() {
  const bridge = window.__wesiriBridge;
  const colors = new Array(256);

  for (let i = 0; i < 256; i++) {
    const row = Math.floor(i / 16);
    const col = i % 16;
    const fanoId = (row % 7) + 1;
    const q = state.quadrants[fanoId] || 'UU';
    const alpha = col / 15 * 0.8 + 0.1; // w-depth fade
    const qColors = { KK:'0,255,68', KU:'255,238,0', UK:'255,136,0', UU:'68,85,255' };
    colors[i] = `rgba(${qColors[q]},${(alpha * (row < 12 ? 0.6 : 0.3)).toFixed(2)})`;
  }

  if (bridge && bridge.renderMode === 'react' && typeof bridge.onWindowColors === 'function') {
    bridge.onWindowColors(colors);
    return;
  }

  const el = document.getElementById('window-grid');
  if (!el.children.length) {
    for (let i = 0; i < 256; i++) {
      const cell = document.createElement('div');
      cell.className = 'win-cell';
      cell.title = `SAB[${i}] row=${Math.floor(i/16)} col=${i%16}`;
      el.appendChild(cell);
    }
  }

  const cells = el.children;
  for (let i = 0; i < 256; i++) {
    cells[i].style.background = colors[i];
  }
}

// ═══════════════════════════════════════════════════════
// STREAM LOG
// ═══════════════════════════════════════════════════════

function appendStream(commit) {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onCommit === 'function') {
    bridge.onCommit(commit);
    return;
  }

  const el = document.getElementById('stream-log');
  const line = document.createElement('div');
  line.className = `stream-line ${commit.type}`;
  line.textContent = `lc:${commit.lc} ${commit.type} ${commit.self_hash?.slice(0,14)}… Φ:${commit.centroid?.stop_metric?.toFixed(2)||'—'}`;
  el.insertBefore(line, el.firstChild);
  // Keep max 40 lines
  while (el.children.length > 40) el.removeChild(el.lastChild);

  // Schema panel shows latest commit
  document.getElementById('schema-panel').textContent =
    JSON.stringify({
      id:   commit.id?.slice(0,20)+'…',
      t:    commit.t,
      lc:   commit.lc,
      type: commit.type,
      centroid: commit.centroid,
      prev_hash: commit.prev_hash?.slice(0,14)+'…',
      self_hash: commit.self_hash?.slice(0,14)+'…',
    }, null, 1);
}

// ═══════════════════════════════════════════════════════
// NARRATIVE BUILDER
// ═══════════════════════════════════════════════════════

const NARRATIVE_TEMPLATES = {
  subject_pass:   (n,r) => `${n} intends ${r} through the open channel`,
  predicate_pass: (n,r) => `${n} mediates the event toward resolution`,
  object_pass:    (n,r) => `${n} receives incidence, closes the triple`,
  centroid_pass:  (n,r) => `${n} rests at the centroid — meaning held`,
  sabbath:        ()    => `All seven lines close. The garden is sealed. ✦`,
};

function buildNarrative(commit) {
  if (commit.centroid?.sabbath) {
    state.narratives.unshift(NARRATIVE_TEMPLATES.sabbath());
  } else {
    const subjects = FANO_POINTS.filter(p => state.quadrants[p.id] === 'KK');
    if (subjects.length) {
      const n = subjects[0].name;
      const r = QUADRANT_MAP['KK'].golden;
      state.narratives.unshift(NARRATIVE_TEMPLATES.subject_pass(n, r));
    }
  }
  if (state.narratives.length > 20) state.narratives = state.narratives.slice(0,20);

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onNarratives === 'function') {
    bridge.onNarratives([...state.narratives]);
    return;
  }

  const el = document.getElementById('narrative-panel');
  el.innerHTML = state.narratives.map(t =>
    `<div style="padding:2px 0;border-bottom:1px solid var(--dimmer)">${t}</div>`
  ).join('');
}

// ═══════════════════════════════════════════════════════
// WORDNET PANEL
// ═══════════════════════════════════════════════════════

function buildWordnetPanel() {
  const el = document.getElementById('wordnet-panel');
  el.innerHTML = `
    <div style="font-size:7px;color:var(--gold2);line-height:1.8">
      <div style="color:var(--dim);margin-bottom:4px">basis: ${state.basisHash.slice(0,20)}…</div>
      ${WORDNET_SIMPLEX.map(ws => `
        <div style="display:flex;gap:6px;align-items:center;padding:2px 0;border-bottom:1px solid var(--dimmer)">
          <span style="color:${ws.face==='agency'?'#00ff44':ws.face==='ethics'?'#ffee00':'#ff8800'};width:12px">▸</span>
          <span style="width:70px;color:var(--gold)">${ws.word}</span>
          <span style="color:var(--dim);flex:1">${ws.synset}</span>
          <span style="color:var(--gold2)">w=${ws.w.toFixed(3)}</span>
        </div>`).join('')}
      <div style="margin-top:8px;color:var(--dim)">WordNet 3.1 · SHA256:</div>
      <div style="color:var(--gold2);word-break:break-all;font-size:6px">${state.basisHash}</div>
    </div>`;
}

// ═══════════════════════════════════════════════════════
// DOCUMENT GRAPH PANEL
// ═══════════════════════════════════════════════════════

function buildDocGraph() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react') {
    emitDocState();
    return;
  }

  const el = document.getElementById('doc-graph');
  el.innerHTML = SVG_DOCS.map(doc => `
    <div class="doc-node" onclick="selectDoc('${doc.id}')" id="docnode-${doc.id}">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:${doc.color};font-size:9px">${doc.name}</span>
        <span class="doc-node-type">${doc.type}</span>
      </div>
      <div class="doc-node-hash">${doc.hash} · ${doc.id}</div>
    </div>`).join('');
}

function selectDoc(id) {
  state.activeDoc = id;
  emitDocState();

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react') {
    appendStream({ lc:state.lc++, type:'projection', t:Date.now(),
      self_hash: hashStr('prj:'+id+Date.now()),
      prev_hash: state.prevHash,
      centroid: state.centroid,
      id: `prj-${id}-${Date.now()}` });
    return;
  }

  document.querySelectorAll('.doc-node').forEach(n => n.classList.remove('active'));
  const el = document.getElementById('docnode-' + id);
  if (el) el.classList.add('active');
  appendStream({ lc:state.lc++, type:'projection', t:Date.now(),
    self_hash: hashStr('prj:'+id+Date.now()),
    prev_hash: state.prevHash,
    centroid: state.centroid,
    id: `prj-${id}-${Date.now()}` });
}

// ═══════════════════════════════════════════════════════
// ESP32 LATTICE PANEL
// ═══════════════════════════════════════════════════════

function buildESPList() {
  const el = document.getElementById('esp-list');
  el.innerHTML = ESP_NODES.map(n => `
    <div class="esp-node">
      <span class="esp-dot" style="background:${n.color}"></span>
      <span class="esp-id">${n.id}</span>
      <span class="esp-state" style="color:${n.color}">${n.state}</span>
      <span class="esp-metric" style="color:${n.color}">${n.metric.toFixed(2)}</span>
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════
// PATTERN RUNNER
// ═══════════════════════════════════════════════════════

function runPattern(name) {
  state.pattern = name;
  state.patternStep = 0;
  appendStream({ lc:state.lc++, type:'face_eval', t:Date.now(),
    self_hash: hashStr('pat:'+name), prev_hash: state.prevHash,
    centroid: state.centroid, id:`pat-${name}-${Date.now()}` });
}

function stepPattern() {
  if (!state.pattern) return;
  if (state.pattern === 'tetrahedral_sweep') {
    // Sweep radially ring by ring
    const ring = RINGS[state.patternStep % RINGS.length];
    document.querySelectorAll(`.led[data-ring="${state.patternStep % RINGS.length}"]`).forEach(el => {
      el.setAttribute('filter','url(#glow-md)');
      setTimeout(() => el.removeAttribute('filter'), 400);
    });
    state.patternStep++;
    if (state.patternStep >= RINGS.length) state.pattern = null;
  } else if (state.pattern === 'fano_line_cycle') {
    const line = FANO_LINES[state.patternStep % 7];
    document.querySelectorAll('.fano-line-svg').forEach(el => {
      const isActive = el.dataset.line === line.id;
      el.classList.toggle('lit', isActive);
    });
    state.activeLine = line.id;
    document.getElementById('active-line-display').textContent = line.id + ' {' + line.points.join(',') + '}';
    state.patternStep++;
    if (state.patternStep >= 7) { state.pattern = null; document.querySelectorAll('.fano-line-svg').forEach(el=>el.classList.remove('lit')); }
  }
}

// ═══════════════════════════════════════════════════════
// CONTROLS
// ═══════════════════════════════════════════════════════

function toggleRotate() {
  state.autoRotate = !state.autoRotate;
  emitControlState();

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react') return;

  const btn = document.getElementById('btn-rotate');
  if (!btn) return;
  btn.textContent = state.autoRotate ? 'ON' : 'OFF';
  btn.classList.toggle('active', state.autoRotate);
}

function seekSabbath() {
  // Find nearest angle where sabbath occurs
  // Try angles in steps until sabbath or max search
  for (let a = state.angle; a < state.angle + 360; a += 0.5) {
    const q = updateQuadrants(a);
    const f = evaluateFaces(q);
    const c = computeCentroid(f);
    if (c.sabbath) {
      state.angle = a % 360;
      break;
    }
  }
}

function setSpinSpeed(value) {
  const parsed = Number.parseFloat(String(value));
  state.spinSpeed = Number.isFinite(parsed) ? parsed : state.spinSpeed;
  emitControlState();

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react') return;

  const valEl = document.getElementById('spin-val');
  if (valEl) valEl.textContent = state.spinSpeed.toFixed(1) + '°';
}

function emitControlState() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onControlState === 'function') {
    bridge.onControlState({
      spinSpeed: state.spinSpeed,
      autoRotate: state.autoRotate,
    });
  }
}

function emitDocState() {
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onDocs === 'function') {
    bridge.onDocs({
      docs: SVG_DOCS.map((doc) => ({ ...doc })),
      activeDoc: state.activeDoc ?? null,
    });
  }
}

function bindBridgeCommands() {
  const bridge = window.__wesiriBridge;
  if (!(bridge && bridge.renderMode === 'react')) return;

  bridge.commands = {
    setSpinSpeed,
    toggleRotate,
    seekSabbath,
    runPattern,
    selectDoc,
  };

  emitControlState();
  emitDocState();
}

const spinSpeedInput = document.getElementById('spin-speed');
const bridgeMode = !!(window.__wesiriBridge && window.__wesiriBridge.renderMode === 'react');
if (spinSpeedInput && !bridgeMode) {
  spinSpeedInput.addEventListener('input', function() {
    setSpinSpeed(this.value);
  });
}

// ═══════════════════════════════════════════════════════
// MAIN LOOP
// ═══════════════════════════════════════════════════════

let frameCount = 0;

function tick() {
  if (state.autoRotate) {
    state.angle = (state.angle + state.spinSpeed) % 360;
    state.tick++;
    if (state.tick >= 720) { state.tick = 0; state.cycle++; }
  }

  // Update quadrant state
  state.quadrants = updateQuadrants(state.angle);
  state.faces     = evaluateFaces(state.quadrants);
  state.centroid  = computeCentroid(state.faces);

  // Header
  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onTickStatus === 'function') {
    bridge.onTickStatus({
      lc: state.lc,
      tick: state.tick,
      angle: state.angle,
    });
  } else {
    document.getElementById('hdr-lc').textContent    = 'lc:' + state.lc;
    document.getElementById('hdr-tick').textContent  = 'tick:' + state.tick;
    document.getElementById('hdr-angle').textContent = state.angle.toFixed(1) + '°';
  }

  // Visual updates
  updateLEDColors();
  updateEpistemicSquare();
  updateSPOTable();
  updateCentroid();
  updateFaceTable();
  updateWindow();

  // Pattern
  if (frameCount % 8 === 0) stepPattern();

  // Emit commits at transition boundaries (every ~10 frames)
  if (frameCount % 10 === 0) {
    const type = state.centroid.sabbath ? 'commit'
               : state.tick % 90 === 0  ? 'sync'
               : 'face_eval';
    emitCommit(type);
  }

  frameCount++;
  requestAnimationFrame(tick);
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════

function init() {
  bindBridgeCommands();
  buildRings();
  buildDocGraph();
  buildESPList();
  buildWordnetPanel();

  const bridge = window.__wesiriBridge;
  if (bridge && bridge.renderMode === 'react' && typeof bridge.onBasisHash === 'function') {
    bridge.onBasisHash(state.basisHash);
  } else {
    document.getElementById('basis-hash-text').textContent = state.basisHash;
  }

  // Initial commit
  state.quadrants = updateQuadrants(0);
  state.faces     = evaluateFaces(state.quadrants);
  state.centroid  = computeCentroid(state.faces);
  emitCommit('vertex_init');

  // Select first doc
  selectDoc('fano-garden-seed-kernel');

  tick();
}

let __wesiriInitialized = false;
function initOnce() {
  if (__wesiriInitialized) return;
  __wesiriInitialized = true;
  init();
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initOnce, { once: true });
} else {
  initOnce();
}
