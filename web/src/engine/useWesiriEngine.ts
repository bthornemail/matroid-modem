import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  computeCentroid,
  evaluateFaces,
  FANO_POINTS,
  genBasisHash,
  getQuadrant,
  type Quadrant,
  QUADRANT_MAP,
  rotatePoint,
  type SimState,
  SVG_DOCS,
} from './core';
import { useCommitStream } from './useCommitStream';

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

  const { records, schemaText, narratives, emitCommit } = useCommitStream();

  const [headerStatus, setHeaderStatus] = useState({ lc: 0, tick: 0, angle: 0, stopMetric: 0, sabbath: false });
  const [windowColors, setWindowColors] = useState<string[]>(Array.from({ length: 256 }, () => 'rgba(68,85,255,0.1)'));
  const [spoRows, setSpoRows] = useState<Array<{ id: number; name: string; color: string; q: Quadrant; role: string; repl: string; io: string }>>([]);
  const [faceRows, setFaceRows] = useState<ReturnType<typeof evaluateFaces>>([]);
  const [centroidPanel, setCentroidPanel] = useState({ stopMetric: 0, sabbath: false });
  const [controls, setControls] = useState({ spinSpeed: simRef.current.spinSpeed, autoRotate: simRef.current.autoRotate });
  const [activeDoc, setActiveDoc] = useState<string | null>(simRef.current.activeDoc);

  const basisHash = simRef.current.basisHash;
  const docs = useMemo(() => SVG_DOCS.map((d) => ({ ...d })), []);

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
      emitCommit(sim, commitType, centroid, faces, quads);
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

export type WesiriEngine = ReturnType<typeof useWesiriEngine>;
