import { describe, expect, it } from 'vitest';
import { buildTxFrame, projectHexagramToShell, SECTOR_SIZE, toHexagramBits } from '../semanticMerkle';

const HEX_SELECTION = [0, 1, 2, 31, 63] as const;
const LEAF_BY_HEX: Record<number, string> = {
  0: '0x73f38ba0ad5e354f',
  1: '0x02284520dc85fbcf',
  2: '0x8d4719c853eaa727',
  31: '0x1721a374c98c1d9b',
  63: '0xa538a87c7b951693',
};

const SELF_HASH_BY_REGISTER_HEX: Record<string, string> = {
  '0-0': '0x614a0a20bfe7b4cf',
  '0-1': '0x34e5f2e3ea484c0c',
  '0-2': '0xa24ddbe87ce06507',
  '0-31': '0xee647d2430c9c3cb',
  '0-63': '0xe233cc773c9e7298',
  '1-0': '0x62ee5dacbc43e343',
  '1-1': '0xde2c0c300081b2df',
  '1-2': '0xb15d8d1c6ff033f3',
  '1-31': '0x63cb3e80bd66806f',
  '1-63': '0x05662a00dbcb94ef',
  '2-0': '0x389a14e3e637aa0c',
  '2-1': '0x42a8019b9c05bf74',
  '2-2': '0xe22298c43c8f262b',
  '2-31': '0x93fd26bc4d509853',
  '2-63': '0x442f0d749a82b39b',
  '3-0': '0x1393a2accd3e1c43',
  '3-1': '0x0edb5a93d076e47c',
  '3-2': '0xeac66494346bda7b',
  '3-31': '0x0cd2b798d27f0977',
  '3-63': '0x5c4bd2e482e66c0b',
  '4-0': '0xfef4b2e420590c0b',
  '4-1': '0x43bb8b629d16358d',
  '4-2': '0x0081642cde2cdac3',
  '4-31': '0x24097febfaa4c104',
  '4-63': '0xa65e695078f3d7bf',
  '5-0': '0x72f277e3ac5fc90c',
  '5-1': '0xbccf10f86262ae17',
  '5-2': '0x65e40ef4bb49b01b',
  '5-31': '0x134b0718cde6b9f7',
  '5-63': '0xe5cbf35c3b664db3',
  '6-0': '0x1895bcf3c638021c',
  '6-1': '0xde15909c00b82e73',
  '6-2': '0xb3e24a046d4ff4eb',
  '6-31': '0x442b375e9a8689b1',
  '6-63': '0x572f327889828c97',
  '7-0': '0x4dc2415c936fffb3',
  '7-1': '0x9e8326f4402e981b',
  '7-2': '0xc4105c931abde27c',
  '7-31': '0x0a68df04d4c561eb',
  '7-63': '0xfac513a82468ad47',
};

describe('semanticMerkle mapping', () => {
  it('maps hexagram bits to six 40-cell sectors', () => {
    const bits = toHexagramBits(0b101100);
    const shell = projectHexagramToShell(bits);

    expect(shell).toHaveLength(240);
    for (let line = 0; line < 6; line++) {
      const start = line * SECTOR_SIZE;
      const sector = shell.slice(start, start + SECTOR_SIZE);
      expect(sector.every((value) => value === bits[line])).toBe(true);
    }
  });

  it('matches golden vector leaf/self hashes for 8x5 matrix', () => {
    for (let register = 0; register < 8; register++) {
      for (const hexagramIndex of HEX_SELECTION) {
        const frame = buildTxFrame({
          fanoLineId: 'L3',
          registerState: register,
          hexagramIndex,
          basisHash: '0xbasis',
          prevHash: null,
          source: 'golden',
          t: 1700000000000,
        });

        expect(frame.hexagram_bits).toEqual(toHexagramBits(hexagramIndex));
        expect(frame.leaf_hash).toBe(LEAF_BY_HEX[hexagramIndex]);
        expect(frame.self_hash).toBe(SELF_HASH_BY_REGISTER_HEX[`${register}-${hexagramIndex}`]);
      }
    }
  });
});
