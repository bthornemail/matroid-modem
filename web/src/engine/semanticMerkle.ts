import { hashStr } from './core';
import type { CommitV1, RxFrameV1, TxFrameV1, WireRecordV1 } from './types';

export const SHELL_SIZE = 240;
export const HEX_LINES = 6;
export const REGISTER_STATES = 8;
export const FANO_POINTS = 7;
export const HEXAGRAM_COUNT = 64;
export const SECTOR_SIZE = SHELL_SIZE / HEX_LINES; // 40

export type HexLine = 0 | 1;
export type HexagramBits = [HexLine, HexLine, HexLine, HexLine, HexLine, HexLine];

export type SemanticEventInput = {
  fanoLineId: string;
  registerState: number; // 0..7
  hexagramIndex: number; // 0..63
  prevHash?: string | null;
  basisHash: string;
  t?: number;
  source: string;
  confidence?: number;
};

function stableSerialize(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableSerialize(item)).join(',')}]`;
  const entries = Object.entries(value as Record<string, unknown>)
    .filter((entry) => entry[1] !== undefined)
    .sort(([a], [b]) => a.localeCompare(b));
  return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${stableSerialize(item)}`).join(',')}}`;
}

export function canonicalHashPayload<T extends Record<string, unknown>>(record: T): Record<string, unknown> {
  const payload: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(record)) {
    if (key === 'self_hash' || key === 'sig' || value === undefined) continue;
    payload[key] = value;
  }
  return payload;
}

export function hashCanonicalRecord<T extends Record<string, unknown>>(record: T): string {
  return hashStr(stableSerialize(canonicalHashPayload(record)));
}

export function toHexagramBits(index: number): HexagramBits {
  const normalized = Math.max(0, Math.min(63, Math.floor(index)));
  const bits = normalized
    .toString(2)
    .padStart(6, '0')
    .split('')
    .map((bit) => (bit === '1' ? 1 : 0)) as HexLine[];
  return [bits[0], bits[1], bits[2], bits[3], bits[4], bits[5]];
}

export function projectHexagramToShell(bits: HexagramBits): number[] {
  const shell = new Array<number>(SHELL_SIZE).fill(0);
  for (let line = 0; line < HEX_LINES; line++) {
    const start = line * SECTOR_SIZE;
    for (let offset = 0; offset < SECTOR_SIZE; offset++) {
      shell[start + offset] = bits[line];
    }
  }
  return shell;
}

export function hashShell(shell: number[]): string {
  return hashStr(shell.join(''));
}

function clampInt(value: number, min: number, max: number): number {
  const normalized = Number.isFinite(value) ? Math.floor(value) : min;
  return Math.max(min, Math.min(max, normalized));
}

export function buildTxFrame(input: SemanticEventInput): TxFrameV1 {
  const t = input.t ?? Date.now();
  const registerState = clampInt(input.registerState, 0, REGISTER_STATES - 1);
  const hexagramIndex = clampInt(input.hexagramIndex, 0, HEXAGRAM_COUNT - 1);
  const hexagramBits = toHexagramBits(hexagramIndex);
  const shell = projectHexagramToShell(hexagramBits);
  const leafHash = hashShell(shell);

  const frame: TxFrameV1 = {
    type: 'tx_frame',
    v: 1,
    t,
    basisHash: input.basisHash,
    prev_hash: input.prevHash ?? null,
    self_hash: '',
    fano_line_id: input.fanoLineId,
    register_state: registerState,
    hexagram_index: hexagramIndex,
    hexagram_bits: hexagramBits,
    shell,
    leaf_hash: leafHash,
    source: input.source,
  };

  frame.self_hash = hashCanonicalRecord(frame);
  return frame;
}

export function buildRxFrame(input: SemanticEventInput): RxFrameV1 {
  const tx = buildTxFrame(input);
  const confidence = Number.isFinite(input.confidence) ? Number(input.confidence) : 1;
  const frame: RxFrameV1 = {
    ...tx,
    type: 'rx_frame',
    confidence: Math.max(0, Math.min(1, confidence)),
  };
  frame.self_hash = hashCanonicalRecord(frame);
  return frame;
}

export function buildCommitFromEvent(args: {
  eventRef: string;
  basisHash: string;
  prevHash: string | null;
  lc: number;
  tick: number;
  angle: string;
  centroid: CommitV1['centroid'];
  faces: CommitV1['faces'];
  t?: number;
}): CommitV1 {
  const commit: CommitV1 = {
    type: 'commit',
    v: 1,
    t: args.t ?? Date.now(),
    basisHash: args.basisHash,
    prev_hash: args.prevHash,
    self_hash: '',
    event_ref: args.eventRef,
    lc: args.lc,
    tick: args.tick,
    angle: args.angle,
    centroid: args.centroid,
    faces: args.faces,
  };
  commit.self_hash = hashCanonicalRecord(commit);
  return commit;
}

export function verifyCanonicalHash(record: WireRecordV1): boolean {
  return hashCanonicalRecord(record) === record.self_hash;
}

export function verifyLeafHash(record: TxFrameV1 | RxFrameV1): boolean {
  return hashShell(record.shell) === record.leaf_hash;
}
