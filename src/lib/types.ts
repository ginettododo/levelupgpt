export type Category = 'PHYSICAL' | 'WORK' | 'DISCIPLINE' | 'SOCIAL' | 'VICES';

export interface ActionDefinition {
  id: string;
  label: string;
  category: Category;
  xp: number;
  type: 'boolean' | 'counter' | 'time';
  description?: string;
}

export interface DailyEntry {
  date: string; // YYYY-MM-DD
  actions: Record<string, number>;
  notes?: string;
}

export interface BadgeProgress {
  name: string;
  xp: number;
  achievedOn?: string;
  progressText?: string;
}

export interface LevelInfo {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  progress: number; // 0-1 for bar
}

export interface GameState {
  entries: DailyEntry[];
  badges: BadgeProgress[];
  totalXP: number;
}
