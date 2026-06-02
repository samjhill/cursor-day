"use client";

import {
  formatDayLabel,
  getLast7Days,
  isDoneOn,
  toDateKey,
} from "./streak-utils";

interface HeatGridProps {
  completions: string[];
}

export function HeatGrid({ completions }: HeatGridProps) {
  const days = getLast7Days();
  const today = toDateKey(new Date());

  return (
    <div className="flex gap-1.5" aria-label="Last 7 days activity">
      {days.map((day) => {
        const done = isDoneOn(completions, day);
        const isToday = day === today;
        return (
          <div key={day} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`h-8 w-full rounded-md transition-all duration-300 ${
                done
                  ? "bg-gradient-to-t from-violet-600 to-violet-400 shadow-sm shadow-violet-500/30"
                  : "bg-kitchen-border/60"
              } ${isToday ? "ring-1 ring-violet-400/50" : ""}`}
              title={`${formatDayLabel(day)}${done ? " — done" : ""}`}
            />
            <span
              className={`text-[10px] uppercase tracking-wide ${
                isToday ? "font-semibold text-violet-300" : "text-zinc-500"
              }`}
            >
              {formatDayLabel(day).slice(0, 2)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
