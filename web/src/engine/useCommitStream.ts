import { useCallback, useState } from 'react';
import type { CommitRecord, FaceRow, Quadrant, SimState } from './core';
import { FANO_POINTS, hashStr } from './core';

type Centroid = {
  stop_metric: number;
  closure_ratio: number;
  sabbath: boolean;
  reason: string;
  pass: number;
};

export function useCommitStream() {
  const [records, setRecords] = useState<CommitRecord[]>([]);
  const [schemaText, setSchemaText] = useState('');
  const [narratives, setNarratives] = useState<string[]>([]);

  const emitCommit = useCallback(
    (sim: SimState, type: string, centroid: Centroid, faces: FaceRow[], quads: Record<number, Quadrant>) => {
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

  return { records, schemaText, narratives, emitCommit };
}
