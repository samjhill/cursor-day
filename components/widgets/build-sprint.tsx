"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Pause, Play, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Ingredient } from "@/lib/ingredients";
import type { Spice } from "@/lib/spices";

const SPRINT_SECONDS = 120;

interface Props {
  ingredients: Ingredient[];
  spice: Spice | null;
  dishName: string;
}

export function BuildSprint({ ingredients, spice, dishName }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(SPRINT_SECONDS);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!running || done) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearTimer();
          setRunning(false);
          setDone(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return clearTimer;
  }, [running, done, clearTimer]);

  const start = () => {
    if (done) return;
    setRunning(true);
  };

  const pause = () => {
    setRunning(false);
    clearTimer();
  };

  const reset = () => {
    pause();
    setSecondsLeft(SPRINT_SECONDS);
    setDone(false);
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const urgent = secondsLeft <= 30 && !done;
  const progress = ((SPRINT_SECONDS - secondsLeft) / SPRINT_SECONDS) * 100;

  return (
    <Card
      className={`border-2 transition-colors ${
        done
          ? "border-emerald-500/50 bg-emerald-500/10"
          : urgent
            ? "border-red-500/50 bg-red-500/5"
            : "border-amber-500/30 bg-amber-500/5"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {done ? "🛎️ Order Up!" : "⏱️ Iron Chef Sprint"}
        </h2>
        {spice?.id === "iron-chef" && (
          <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs text-red-300">
            spice active
          </span>
        )}
      </div>

      <p className="mb-6 text-sm text-zinc-400">
        {done
          ? `Time to plate "${dishName}" and head to the pass.`
          : `Build using your rolled ingredients before the bell.`}
      </p>

      <div className="relative mb-6 flex flex-col items-center">
        <div
          className={`text-7xl font-bold tabular-nums tracking-tight ${
            done
              ? "text-emerald-400"
              : urgent
                ? "animate-pulse text-red-400"
                : "text-amber-300"
          }`}
        >
          {done ? "00:00" : `${mins}:${secs.toString().padStart(2, "0")}`}
        </div>
        <div className="mt-4 h-2 w-full max-w-xs overflow-hidden rounded-full bg-kitchen-border">
          <div
            className={`h-full transition-all duration-1000 ${
              done
                ? "bg-emerald-500"
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}
            style={{ width: `${done ? 100 : progress}%` }}
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {ingredients.map((i) => (
          <span
            key={i.id}
            className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-sm"
          >
            {i.emoji} {i.name}
          </span>
        ))}
      </div>

      {spice && (
        <p className="mb-6 text-center text-sm text-orange-300">
          {spice.emoji} {spice.constraint}
        </p>
      )}

      <div className="flex justify-center gap-3">
        {!done && !running && (
          <Button
            size="lg"
            onClick={start}
            className="bg-gradient-to-r from-amber-500 to-orange-600"
          >
            <Play className="h-5 w-5" />
            Start Sprint
          </Button>
        )}
        {!done && running && (
          <Button size="lg" variant="outline" onClick={pause}>
            <Pause className="h-5 w-5" />
            Pause
          </Button>
        )}
        <Button size="lg" variant="ghost" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
        {done && (
          <Button size="lg" onClick={reset}>
            <Bell className="h-5 w-5" />
            Cook Again
          </Button>
        )}
      </div>
    </Card>
  );
}
