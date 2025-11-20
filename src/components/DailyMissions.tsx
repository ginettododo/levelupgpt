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
    <div className="space-y-3">
      {missions.map((mission) => {
        const passed = mission.validator(entry.actions);
        return (
          <div
            key={mission.id}
            className={`neon-card p-3 flex items-center gap-3 ${
              passed ? 'border-neon-physical/50 shadow-neon-green' : 'border-white/10'
            }`}
            aria-label={mission.title}
          >
            {passed ? <CheckCircle2 className="text-neon-physical" /> : <Shield className="text-white/60" />}
            <div className="flex-1">
              <p className="text-sm font-semibold">{mission.title}</p>
              <p className="text-xs text-white/60">{mission.description}</p>
            </div>
            {!passed && <Skull className="text-neon-negative" />}
          </div>
        );
      })}
    </div>
  );
};

export default DailyMissions;
