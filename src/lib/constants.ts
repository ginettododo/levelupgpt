import { ActionDefinition } from './types';

export const STORAGE_KEY = 'levelup_entries';

export const ACTIONS: ActionDefinition[] = [
  { id: 'workout', label: 'Workout', category: 'PHYSICAL', xp: 30, type: 'boolean' },
  { id: 'steps', label: '10k Steps', category: 'PHYSICAL', xp: 20, type: 'boolean' },
  { id: 'eat_clean', label: 'Eat Clean', category: 'PHYSICAL', xp: 25, type: 'boolean' },
  { id: 'water', label: '2L Water', category: 'PHYSICAL', xp: 10, type: 'boolean' },
  { id: 'skip_workout', label: 'Skip Workout', category: 'VICES', xp: -20, type: 'boolean' },
  { id: 'junk_food', label: 'Junk Food', category: 'VICES', xp: -25, type: 'boolean' },
  { id: 'alcohol', label: 'Alcohol', category: 'VICES', xp: -30, type: 'boolean' },
  { id: 'miracle_morning', label: 'Miracle Morning', category: 'DISCIPLINE', xp: 40, type: 'boolean' },
  { id: 'wake_early', label: 'Wake Early', category: 'DISCIPLINE', xp: 15, type: 'boolean' },
  { id: 'doom_scroll', label: 'Doom Scroll', category: 'VICES', xp: -15, type: 'boolean' },
  { id: 'deep_work', label: 'Deep Work (hrs)', category: 'WORK', xp: 20, type: 'time' },
  { id: 'study', label: 'Study (hrs)', category: 'WORK', xp: 20, type: 'time' },
  { id: 'big_task', label: 'Big Task', category: 'WORK', xp: 25, type: 'boolean' },
  { id: 'procrastination', label: 'Procrastination', category: 'VICES', xp: -25, type: 'boolean' },
  { id: 'smoke_cig', label: 'Cigarette', category: 'VICES', xp: -15, type: 'counter' },
  { id: 'smoke_joint', label: 'Joint', category: 'VICES', xp: -30, type: 'counter' },
  { id: 'buy_tobacco', label: 'Buy Tobacco', category: 'VICES', xp: -50, type: 'counter' },
];

export const LEVELS = [
  0, 100, 250, 450, 700, 1000, 1400, 1850, 2350, 2700, 3200, 3800, 4500, 5200, 6000,
];
