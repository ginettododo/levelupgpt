import { describe, expect, it } from 'vitest';
import { summarizeEntryXP } from './gameLogic';
import { DailyEntry } from './types';

const baseEntry: DailyEntry = {
  date: '2024-10-10',
  actions: {},
};

describe('summarizeEntryXP', () => {
  it('returns zero totals when no actions are present', () => {
    const result = summarizeEntryXP(baseEntry);
    expect(result).toEqual({ positiveXP: 0, negativeXP: 0, netXP: 0 });
  });

  it('tracks positive and negative xp separately', () => {
    const entry: DailyEntry = {
      ...baseEntry,
      actions: {
        workout: 1, // +30 xp
        junk_food: 1, // -25 xp
        deep_work: 2, // +40 xp (time action * 20)
      },
    };

    const result = summarizeEntryXP(entry);
    expect(result.positiveXP).toBe(70);
    expect(result.negativeXP).toBe(25);
    expect(result.netXP).toBe(45);
  });

  it('ignores undefined actions safely', () => {
    const entry: DailyEntry = {
      ...baseEntry,
      actions: {
        unknown_action: 10,
        study: 1,
      },
    };

    const result = summarizeEntryXP(entry);
    expect(result).toEqual({ positiveXP: 20, negativeXP: 0, netXP: 20 });
  });
});
