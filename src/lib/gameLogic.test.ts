import { describe, expect, it } from 'vitest';
import { ACTIONS } from './constants';
import { computeSmokeFreeStreak, computeTotalXP, getLevelInfo } from './gameLogic';
import { DailyEntry } from './types';

describe('gameLogic', () => {
  it('computes total XP across entries', () => {
    const entries: DailyEntry[] = [
      { date: '2024-01-01', actions: { workout: 1, deep_work: 2 } },
      { date: '2024-01-02', actions: { junk_food: 1 } },
    ];
    const expected = ACTIONS.find((a) => a.id === 'workout')!.xp + 2 * ACTIONS.find((a) => a.id === 'deep_work')!.xp - 1 * ACTIONS.find((a) => a.id === 'junk_food')!.xp;
    expect(computeTotalXP(entries)).toBe(expected);
  });

  it('returns level info with progress', () => {
    const levelInfo = getLevelInfo(120);
    expect(levelInfo.level).toBeGreaterThanOrEqual(2);
    expect(levelInfo.progress).toBeGreaterThan(0);
  });

  it('counts smoke free streak', () => {
    const entries: DailyEntry[] = [
      { date: '2024-01-01', actions: { smoke_cig: 0, smoke_joint: 0, buy_tobacco: 0 } },
      { date: '2024-01-02', actions: { smoke_cig: 0, smoke_joint: 0, buy_tobacco: 0 } },
      { date: '2024-01-03', actions: { smoke_cig: 1, smoke_joint: 0, buy_tobacco: 0 } },
    ];
    const streak = computeSmokeFreeStreak(entries, '2024-01-02');
    expect(streak).toBe(2);
  });
});
