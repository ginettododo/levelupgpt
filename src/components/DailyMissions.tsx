import { CheckCircle2, Shield, Skull } from 'lucide-react';
import React from 'react';
import { useTodayEntry } from '../context/GameContext';

const missions = [
  {
    id: 'perfect_day',
    title: 'Perfect Day',
    description: 'Workout + Miracle Morning + Eat Clean + 1h Deep Work + No Smoking',
    validator: (actions: Record<string, number>) =>
      actions['workout'] > 0 &&
      actions['miracle_morning'] > 0 &&
      actions['eat_clean'] > 0 &&
      (actions['deep_work'] ?? 0) >= 1 &&
      (actions['smoke_cig'] ?? 0) === 0 &&
      (actions['smoke_joint'] ?? 0) === 0 &&
      (actions['buy_tobacco'] ?? 0) === 0,
  },
  {
    id: 'clean_eating',
    title: 'Clean & Focused',
    description: 'No junk food, no doom scroll, alcohol free.',
    validator: (actions: Record<string, number>) =>
      (actions['junk_food'] ?? 0) === 0 && (actions['doom_scroll'] ?? 0) === 0 && (actions['alcohol'] ?? 0) === 0,
  },
  {
    id: 'smoke_free',
    title: 'Smoke Free',
    description: '0 cigarettes, 0 joints, 0 tobacco buys.',
    validator: (actions: Record<string, number>) =>
      (actions['smoke_cig'] ?? 0) === 0 && (actions['smoke_joint'] ?? 0) === 0 && (actions['buy_tobacco'] ?? 0) === 0,
  },
];

const DailyMissions: React.FC = () => {
  const entry = useTodayEntry();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {missions.map((mission) => {
        const passed = mission.validator(entry.actions);
        return (
          <div key={mission.id} className={`mission-card ${passed ? 'complete' : ''}`} aria-label={mission.title}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow">{mission.title}</p>
                <p className="muted text-xs sm:text-sm">{mission.description}</p>
              </div>
              {passed ? <CheckCircle2 className="text-white" /> : <Shield className="text-white/60" />}
            </div>
            {!passed && (
              <div className="flex items-center gap-2 text-xs text-white font-semibold">
                <Skull size={14} />
                <span>Miss this and streak breaks</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DailyMissions;
