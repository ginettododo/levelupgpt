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

  return (
    <div className={`action-tile ${isNegative ? 'negative' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="microcopy">{isNegative ? 'Habits to avoid' : 'Positive ritual'}</p>
          <p className="tile-title leading-tight">{action.label}</p>
          <p className="text-[11px] text-white/50">{action.type === 'time' ? 'Hours' : 'Tap to update'}</p>
        </div>
        <span className={`badge ${isNegative ? 'warn' : 'primary'}`}>{action.xp} XP</span>
      </div>
      {isBoolean && (
        <button
          type="button"
          className={`toggle-chip ${safeValue ? 'toggle-chip-active' : ''}`}
          onClick={() => onUpdate(safeValue ? 0 : 1)}
          aria-pressed={safeValue > 0}
        >
          {safeValue ? 'Logged' : 'Complete'}
        </button>
      )}
      {(isCounter || isTime) && (
        <div className="counter">
          <button type="button" onClick={() => onUpdate(Math.max(safeValue - 1, 0))} aria-label={`Reduce ${action.label}`}>
            -
          </button>
          <span className="counter-value">{safeValue}</span>
          <button type="button" onClick={() => onUpdate(safeValue + 1)} aria-label={`Increase ${action.label}`}>
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
    <section id="actions-intake" className="section-shell" aria-label="Attività positive e negative">
      <div className="mono-card fade-in">
        <div className="card-body space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Main stack</p>
              <h2 className="title-xl">Positive / negative rituals</h2>
              <p className="muted">Monochrome controls with animated feedback.</p>
            </div>
            <div className="metric-row">
              <div className="badge ghost">
                <Heart size={14} />
                <span>{positiveXP.toFixed(0)} XP</span>
              </div>
              <div className="badge warn">
                <ShieldAlert size={14} />
                <span>{negativeXP.toFixed(0)} XP</span>
              </div>
              <div className={`badge ${netXP >= 0 ? 'primary' : 'warn'}`}>
                <Flame size={14} />
                <span>Net {netXP >= 0 ? '+' : ''}{netXP.toFixed(0)} XP</span>
              </div>
            </div>
          </div>

          <div className="action-panel">
            <div className="action-column">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <Heart size={14} />
                <span>Positive actions</span>
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
            <div className="action-column">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                <ShieldAlert size={14} />
                <span>Negative actions</span>
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
        </div>
      </div>
    </section>
  );
};

export default ActionIntake;
