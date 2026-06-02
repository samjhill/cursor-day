export interface Habit {
  id: string;
  name: string;
  /** ISO date strings YYYY-MM-DD */
  completions: string[];
}

export interface HabitWithStreak extends Habit {
  streak: number;
  doneToday: boolean;
}
