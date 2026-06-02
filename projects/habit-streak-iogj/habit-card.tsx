"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeatGrid } from "./heat-grid";
import { StreakBar } from "./streak-bar";
import { StreakFlame } from "./streak-flame";
import { calculateStreak, toDateKey } from "./streak-utils";
import type { Habit } from "./types";

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onRemove }: HabitCardProps) {
  const streak = calculateStreak(habit.completions);
  const today = toDateKey(new Date());
  const doneToday = habit.completions.includes(today);

  const prevStreak = useRef(streak);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (streak > prevStreak.current) {
      setAnimate(true);
      const t = window.setTimeout(() => setAnimate(false), 800);
      prevStreak.current = streak;
      return () => window.clearTimeout(t);
    }
    prevStreak.current = streak;
  }, [streak]);

  return (
    <article className="glass group rounded-xl border-violet-500/10 p-5 transition-all hover:border-violet-500/25">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-zinc-100">{habit.name}</h3>
          <div className="mt-3 flex items-center gap-3">
            <StreakFlame streak={streak} animate={animate} />
            <div>
              <p
                className={`text-3xl font-bold tabular-nums transition-all duration-300 ${
                  animate ? "scale-110 text-amber-400" : "text-violet-300"
                }`}
              >
                {streak}
              </p>
              <p className="text-xs text-zinc-500">day streak</p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            onClick={() => onToggle(habit.id)}
            className={`flex h-12 w-12 items-center justify-center rounded-xl border-2 transition-all duration-200 ${
              doneToday
                ? "border-kitchen-success bg-kitchen-success/20 text-kitchen-success shadow-lg shadow-emerald-500/20"
                : "border-kitchen-border bg-kitchen-surface hover:border-violet-500/50 hover:bg-violet-500/10"
            } ${animate ? "scale-110" : ""}`}
            aria-label={doneToday ? "Mark today as not done" : "Mark today as done"}
            title={doneToday ? "Undo today" : "Done today!"}
          >
            <Check className={`h-6 w-6 ${doneToday ? "opacity-100" : "opacity-40"}`} />
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(habit.id)}
            className="opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={`Remove ${habit.name}`}
          >
            <Trash2 className="h-4 w-4 text-zinc-500" />
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <StreakBar streak={streak} animate={animate} />
      </div>

      <div className="mt-4">
        <HeatGrid completions={habit.completions} />
      </div>
    </article>
  );
}

export function createHabit(name: string): Habit {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    completions: [],
  };
}

