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
    const cardClass = `tile-card ${isActive ? 'active' : ''}`;

    if (type === 'boolean') {
      return (
        <button
          key={actionId}
          className={cardClass}
          onClick={() => updateAction(actionId, isActive ? 0 : 1)}
          aria-pressed={isActive}
        >
          <div>
            <p className="microcopy">Toggle</p>
            <p className="tile-title">{label}</p>
          </div>
          <span className={`badge ${isActive ? 'primary' : 'ghost'}`}>{isActive ? 'Completed' : 'Tap to complete'}</span>
        </button>
      );
    }

    if (type === 'counter') {
      return (
        <div key={actionId} className={cardClass} role="group" aria-label={label}>
          <div>
            <p className="microcopy">Count</p>
            <p className="tile-title">{label}</p>
          </div>
          <div className="counter">
            <button type="button" onClick={() => updateAction(actionId, currentValue - 1)} aria-label={`Decrease ${label}`}>
              -
            </button>
            <span className="counter-value">{currentValue}</span>
            <button type="button" onClick={() => updateAction(actionId, currentValue + 1)} aria-label={`Increase ${label}`}>
              +
            </button>
          </div>
        </div>
      );
    }

    return (
      <div key={actionId} className={cardClass}>
        <div>
          <p className="microcopy">Hours</p>
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
                className={selected ? 'active' : ''}
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

  return <div className="grid-tiles">{actions.map((action) => renderCard(action.id, action.label, action.type))}</div>;
};

export default ActionGrid;
