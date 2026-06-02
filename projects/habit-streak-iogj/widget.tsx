"use client";

import { useCallback, useRef, useState } from "react";
import { Flame, Plus, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/hooks";
import { CursorBadge } from "./cursor-badge";
import { createHabit, HabitCard } from "./habit-card";
import { DEMO_HABIT, STORAGE_KEY } from "./constants";
import { toDateKey, toggleToday } from "./streak-utils";
import type { Habit } from "./types";

export function HabitStreakWidget() {
  const [habits, setHabits] = useLocalStorage<Habit[]>(STORAGE_KEY, []);
  const [input, setInput] = useState("");
  const [headerUnlock, setHeaderUnlock] = useState(0);
  const headerClicks = useRef(0);
  const headerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const addHabit = useCallback(
    (name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      if (habits.some((h) => h.name.toLowerCase() === trimmed.toLowerCase())) return;
      setHabits((prev) => [...prev, createHabit(trimmed)]);
      setInput("");
    },
    [habits, setHabits]
  );

  const addDemoHabit = useCallback(() => {
    addHabit(DEMO_HABIT);
  }, [addHabit]);

  const toggleHabit = useCallback(
    (id: string) => {
      setHabits((prev) =>
        prev.map((h) => {
          if (h.id !== id) return h;
          const next = toggleToday(h.completions);
          return { ...h, completions: next };
        })
      );
    },
    [setHabits]
  );

  const removeHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((h) => h.id !== id));
    },
    [setHabits]
  );

  const handleHeaderClick = () => {
    headerClicks.current += 1;
    if (headerTimer.current) clearTimeout(headerTimer.current);
    headerTimer.current = setTimeout(() => {
      headerClicks.current = 0;
    }, 600);
    if (headerClicks.current >= 3) {
      headerClicks.current = 0;
      setHeaderUnlock((s) => s + 1);
    }
  };

  const totalStreaks = habits.reduce(
    (sum, h) => sum + h.completions.length,
    0
  );

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <button
          type="button"
          onClick={handleHeaderClick}
          className="cursor-default text-4xl sm:text-5xl transition-transform hover:scale-105"
          aria-label="Habit streak board"
        >
          🔥
        </button>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl gradient-text">
          Habit Streak Board
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Tap done. Watch the flame rise. Keep the chain unbroken.
        </p>
        {habits.length > 0 && (
          <p className="mt-2 text-sm text-zinc-500">
            {habits.length} habit{habits.length !== 1 ? "s" : ""} ·{" "}
            {totalStreaks} total check-ins
          </p>
        )}
      </header>

      <div className="glass kitchen-glow rounded-2xl border-violet-500/20 p-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addHabit(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="New habit…"
            className="flex-1 rounded-lg border border-kitchen-border bg-kitchen-bg px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-500/50 focus:outline-none focus:ring-1 focus:ring-violet-500/30"
            maxLength={40}
          />
          <Button type="submit" disabled={!input.trim()}>
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </form>

        {!habits.some((h) => h.name.toLowerCase() === DEMO_HABIT) && (
          <button
            type="button"
            onClick={addDemoHabit}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-violet-500/30 py-2.5 text-sm text-violet-300 transition-colors hover:border-violet-500/50 hover:bg-violet-500/5"
          >
            <Rocket className="h-4 w-4" />
            Try demo: add &ldquo;{DEMO_HABIT}&rdquo;
          </button>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {habits.length === 0 ? (
          <div className="glass rounded-xl p-10 text-center">
            <Flame className="mx-auto h-10 w-10 text-violet-500/40" />
            <p className="mt-4 text-zinc-400">No habits yet.</p>
            <p className="mt-1 text-sm text-zinc-500">
              Add &ldquo;{DEMO_HABIT}&rdquo; and tap done to see the streak animate.
            </p>
          </div>
        ) : (
          habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={toggleHabit}
              onRemove={removeHabit}
            />
          ))
        )}
      </div>

      <CursorBadge unlockSignal={headerUnlock} />
    </div>
  );
}
