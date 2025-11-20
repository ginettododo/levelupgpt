import { Flame, Heart, ShieldAlert } from 'lucide-react';
import React, { useMemo } from 'react';
import { useGame, useTodayEntry } from '../context/GameContext';
import { ACTIONS } from '../lib/constants';
import { summarizeEntryXP } from '../lib/gameLogic';
import { ActionDefinition } from '../lib/types';

const positiveActionIds = ['workout', 'miracle_morning', 'deep_work', 'study', 'eat_clean', 'wake_early'];
const negativeActionIds = ['junk_food', 'alcohol', 'doom_scroll', 'smoke_cig', 'smoke_joint', 'buy_tobacco'];

const QuickActionRow: React.FC<{
  action: ActionDefinition;
  value: number;
  onUpdate: (next: number) => void;
  isNegative?: boolean;
}> = ({ action, value, onUpdate, isNegative }) => {
  const isBoolean = action.type === 'boolean';
  const isCounter = action.type === 'counter';
  const isTime = action.type === 'time';
  const safeValue = Math.max(value, 0);
  const pillTone = isNegative ? 'danger' : 'primary';

  return (
    <div className={`action-tile ${isNegative ? 'action-negative' : 'action-positive'}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label">{isNegative ? 'Abitudine da evitare' : 'Rituale positivo'}</p>
          <p className="tile-title leading-tight">{action.label}</p>
          <p className="text-[11px] text-white/60">{action.type === 'time' ? 'Ore stimate' : 'Tocca per aggiornare'}</p>
        </div>
        <span className={`pill ${pillTone} text-[10px]`}>{action.xp} XP</span>
      </div>
      {isBoolean && (
        <button
          type="button"
          className={`toggle-chip ${safeValue ? 'toggle-chip-active' : ''}`}
          onClick={() => onUpdate(safeValue ? 0 : 1)}
          aria-pressed={safeValue > 0}
        >
          {safeValue ? 'Segnato' : 'Completa'}
        </button>
      )}
      {(isCounter || isTime) && (
        <div className="counter">
          <button
            type="button"
            className="pill ghost"
            onClick={() => onUpdate(Math.max(safeValue - 1, 0))}
            aria-label={`Riduci ${action.label}`}
          >
            -
          </button>
          <span className="counter-value">{safeValue}</span>
          <button
            type="button"
            className="pill ghost"
            onClick={() => onUpdate(safeValue + 1)}
            aria-label={`Aumenta ${action.label}`}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

const ActionIntake: React.FC = () => {
  const entry = useTodayEntry();
  const { saveEntry } = useGame();

  const { positiveXP, negativeXP, netXP } = useMemo(() => summarizeEntryXP(entry), [entry]);

  const persistAction = (actionId: string, next: number) => {
    const nextValue = Math.max(next, 0);
    saveEntry({ ...entry, actions: { ...entry.actions, [actionId]: nextValue } });
  };

  const positiveActions = ACTIONS.filter((action) => positiveActionIds.includes(action.id));
  const negativeActions = ACTIONS.filter((action) => negativeActionIds.includes(action.id));

  return (
    <section id="actions-intake" className="action-shell" aria-label="Attività positive e negative">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="label">Sezione principale</p>
          <h2 className="text-xl font-bold">Attività positive / negative</h2>
          <p className="text-sm text-white/70">Registra i rituali chiave e blocca subito le distrazioni.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="metric-chip">
            <Heart size={14} />
            <span>{positiveXP.toFixed(0)} XP positivi</span>
          </div>
          <div className="metric-chip warning">
            <ShieldAlert size={14} />
            <span>{negativeXP.toFixed(0)} XP a rischio</span>
          </div>
          <div className={`metric-chip ${netXP >= 0 ? 'success' : 'warning'}`}>
            <Flame size={14} />
            <span>Bilancio {netXP >= 0 ? '+' : ''}{netXP.toFixed(0)} XP</span>
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <div className="action-column positive">
          <div className="column-header">
            <Heart size={14} />
            <span>Azioni positive</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {positiveActions.map((action) => (
              <QuickActionRow
                key={action.id}
                action={action}
                value={entry.actions[action.id] ?? 0}
                onUpdate={(next) => persistAction(action.id, next)}
              />
            ))}
          </div>
        </div>
        <div className="action-column negative">
          <div className="column-header">
            <ShieldAlert size={14} />
            <span>Azioni negative</span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {negativeActions.map((action) => (
              <QuickActionRow
                key={action.id}
                action={action}
                value={entry.actions[action.id] ?? 0}
                onUpdate={(next) => persistAction(action.id, next)}
                isNegative
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionIntake;
