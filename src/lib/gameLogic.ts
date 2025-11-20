import { ACTIONS, LEVELS } from './constants';
import { DailyEntry, LevelInfo } from './types';

export const getDateKey = (date: Date): string => date.toISOString().slice(0, 10);

export function computeTotalXP(entries: DailyEntry[]): number {
  return entries.reduce((total, entry) => {
    const daily = Object.entries(entry.actions).reduce((sum, [actionId, count]) => {
      const action = ACTIONS.find((item) => item.id === actionId);
      if (!action) return sum;
      const value = action.type === 'time' ? Math.max(count, 0) * action.xp : count * action.xp;
      return sum + value;
    }, 0);
    return total + daily;
  }, 0);
}

export function getLevelInfo(totalXP: number): LevelInfo {
  const levelIndex = LEVELS.findIndex((threshold) => totalXP < threshold);
  const level = levelIndex === -1 ? LEVELS.length : Math.max(1, levelIndex);
  const floorXP = LEVELS[level - 1] ?? 0;
  const ceilingXP = LEVELS[level] ?? totalXP + 100;
  const currentXP = Math.max(totalXP - floorXP, 0);
  const segmentTotal = Math.max(ceilingXP - floorXP, 1);
  return {
    level,
    currentXP,
    nextLevelXP: ceilingXP - floorXP,
    progress: Math.min(currentXP / segmentTotal, 1),
  };
}

export function startOfLevelXP(level: number): number {
  return LEVELS[Math.max(level - 1, 0)] ?? 0;
}

export function endOfLevelXP(level: number): number {
  return LEVELS[level] ?? LEVELS[LEVELS.length - 1] + 500 * level;
}

export function isSmokeFree(entry?: DailyEntry): boolean {
  if (!entry) return true;
  return (
    (entry.actions['smoke_cig'] ?? 0) === 0 &&
    (entry.actions['smoke_joint'] ?? 0) === 0 &&
    (entry.actions['buy_tobacco'] ?? 0) === 0
  );
}

export function computeSmokeFreeStreak(entries: DailyEntry[], date: string): number {
  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date));
  let streak = 0;
  for (const entry of sorted) {
    if (entry.date > date) continue;
    if (isSmokeFree(entry)) {
      streak += 1;
    } else if (entry.date === date) {
      break;
    } else {
      break;
    }
  }
  return streak;
}

export function getDailyXP(entry: DailyEntry): number {
  return Object.entries(entry.actions).reduce((sum, [actionId, count]) => {
    const action = ACTIONS.find((item) => item.id === actionId);
    if (!action) return sum;
    return sum + count * (action.type === 'time' ? action.xp : action.xp);
  }, 0);
}

export function summarizeEntryXP(entry: DailyEntry): {
  positiveXP: number;
  negativeXP: number;
  netXP: number;
} {
  return Object.entries(entry.actions).reduce(
    (totals, [actionId, count]) => {
      const action = ACTIONS.find((item) => item.id === actionId);
      if (!action) return totals;
      const sanitizedCount = action.type === 'time' ? Math.max(count, 0) : count;
      const value = sanitizedCount * action.xp;

      if (value >= 0) {
        return {
          ...totals,
          positiveXP: totals.positiveXP + value,
          netXP: totals.netXP + value,
        };
      }

      return {
        ...totals,
        negativeXP: totals.negativeXP + Math.abs(value),
        netXP: totals.netXP + value,
      };
    },
    { positiveXP: 0, negativeXP: 0, netXP: 0 }
  );
}
