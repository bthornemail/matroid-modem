import { hashStr } from './core';

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
};

export type SemanticEvent = {
  t: number;
  fanoLineId: string;
  registerState: number;
  hexagramIndex: number;
  hexagramBits: HexagramBits;
  shell: number[]; // 240 nodes
  leafHash: string;
  prevHash: string | null;
  selfHash: string;
};

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

export function buildSemanticEvent(input: SemanticEventInput): SemanticEvent {
  const t = input.t ?? Date.now();
  const registerState = Math.max(0, Math.min(REGISTER_STATES - 1, Math.floor(input.registerState)));
  const hexagramIndex = Math.max(0, Math.min(HEXAGRAM_COUNT - 1, Math.floor(input.hexagramIndex)));
  const hexagramBits = toHexagramBits(hexagramIndex);
  const shell = projectHexagramToShell(hexagramBits);
  const leafHash = hashShell(shell);

  const payload = {
    t,
    fanoLineId: input.fanoLineId,
    registerState,
    hexagramIndex,
    hexagramBits,
    leafHash,
    prevHash: input.prevHash ?? null,
    basisHash: input.basisHash,
  };

  const selfHash = hashStr(JSON.stringify(payload));

  return {
    t,
    fanoLineId: input.fanoLineId,
    registerState,
    hexagramIndex,
    hexagramBits,
    shell,
    leafHash,
    prevHash: input.prevHash ?? null,
    selfHash,
  };
}
