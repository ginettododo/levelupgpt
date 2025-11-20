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
    const cardClass = `tile ${isActive ? 'tile-active' : ''}`;

    if (type === 'boolean') {
      return (
        <button
          key={actionId}
          className={cardClass}
          onClick={() => updateAction(actionId, isActive ? 0 : 1)}
          aria-pressed={isActive}
        >
          <div>
            <p className="label">Toggle</p>
            <p className="tile-title">{label}</p>
          </div>
          <span className="pill subtle">{isActive ? 'Completed' : 'Tap to complete'}</span>
        </button>
      );
    }

    if (type === 'counter') {
      return (
        <div key={actionId} className={cardClass} role="group" aria-label={label}>
          <div>
            <p className="label">Count</p>
            <p className="tile-title">{label}</p>
          </div>
          <div className="counter">
            <button
              type="button"
              className="pill ghost"
              onClick={() => updateAction(actionId, currentValue - 1)}
              aria-label={`Decrease ${label}`}
            >
              -
            </button>
            <span className="counter-value">{currentValue}</span>
            <button
              type="button"
              className="pill ghost"
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
        <div>
          <p className="label">Hours</p>
          <p className="tile-title">{label}</p>
        </div>
        <div className="hour-grid">
          {[0, 1, 2, 3, 4].map((value) => {
            const labelText = value === 4 ? '4+' : value.toString();
            const selected = currentValue === value || (value === 4 && currentValue >= 4);
            return (
              <button
                key={value}
                type="button"
                className={`pill ${selected ? 'primary' : 'ghost'}`}
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

  return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{actions.map((action) => renderCard(action.id, action.label, action.type))}</div>;
};

export default ActionGrid;
