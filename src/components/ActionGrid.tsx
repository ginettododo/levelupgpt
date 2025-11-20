import React from 'react';
import { useGame, useTodayEntry } from '../context/GameContext';
import { ACTIONS } from '../lib/constants';
import { Category } from '../lib/types';

interface Props {
  category: Category;
}

const ActionGrid: React.FC<Props> = ({ category }) => {
  const entry = useTodayEntry();
  const { saveEntry } = useGame();
  const actions = ACTIONS.filter((action) => action.category === category);

  const updateAction = (id: string, value: number) => {
    saveEntry({ ...entry, actions: { ...entry.actions, [id]: Math.max(value, 0) } });
  };

  const renderCard = (actionId: string, label: string, type: string) => {
    const currentValue = entry.actions[actionId] ?? 0;
    const isActive = currentValue > 0;
    const cardClass = `neon-card aspect-[1.6/1] p-3 flex flex-col justify-between active:scale-95 transition ${
      isActive ? 'border-neon-physical/50 shadow-neon-green' : ''
    }`;

    if (type === 'boolean') {
      return (
        <button
          key={actionId}
          className={cardClass}
          onClick={() => updateAction(actionId, isActive ? 0 : 1)}
          aria-pressed={isActive}
        >
          <span className="text-xs uppercase tracking-widest text-white/60">Toggle</span>
          <span className="text-left font-semibold text-white">{label}</span>
          <span className="text-[10px] text-white/50">Tap to {isActive ? 'disable' : 'complete'}</span>
        </button>
      );
    }

    if (type === 'counter') {
      return (
        <div key={actionId} className={cardClass} role="group" aria-label={label}>
          <div className="text-left">
            <p className="text-xs uppercase tracking-widest text-white/60">Count</p>
            <p className="font-semibold">{label}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="neon-pill bg-lvl-800 text-white active:scale-95"
              onClick={() => updateAction(actionId, currentValue - 1)}
              aria-label={`Decrease ${label}`}
            >
              -
            </button>
            <span className="font-bold text-lg">{currentValue}</span>
            <button
              type="button"
              className="neon-pill bg-lvl-800 text-white active:scale-95"
              onClick={() => updateAction(actionId, currentValue + 1)}
              aria-label={`Increase ${label}`}
            >
              +
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={actionId} className={cardClass}>
        <div className="text-left">
          <p className="text-xs uppercase tracking-widest text-white/60">Hours</p>
          <p className="font-semibold">{label}</p>
        </div>
        <div className="grid grid-cols-5 gap-1">
          {[0, 1, 2, 3, 4].map((value) => {
            const labelText = value === 4 ? '4+' : value.toString();
            const selected = currentValue === value || (value === 4 && currentValue >= 4);
            return (
              <button
                key={value}
                type="button"
                className={`neon-pill text-center ${
                  selected ? 'bg-neon-work/20 text-neon-work' : 'bg-lvl-800 text-white/70'
                }`}
                onClick={() => updateAction(actionId, value === 4 ? 4 : value)}
              >
                {labelText}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {actions.map((action) => renderCard(action.id, action.label, action.type))}
    </div>
  );
};

export default ActionGrid;
