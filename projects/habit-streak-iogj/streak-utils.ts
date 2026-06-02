/** Local calendar date as YYYY-MM-DD (avoids UTC drift). */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getLast7Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(toDateKey(d));
  }
  return days;
}

export function formatDayLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

export function calculateStreak(completions: string[]): number {
  const set = new Set(completions);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const check = new Date(today);
  if (!set.has(toDateKey(check))) {
    check.setDate(check.getDate() - 1);
  }

  let streak = 0;
  while (set.has(toDateKey(check))) {
    streak++;
    check.setDate(check.getDate() - 1);
  }
  return streak;
}

export function toggleToday(completions: string[]): string[] {
  const today = toDateKey(new Date());
  if (completions.includes(today)) {
    return completions.filter((d) => d !== today);
  }
  return [...completions, today];
}

export function isDoneOn(completions: string[], dateKey: string): boolean {
  return completions.includes(dateKey);
}
