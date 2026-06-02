"use client";

interface StreakBarProps {
  streak: number;
  max?: number;
  animate: boolean;
}

export function StreakBar({ streak, max = 7, animate }: StreakBarProps) {
  const pct = Math.min((streak / max) * 100, 100);

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-kitchen-border/60">
      <div
        className={`h-full rounded-full bg-gradient-to-r from-violet-600 via-orange-500 to-amber-400 transition-all duration-700 ease-out ${
          animate ? "shadow-lg shadow-orange-500/40" : ""
        }`}
        style={{ width: `${Math.max(pct, streak > 0 ? 12 : 0)}%` }}
      />
    </div>
  );
}
