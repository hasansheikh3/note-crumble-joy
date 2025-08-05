export interface Task {
  id: string;
  text: string;
  color: 'mint' | 'lavender' | 'peach' | 'sky' | 'butter' | 'coral' | 'sage' | 'cream';
  createdAt: number;
  estimatedMinutes?: number;
  category?: string;
  isCompleted: boolean;
}

export interface CompletedTask {
  id: string;
  completedAt: number;
  color: Task['color'];
  jarPosition: {
    x: number;
    y: number;
    z: number;
  };
}

export const NOTE_COLORS = [
  { name: 'mint', label: 'Mint Green' },
  { name: 'lavender', label: 'Lavender' },
  { name: 'peach', label: 'Peach' },
  { name: 'sky', label: 'Sky Blue' },
  { name: 'butter', label: 'Butter Yellow' },
  { name: 'coral', label: 'Coral Pink' },
  { name: 'sage', label: 'Sage Green' },
  { name: 'cream', label: 'Cream' },
] as const;

export const PRESET_TASKS = [
  { text: 'Make coffee ☕', category: 'morning', estimatedMinutes: 3 },
  { text: 'Check emails 📧', category: 'work', estimatedMinutes: 5 },
  { text: '10-min cleanup 🧹', category: 'home', estimatedMinutes: 10 },
  { text: 'Stretch & breathe 🧘', category: 'wellness', estimatedMinutes: 5 },
  { text: 'Plan the day 📝', category: 'planning', estimatedMinutes: 5 },
] as const;