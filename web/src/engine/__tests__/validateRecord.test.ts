import { describe, expect, it } from 'vitest';
import { buildCommitFromEvent, buildRxFrame, buildTxFrame } from '../semanticMerkle';
import { validateCommit, validateRecord, validateRxFrame, validateTxFrame } from '../validateRecord';

function buildFaces() {
  return [
    { face_id: 'L1', vertices: [1, 2, 4], status: 'pass' as const, invariant_name: 'spo_triple_closure' },
    { face_id: 'L2', vertices: [1, 3, 5], status: 'fail' as const, invariant_name: 'partial' },
  ];
}

describe('validateRecord', () => {
  it('accepts valid tx_frame, rx_frame and commit', () => {
    const tx = buildTxFrame({
      fanoLineId: 'L1',
      registerState: 3,
      hexagramIndex: 22,
      basisHash: '0xdeadbeef',
      prevHash: null,
      source: 'test',
      t: 1700000000000,
    });
    const rx = buildRxFrame({
      fanoLineId: 'L1',
      registerState: 3,
      hexagramIndex: 22,
      basisHash: '0xdeadbeef',
      prevHash: tx.self_hash,
      source: 'test',
      confidence: 0.95,
      t: 1700000000100,
    });
    const commit = buildCommitFromEvent({
      eventRef: rx.self_hash,
      basisHash: '0xdeadbeef',
      prevHash: rx.self_hash,
      lc: 1,
      tick: 10,
      angle: '15.50',
      centroid: {
        stop_metric: 0.5,
        closure_ratio: 0.5,
        sabbath: false,
        reason: 'incomplete_faces:3/7',
        pass: 3,
      },
      faces: buildFaces(),
      t: 1700000000200,
    });

    expect(validateTxFrame(tx).ok).toBe(true);
    expect(validateRxFrame(rx).ok).toBe(true);
    expect(validateCommit(commit).ok).toBe(true);
    expect(validateRecord(commit).ok).toBe(true);
  });

  it('rejects out-of-range values and missing required fields', () => {
    const tx = buildTxFrame({
      fanoLineId: 'L1',
      registerState: 0,
      hexagramIndex: 1,
      basisHash: '0xdeadbeef',
      prevHash: null,
      source: 'test',
      t: 1700000000000,
    });
    const bad = { ...tx, register_state: 99, self_hash: tx.self_hash };
    const result = validateTxFrame(bad);
    expect(result.ok).toBe(false);
    expect(result.errors.some((error) => error.reason_code === 'out_of_range')).toBe(true);

    const missing = validateRecord({ type: 'tx_frame' });
    expect(missing.ok).toBe(false);
    expect(missing.errors.some((error) => error.reason_code === 'missing_required_field')).toBe(true);
  });

  it('rejects leaf_hash and self_hash mismatches', () => {
    const tx = buildTxFrame({
      fanoLineId: 'L1',
      registerState: 2,
      hexagramIndex: 7,
      basisHash: '0xdeadbeef',
      prevHash: null,
      source: 'test',
      t: 1700000000000,
    });

    const badLeaf = { ...tx, leaf_hash: '0x0' };
    const leafResult = validateTxFrame(badLeaf);
    expect(leafResult.ok).toBe(false);
    expect(leafResult.errors.some((error) => error.reason_code === 'leaf_hash_mismatch')).toBe(true);

    const badSelf = { ...tx, self_hash: '0x0' };
    const selfResult = validateTxFrame(badSelf);
    expect(selfResult.ok).toBe(false);
    expect(selfResult.errors.some((error) => error.reason_code === 'self_hash_mismatch')).toBe(true);
  });
});
