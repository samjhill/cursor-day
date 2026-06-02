"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

const DOTS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [
    [28, 28],
    [72, 72],
  ],
  3: [
    [28, 28],
    [50, 50],
    [72, 72],
  ],
  4: [
    [28, 28],
    [72, 28],
    [28, 72],
    [72, 72],
  ],
  5: [
    [28, 28],
    [72, 28],
    [50, 50],
    [28, 72],
    [72, 72],
  ],
  6: [
    [28, 28],
    [72, 28],
    [28, 50],
    [72, 50],
    [28, 72],
    [72, 72],
  ],
};

interface DiceProps {
  value: number;
  rolling: boolean;
  label?: string;
  size?: "sm" | "lg";
}

export function Dice({ value, rolling, label, size = "lg" }: DiceProps) {
  const [display, setDisplay] = useState(value);
  const clamped = Math.min(6, Math.max(1, display));

  useEffect(() => {
    if (!rolling) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      setDisplay(Math.floor(Math.random() * 6) + 1);
      frame++;
      if (frame > 14) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [rolling, value]);

  useEffect(() => {
    if (!rolling) setDisplay(value);
  }, [value, rolling]);

  const dim = size === "lg" ? "h-20 w-20" : "h-14 w-14";
  const dotSize = size === "lg" ? "h-3 w-3" : "h-2 w-2";

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={clsx(
          "dice-cube relative rounded-xl border-2 border-amber-200/30 bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg shadow-amber-900/40",
          dim,
          rolling && "dice-rolling",
          !rolling && "dice-landed"
        )}
      >
        <div className="relative h-full w-full">
          {DOTS[clamped].map(([x, y], i) => (
            <span
              key={i}
              className={clsx(
                "absolute rounded-full bg-amber-900/90",
                dotSize
              )}
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium uppercase tracking-wider text-kitchen-muted">
          {label}
        </span>
      )}
    </div>
  );
}

interface DiceRowProps {
  values: { track: number; ingredientCount: number; spice: number };
  rolling: boolean;
}

export function DiceRow({ values, rolling }: DiceRowProps) {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6 md:gap-10">
      <Dice value={values.track} rolling={rolling} label="Course" />
      <Dice value={values.ingredientCount} rolling={rolling} label="Ingredients" />
      <Dice value={values.spice} rolling={rolling} label="Spice" />
    </div>
  );
}
