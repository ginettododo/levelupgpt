import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ACTIONS, STORAGE_KEY } from '../lib/constants';
import { computeTotalXP, getDateKey } from '../lib/gameLogic';
import { DailyEntry, GameState } from '../lib/types';

interface GameContextValue extends GameState {
  saveEntry: (entry: DailyEntry) => void;
  getEntry: (date: string) => DailyEntry | undefined;
  exportData: () => string;
  importData: (payload: string) => void;
}

const defaultState: GameState = {
  entries: [],
  badges: [],
  totalXP: 0,
};

const GameContext = createContext<GameContextValue | undefined>(undefined);

const ensureActions = (entry: DailyEntry): DailyEntry => {
  const actions: Record<string, number> = {};
  ACTIONS.forEach((action) => {
    actions[action.id] = entry.actions[action.id] ?? 0;
  });
  return { ...entry, actions };
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(defaultState);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: GameState = JSON.parse(stored);
        setState({ ...parsed, entries: parsed.entries.map(ensureActions) });
      } catch (error) {
        console.error('Failed to parse saved data', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const getEntry = useCallback(
    (date: string) => state.entries.find((item) => item.date === date),
    [state.entries]
  );

  const saveEntry = useCallback((entry: DailyEntry) => {
    setState((prev) => {
      const sanitized = ensureActions(entry);
      const entries = prev.entries.filter((item) => item.date !== sanitized.date);
      entries.push(sanitized);
      const totalXP = computeTotalXP(entries);
      return { ...prev, entries, totalXP };
    });
  }, []);

  const exportData = useCallback(() => JSON.stringify(state, null, 2), [state]);

  const importData = useCallback((payload: string) => {
    try {
      const parsed: GameState = JSON.parse(payload);
      setState({ ...parsed, entries: parsed.entries.map(ensureActions) });
    } catch (error) {
      console.error('Import failed', error);
    }
  }, []);

  const value = useMemo(
    () => ({ ...state, saveEntry, getEntry, exportData, importData }),
    [state, saveEntry, getEntry, exportData, importData]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextValue => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const useTodayEntry = (): DailyEntry => {
  const { getEntry } = useGame();
  const todayKey = getDateKey(new Date());
  return (
    getEntry(todayKey) ?? {
      date: todayKey,
      actions: {},
    }
  );
};
