import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type Quadrant = 'KK' | 'KU' | 'UK' | 'UU';

type SpoRow = {
  id: number;
  name: string;
  color: string;
  q: Quadrant;
  role: string;
  repl: string;
  io: string;
};

type FaceRow = {
  face_id: string;
  vertices: number[];
  status: 'pass' | 'fail';
  invariant_name: string;
};

type CommitRecord = {
  id: string;
  t: number;
  lc: number;
  type: string;
  tick: number;
  angle: string;
  centroid: { stop_metric: number; closure_ratio: number; sabbath: boolean; reason: string; pass: number };
  faces: FaceRow[];
  basisHash: string;
  prev_hash: string | null;
  self_hash: string;
  sig: string;
};

type SimState = {
  angle: number;
  spinSpeed: number;
  autoRotate: boolean;
  lc: number;
  prevHash: string | null;
  tick: number;
  cycle: number;
  pattern: string | null;
  patternStep: number;
  basisHash: string;
  activeDoc: string | null;
  frame: number;
};

const FANO_POINTS = [
  { id: 1, name: 'Metatron', baseX: 0.15, baseY: 0.15, color: '#ff3028', hue: 0 },
  { id: 2, name: 'Solomon', baseX: 0.35, baseY: 0.15, color: '#ff9030', hue: 30 },
  { id: 3, name: 'Solon', baseX: -0.05, baseY: 0.15, color: '#ffe048', hue: 60 },
  { id: 4, name: 'Asabiyyah', baseX: 0.0, baseY: -0.25, color: '#40d048', hue: 120 },
  { id: 5, name: 'Enoch', baseX: -0.35, baseY: 0.15, color: '#3090ff', hue: 240 },
  { id: 6, name: 'Speaker', baseX: 0.35, baseY: 0.15, color: '#5048d8', hue: 270 },
  { id: 7, name: 'Genesis', baseX: 0.0, baseY: 0.35, color: '#8830e8', hue: 300 },
] as const;

const FANO_LINES = [
  { id: 'L1', points: [1, 2, 4] },
  { id: 'L2', points: [1, 3, 5] },
  { id: 'L3', points: [1, 6, 7] },
  { id: 'L4', points: [2, 3, 6] },
  { id: 'L5', points: [2, 5, 7] },
  { id: 'L6', points: [3, 4, 6] },
  { id: 'L7', points: [4, 5, 7] },
] as const;

const QUADRANT_MAP: Record<Quadrant, { spo: string; role: string; repl: string; io: string }> = {
  KK: { spo: 'subject', role: 'Intent', repl: 'READ', io: 'stdin' },
  KU: { spo: 'predicate', role: 'Event', repl: 'EVAL', io: 'stdout' },
  UK: { spo: 'object', role: 'Incidence', repl: 'PRINT', io: 'port' },
  UU: { spo: 'centroid', role: 'Stop', repl: 'LOOP', io: 'file' },
};

const SVG_DOCS = [
  { id: 'fano-garden-seed-kernel', name: 'Seed Kernel', hash: '0xa1b2c3d4', type: 'canonical', color: '#c9b99a' },
  { id: 'fano-with-light-arrays', name: 'Light Arrays', hash: '0xe5f6a7b8', type: 'projection', color: '#3090ff' },
  { id: 'fano-garden', name: 'Garden', hash: '0xc9d0e1f2', type: 'instance', color: '#40d048' },
  { id: 'epistemic-square', name: 'Epistemic Square', hash: '0x23a4b5c6', type: 'operator', color: '#ffee00' },
  { id: 'dome-svg', name: 'Dome', hash: '0x78d9e0f1', type: 'projection', color: '#ff9030' },
] as const;

function hashStr(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = (h * 0x01000193) >>> 0;
  }
  return `0x${h.toString(16).padStart(8, '0')}${((h ^ 0xdeadbeef) >>> 0).toString(16).padStart(8, '0')}`;
}

function rotatePoint(baseX: number, baseY: number, angleDeg: number) {
  const rad = (-angleDeg * Math.PI) / 180;
  const cosA = Math.cos(rad);
  const sinA = Math.sin(rad);
  return { x: baseX * cosA - baseY * sinA, y: baseX * sinA + baseY * cosA };
}

function getQuadrant(x: number, y: number): Quadrant {
  if (x >= 0 && y >= 0) return 'KK';
  if (x < 0 && y >= 0) return 'KU';
  if (x >= 0 && y < 0) return 'UK';
  return 'UU';
}

function evaluateFaces(quads: Record<number, Quadrant>): FaceRow[] {
  return FANO_LINES.map((line) => {
    const qs = line.points.map((pid) => quads[pid]);
    const roles = qs.map((q) => QUADRANT_MAP[q].spo);
    const roleSet = new Set(roles);
    const isSPO = roleSet.has('subject') && roleSet.has('predicate') && roleSet.has('object');
    const isCoherent = roleSet.size === 1;
    return {
      face_id: line.id,
      vertices: [...line.points],
      invariant_name: isSPO ? 'spo_triple_closure' : isCoherent ? 'coherent_state' : 'partial',
      status: isSPO || isCoherent ? 'pass' : 'fail',
    };
  });
}

function computeCentroid(faces: FaceRow[]) {
  const pass = faces.filter((f) => f.status === 'pass').length;
  const cr = pass / 7;
  return {
    stop_metric: cr,
    closure_ratio: cr,
    sabbath: cr === 1,
    reason: cr === 1 ? 'all_invariants_closed' : `incomplete_faces:${pass}/7`,
    pass,
  };
}

function genBasisHash(): string {
  return (
    '0x' +
    Array.from({ length: 32 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('')
  );
}

export function useWesiriEngine() {
  const simRef = useRef<SimState>({
    angle: 0,
    spinSpeed: 0.5,
    autoRotate: true,
    lc: 0,
    prevHash: null,
    tick: 0,
    cycle: 0,
    pattern: null,
    patternStep: 0,
    basisHash: genBasisHash(),
    activeDoc: SVG_DOCS[0]?.id ?? null,
    frame: 0,
  });

  const [records, setRecords] = useState<CommitRecord[]>([]);
  const [schemaText, setSchemaText] = useState('');
  const [narratives, setNarratives] = useState<string[]>([]);
  const [headerStatus, setHeaderStatus] = useState({ lc: 0, tick: 0, angle: 0, stopMetric: 0, sabbath: false });
  const [windowColors, setWindowColors] = useState<string[]>(Array.from({ length: 256 }, () => 'rgba(68,85,255,0.1)'));
  const [spoRows, setSpoRows] = useState<SpoRow[]>([]);
  const [faceRows, setFaceRows] = useState<FaceRow[]>([]);
  const [centroidPanel, setCentroidPanel] = useState({ stopMetric: 0, sabbath: false });
  const [controls, setControls] = useState({ spinSpeed: simRef.current.spinSpeed, autoRotate: simRef.current.autoRotate });
  const [activeDoc, setActiveDoc] = useState<string | null>(simRef.current.activeDoc);

  const basisHash = simRef.current.basisHash;
  const docs = useMemo(() => SVG_DOCS.map((d) => ({ ...d })), []);

  const emitCommit = useCallback(
    (type: string, centroid: ReturnType<typeof computeCentroid>, faces: FaceRow[], quads: Record<number, Quadrant>) => {
      const sim = simRef.current;
      const payload: CommitRecord = {
        id: `cmt-${sim.cycle}-${sim.tick}-${Date.now()}`,
        t: Date.now(),
        lc: sim.lc++,
        type,
        tick: sim.tick,
        angle: sim.angle.toFixed(2),
        centroid,
        faces,
        basisHash: sim.basisHash,
        prev_hash: sim.prevHash,
        self_hash: '',
        sig: '',
      };
      payload.self_hash = hashStr(JSON.stringify(payload));
      payload.sig = hashStr(`sig:${payload.self_hash}`);
      sim.prevHash = payload.self_hash;

      setRecords((prev) => [payload, ...prev].slice(0, 40));
      setSchemaText(
        JSON.stringify(
          {
            id: `${payload.id.slice(0, 20)}…`,
            t: payload.t,
            lc: payload.lc,
            type: payload.type,
            centroid: payload.centroid,
            prev_hash: payload.prev_hash ? `${payload.prev_hash.slice(0, 14)}…` : undefined,
            self_hash: `${payload.self_hash.slice(0, 14)}…`,
          },
          null,
          1,
        ),
      );

      if (type === 'face_eval' || type === 'commit') {
        const subject = FANO_POINTS.find((p) => quads[p.id] === 'KK');
        const line = centroid.sabbath
          ? 'All seven lines close. The garden is sealed. ✦'
          : subject
            ? `${subject.name} intends freedom through the open channel`
            : 'Partial closure across simplex faces';
        setNarratives((prev) => [line, ...prev].slice(0, 20));
      }
    },
    [],
  );

  const tick = useCallback(() => {
    const sim = simRef.current;

    if (sim.autoRotate) {
      sim.angle = (sim.angle + sim.spinSpeed) % 360;
      sim.tick++;
      if (sim.tick >= 720) {
        sim.tick = 0;
        sim.cycle++;
      }
    }

    const quads: Record<number, Quadrant> = {};
    for (const point of FANO_POINTS) {
      const { x, y } = rotatePoint(point.baseX, point.baseY, sim.angle);
      quads[point.id] = getQuadrant(x, y);
    }

    const faces = evaluateFaces(quads);
    const centroid = computeCentroid(faces);

    setHeaderStatus({ lc: sim.lc, tick: sim.tick, angle: sim.angle, stopMetric: centroid.stop_metric, sabbath: centroid.sabbath });
    setCentroidPanel({ stopMetric: centroid.stop_metric, sabbath: centroid.sabbath });
    setFaceRows(faces);

    setSpoRows(
      FANO_POINTS.map((point) => {
        const q = quads[point.id];
        const qm = QUADRANT_MAP[q];
        return { id: point.id, name: point.name, color: point.color, q, role: qm.role, repl: qm.repl, io: qm.io };
      }),
    );

    const colors = new Array(256);
    for (let i = 0; i < 256; i++) {
      const row = Math.floor(i / 16);
      const col = i % 16;
      const fanoId = (row % 7) + 1;
      const q = quads[fanoId];
      const alpha = col / 15 * 0.8 + 0.1;
      const qColors = { KK: '0,255,68', KU: '255,238,0', UK: '255,136,0', UU: '68,85,255' };
      colors[i] = `rgba(${qColors[q]},${(alpha * (row < 12 ? 0.6 : 0.3)).toFixed(2)})`;
    }
    setWindowColors(colors);

    if (sim.frame % 10 === 0) {
      const commitType = centroid.sabbath ? 'commit' : sim.tick % 90 === 0 ? 'sync' : 'face_eval';
      emitCommit(commitType, centroid, faces, quads);
    }

    sim.frame++;
  }, [emitCommit]);

  useEffect(() => {
    tick();
    const id = window.setInterval(tick, 50);
    return () => window.clearInterval(id);
  }, [tick]);

  const setSpinSpeed = useCallback((value: number) => {
    const parsed = Number.parseFloat(String(value));
    if (!Number.isFinite(parsed)) return;
    simRef.current.spinSpeed = parsed;
    setControls((prev) => ({ ...prev, spinSpeed: parsed }));
  }, []);

  const toggleRotate = useCallback(() => {
    simRef.current.autoRotate = !simRef.current.autoRotate;
    setControls((prev) => ({ ...prev, autoRotate: simRef.current.autoRotate }));
  }, []);

  const runPattern = useCallback((name: string) => {
    simRef.current.pattern = name;
    simRef.current.patternStep = 0;
  }, []);

  const seekSabbath = useCallback(() => {
    const sim = simRef.current;
    for (let a = sim.angle; a < sim.angle + 360; a += 0.5) {
      const quads: Record<number, Quadrant> = {};
      for (const point of FANO_POINTS) {
        const { x, y } = rotatePoint(point.baseX, point.baseY, a);
        quads[point.id] = getQuadrant(x, y);
      }
      const c = computeCentroid(evaluateFaces(quads));
      if (c.sabbath) {
        sim.angle = a % 360;
        break;
      }
    }
  }, []);

  const selectDoc = useCallback((id: string) => {
    simRef.current.activeDoc = id;
    setActiveDoc(id);
  }, []);

  return {
    basisHash,
    docs,
    activeDoc,
    controls,
    records,
    schemaText,
    narratives,
    headerStatus,
    windowColors,
    spoRows,
    faceRows,
    centroidPanel,
    setSpinSpeed,
    toggleRotate,
    runPattern,
    seekSabbath,
    selectDoc,
  };
}
