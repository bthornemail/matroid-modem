import { describe, expect, it } from 'vitest';
import { clearQuarantineRecords, getQuarantineRecords, quarantineRecord } from '../quarantine';
import { buildCommitFromEvent, buildRxFrame, buildTxFrame, toHexagramBits } from '../semanticMerkle';
import { validateRecord } from '../validateRecord';

describe('conformance chain', () => {
  it('chains genesis tx -> rx -> commit deterministically', () => {
    const tx = buildTxFrame({
      fanoLineId: 'L2',
      registerState: 4,
      hexagramIndex: 63,
      basisHash: '0xchain',
      prevHash: null,
      source: 'chain',
      t: 1700000000000,
    });
    const rx = buildRxFrame({
      fanoLineId: 'L2',
      registerState: 4,
      hexagramIndex: 63,
      basisHash: '0xchain',
      prevHash: tx.self_hash,
      source: 'chain',
      confidence: 0.99,
      t: 1700000000100,
    });
    const commit = buildCommitFromEvent({
      eventRef: rx.self_hash,
      basisHash: '0xchain',
      prevHash: rx.self_hash,
      lc: 3,
      tick: 33,
      angle: '180.00',
      centroid: {
        stop_metric: 1,
        closure_ratio: 1,
        sabbath: true,
        reason: 'all_invariants_closed',
        pass: 7,
      },
      faces: [{ face_id: 'L2', vertices: [1, 3, 5], status: 'pass', invariant_name: 'spo_triple_closure' }],
      t: 1700000000200,
    });

    expect(validateRecord(tx).ok).toBe(true);
    expect(validateRecord(rx).ok).toBe(true);
    expect(validateRecord(commit).ok).toBe(true);

    expect(tx.prev_hash).toBeNull();
    expect(rx.prev_hash).toBe(tx.self_hash);
    expect(commit.prev_hash).toBe(rx.self_hash);
  });

  it('round-trips tx/rx semantic fields unchanged', () => {
    const tx = buildTxFrame({
      fanoLineId: 'L7',
      registerState: 1,
      hexagramIndex: 31,
      basisHash: '0xroundtrip',
      prevHash: null,
      source: 'roundtrip',
      t: 1700000000000,
    });
    const rx = buildRxFrame({
      fanoLineId: tx.fano_line_id,
      registerState: tx.register_state,
      hexagramIndex: tx.hexagram_index,
      basisHash: tx.basisHash,
      prevHash: tx.self_hash,
      source: 'roundtrip',
      confidence: 1,
      t: 1700000000100,
    });

    expect(rx.hexagram_index).toBe(tx.hexagram_index);
    expect(rx.hexagram_bits).toEqual(tx.hexagram_bits);
    expect(rx.hexagram_bits).toEqual(toHexagramBits(31));
    expect(rx.shell).toEqual(tx.shell);
  });

  it('quarantines tampered records with deterministic reason', () => {
    clearQuarantineRecords();

    const tx = buildTxFrame({
      fanoLineId: 'L1',
      registerState: 0,
      hexagramIndex: 0,
      basisHash: '0xtamper',
      prevHash: null,
      source: 'tamper',
      t: 1700000000000,
    });
    const tampered = { ...tx, hexagram_index: 1 };
    const result = validateRecord(tampered);
    expect(result.ok).toBe(false);

    quarantineRecord(JSON.stringify(tampered), result.errors, 'test_tamper', tampered, 1700000001111);
    const quarantine = getQuarantineRecords();
    expect(quarantine).toHaveLength(1);
    expect(quarantine[0].reason_code).toBe('hexagram_bits_mismatch');
    expect(quarantine[0].source).toBe('test_tamper');
  });
});
