"use client";

import { Check } from "lucide-react";

export const KITCHEN_STEPS = [
  { id: 0, label: "Roll", emoji: "🎲" },
  { id: 1, label: "Gather", emoji: "🥬" },
  { id: 2, label: "Simmer", emoji: "🔥" },
  { id: 3, label: "Plate", emoji: "🍽️" },
] as const;

export type KitchenStep = (typeof KITCHEN_STEPS)[number]["id"];

interface Props {
  step: KitchenStep;
  maxReached: KitchenStep;
  onStepClick: (step: KitchenStep) => void;
}

export function KitchenStepNav({ step, maxReached, onStepClick }: Props) {
  return (
    <nav aria-label="Kitchen steps" className="mb-10">
      <ol className="flex items-center justify-center gap-1 sm:gap-2">
        {KITCHEN_STEPS.map((s, i) => {
          const done = s.id < step;
          const active = s.id === step;
          const reachable = s.id <= maxReached;
          return (
            <li key={s.id} className="flex items-center gap-1 sm:gap-2">
              {i > 0 && (
                <span
                  className={`hidden h-px w-4 sm:block sm:w-8 ${
                    s.id <= maxReached ? "bg-amber-500/40" : "bg-kitchen-border"
                  }`}
                  aria-hidden
                />
              )}
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onStepClick(s.id)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
                  active
                    ? "border-amber-500 bg-amber-500/15 text-amber-200"
                    : done
                      ? "border-amber-500/30 bg-amber-500/5 text-amber-300/80 hover:border-amber-500/50"
                      : reachable
                        ? "border-kitchen-border text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
                        : "cursor-not-allowed border-kitchen-border/60 text-zinc-600"
                }`}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] sm:h-6 sm:w-6 sm:text-xs">
                  {done ? (
                    <Check className="h-3.5 w-3.5 text-amber-400" />
                  ) : (
                    s.emoji
                  )}
                </span>
                <span className={active ? "" : "hidden sm:inline"}>{s.label}</span>
              </button>
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-center text-sm text-zinc-500">
        Step {step + 1} of {KITCHEN_STEPS.length} · {KITCHEN_STEPS[step].label}
      </p>
    </nav>
  );
}

export const KITCHEN_STEP_KEY = "pk-kitchen-step";
