import { useCallback, useState } from 'react';
import type { FaceRow, Quadrant, SimState } from './core';
import { FANO_LINES, FANO_POINTS } from './core';
import { quarantineRecord } from './quarantine';
import { buildCommitFromEvent, buildRxFrame, buildTxFrame } from './semanticMerkle';
import type { CommitCentroidV1, QuarantineRecord, ValidationError, WireRecordV1 } from './types';
import { validateRecord } from './validateRecord';

type IngestResult = {
  accepted: boolean;
  record?: WireRecordV1;
  quarantine?: QuarantineRecord;
};

function recordSummary(record: WireRecordV1) {
  if (record.type === 'commit') {
    return {
      type: record.type,
      event_ref: record.event_ref,
      lc: record.lc,
      centroid: record.centroid,
      prev_hash: record.prev_hash ? `${record.prev_hash.slice(0, 14)}…` : null,
      self_hash: `${record.self_hash.slice(0, 14)}…`,
    };
  }
  return {
    type: record.type,
    fano_line_id: record.fano_line_id,
    register_state: record.register_state,
    hexagram_index: record.hexagram_index,
    leaf_hash: `${record.leaf_hash.slice(0, 14)}…`,
    prev_hash: record.prev_hash ? `${record.prev_hash.slice(0, 14)}…` : null,
    self_hash: `${record.self_hash.slice(0, 14)}…`,
  };
}

function defaultErrors(detail: string): ValidationError[] {
  return [{ reason_code: 'invalid_record_shape', reason_detail: detail }];
}

export function useCommitStream() {
  const [records, setRecords] = useState<WireRecordV1[]>([]);
  const [quarantine, setQuarantine] = useState<QuarantineRecord[]>([]);
  const [schemaText, setSchemaText] = useState('');
  const [narratives, setNarratives] = useState<string[]>([]);

  const ingestRecord = useCallback((record: unknown, source: string, rawLine = JSON.stringify(record)): IngestResult => {
    const validation = validateRecord(record);
    if (!validation.ok) {
      const entry = quarantineRecord(rawLine, validation.errors, source, record);
      setQuarantine((prev) => [entry, ...prev].slice(0, 80));
      return { accepted: false, quarantine: entry };
    }

    const accepted = record as WireRecordV1;
    setRecords((prev) => [accepted, ...prev].slice(0, 120));
    setSchemaText(JSON.stringify(recordSummary(accepted), null, 1));
    return { accepted: true, record: accepted };
  }, []);

  const ingestNdjsonText = useCallback(
    (text: string, source: string) => {
      const lines = String(text ?? '').split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        try {
          const record = JSON.parse(trimmed);
          ingestRecord(record, source, trimmed);
        } catch {
          const entry = quarantineRecord(trimmed, defaultErrors('Line is not valid JSON'), source);
          setQuarantine((prev) => [entry, ...prev].slice(0, 80));
        }
      }
    },
    [ingestRecord],
  );

  const emitProtocolTriplet = useCallback(
    (sim: SimState, centroid: CommitCentroidV1, faces: FaceRow[], quads: Record<number, Quadrant>) => {
      const line = faces.find((face) => face.status === 'pass')?.face_id ?? FANO_LINES[0].id;
      const registerState = sim.tick % 8;
      const hexagramIndex = sim.tick % 64;

      const tx = buildTxFrame({
        fanoLineId: line,
        registerState,
        hexagramIndex,
        basisHash: sim.basisHash,
        prevHash: sim.prevHash,
        source: 'sim_tx',
      });
      const txResult = ingestRecord(tx, 'sim_tx');
      let prevHash = txResult.accepted && txResult.record ? txResult.record.self_hash : sim.prevHash;

      const rx = buildRxFrame({
        fanoLineId: line,
        registerState,
        hexagramIndex,
        basisHash: sim.basisHash,
        prevHash,
        source: 'sim_rx',
        confidence: 1,
      });
      const rxResult = ingestRecord(rx, 'sim_rx');
      prevHash = rxResult.accepted && rxResult.record ? rxResult.record.self_hash : prevHash;

      const commit = buildCommitFromEvent({
        eventRef: rx.self_hash,
        basisHash: sim.basisHash,
        prevHash,
        lc: sim.lc++,
        tick: sim.tick,
        angle: sim.angle.toFixed(2),
        centroid,
        faces,
      });
      const commitResult = ingestRecord(commit, 'sim_commit');
      if (commitResult.accepted && commitResult.record) {
        sim.prevHash = commitResult.record.self_hash;
      }

      const subject = FANO_POINTS.find((point) => quads[point.id] === 'KK');
      const lineText = centroid.sabbath
        ? 'All seven lines close. The garden is sealed. ✦'
        : subject
          ? `${subject.name} intends freedom through the open channel`
          : 'Partial closure across simplex faces';
      setNarratives((prev) => [lineText, ...prev].slice(0, 20));
    },
    [ingestRecord],
  );

  return { records, quarantine, schemaText, narratives, ingestRecord, ingestNdjsonText, emitProtocolTriplet };
}
