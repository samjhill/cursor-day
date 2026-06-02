"use client";

import { useCallback, useMemo, useState } from "react";
import { Coffee, GitCommit, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/lib/hooks";

export type DayPoint = {
  label: string;
  coffees: number;
  commits: number;
};

/** Seeded week — suspiciously perfect correlation for demo laughs */
export const SEED_WEEK: DayPoint[] = [
  { label: "Mon", coffees: 1, commits: 4 },
  { label: "Tue", coffees: 2, commits: 9 },
  { label: "Wed", coffees: 2, commits: 11 },
  { label: "Thu", coffees: 3, commits: 14 },
  { label: "Fri", coffees: 4, commits: 19 },
];

const TODAY_LABEL = "Today";
const STORAGE_KEY = "pk-coffee-commits";

type SessionState = {
  week: DayPoint[];
  todayCoffees: number;
  todayCommits: number;
  totalCoffeesAdded: number;
};

const DEFAULT_SESSION: SessionState = {
  week: SEED_WEEK,
  todayCoffees: 3,
  todayCommits: 12,
  totalCoffeesAdded: 0,
};

const QUIPS = [
  "Peer-reviewed by my espresso machine.",
  "Causation confirmed. Do not investigate.",
  "More beans → more merges. QED.",
  "IRB waived. Sample size: me.",
];

function correlationCoefficient(points: { x: number; y: number }[]): number {
  const n = points.length;
  if (n < 2) return 1;
  const sumX = points.reduce((s, p) => s + p.x, 0);
  const sumY = points.reduce((s, p) => s + p.y, 0);
  const sumXY = points.reduce((s, p) => s + p.x * p.y, 0);
  const sumX2 = points.reduce((s, p) => s + p.x * p.x, 0);
  const sumY2 = points.reduce((s, p) => s + p.y * p.y, 0);
  const num = n * sumXY - sumX * sumY;
  const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  if (den === 0) return 1;
  return Math.min(0.99, Math.max(0.85, num / den));
}

function GroupedBarChart({
  week,
  today,
}: {
  week: DayPoint[];
  today: DayPoint;
}) {
  const all = [...week, today];
  const maxVal = Math.max(
    ...all.flatMap((d) => [d.coffees, d.commits]),
    1
  );
  const chartW = 420;
  const chartH = 200;
  const pad = { top: 12, right: 16, bottom: 28, left: 36 };
  const innerW = chartW - pad.left - pad.right;
  const innerH = chartH - pad.top - pad.bottom;
  const groupW = innerW / all.length;
  const barW = Math.min(14, groupW * 0.28);

  return (
    <svg
      viewBox={`0 0 ${chartW} ${chartH}`}
      className="w-full max-w-lg"
      role="img"
      aria-label="Grouped bar chart: coffees vs commits by day"
    >
      <defs>
        <linearGradient id="coffeeGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <linearGradient id="commitGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#5b21b6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>

      {[0, 0.5, 1].map((t) => {
        const y = pad.top + innerH * (1 - t);
        return (
          <g key={t}>
            <line
              x1={pad.left}
              y1={y}
              x2={chartW - pad.right}
              y2={y}
              stroke="#292524"
              strokeDasharray="4 4"
            />
            <text
              x={pad.left - 6}
              y={y + 4}
              textAnchor="end"
              className="fill-zinc-500 text-[9px]"
            >
              {Math.round(maxVal * t)}
            </text>
          </g>
        );
      })}

      {all.map((day, i) => {
        const gx = pad.left + i * groupW + groupW / 2;
        const coffeeH = (day.coffees / maxVal) * innerH;
        const commitH = (day.commits / maxVal) * innerH;
        const isToday = day.label === TODAY_LABEL;

        return (
          <g key={`${day.label}-${day.coffees}-${day.commits}`}>
            <rect
              x={gx - barW - 2}
              y={pad.top + innerH - coffeeH}
              width={barW}
              height={coffeeH}
              rx={3}
              fill="url(#coffeeGrad)"
              className="coffee-bar-grow"
              style={{ transformOrigin: `${gx - barW / 2 - 2}px ${pad.top + innerH}px` }}
            />
            <rect
              x={gx + 2}
              y={pad.top + innerH - commitH}
              width={barW}
              height={commitH}
              rx={3}
              fill="url(#commitGrad)"
              className="commit-bar-grow"
              style={{ transformOrigin: `${gx + barW / 2 + 2}px ${pad.top + innerH}px` }}
            />
            <text
              x={gx}
              y={chartH - 8}
              textAnchor="middle"
              className={`text-[10px] font-medium ${isToday ? "fill-amber-300" : "fill-zinc-500"}`}
            >
              {day.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CoffeeVsCommitsDashboard() {
  const [session, setSession] = useLocalStorage<SessionState>(
    STORAGE_KEY,
    DEFAULT_SESSION
  );
  const [pulseCoffee, setPulseCoffee] = useState(false);
  const [quip, setQuip] = useState<string | null>(null);

  const todayPoint: DayPoint = useMemo(
    () => ({
      label: TODAY_LABEL,
      coffees: session.todayCoffees,
      commits: session.todayCommits,
    }),
    [session.todayCoffees, session.todayCommits]
  );

  const allPoints = useMemo(
    () =>
      [...session.week, todayPoint].map((d) => ({
        x: d.coffees,
        y: d.commits,
      })),
    [session.week, todayPoint]
  );

  const r = correlationCoefficient(allPoints);
  const totalCoffees =
    session.week.reduce((s, d) => s + d.coffees, 0) + session.todayCoffees;
  const totalCommits =
    session.week.reduce((s, d) => s + d.commits, 0) + session.todayCommits;

  const addCoffee = useCallback(() => {
    const commitBump = 3 + Math.floor(Math.random() * 4);
    setSession((prev) => ({
      ...prev,
      todayCoffees: prev.todayCoffees + 1,
      todayCommits: prev.todayCommits + commitBump,
      totalCoffeesAdded: prev.totalCoffeesAdded + 1,
    }));
    setPulseCoffee(true);
    setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
    window.setTimeout(() => setPulseCoffee(false), 600);
  }, [setSession]);

  return (
    <Card className="relative overflow-hidden border-2 border-amber-500/25 bg-gradient-to-br from-kitchen-surface via-kitchen-surface to-amber-950/20">
      <div className="pointer-events-none absolute -right-4 -top-4 text-7xl opacity-[0.07]">
        ☕
      </div>

      <div className="relative mb-6 text-center">
        <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-amber-400">
          ☕ Coffee vs Commits
        </p>
        <h2 className="text-2xl font-bold md:text-3xl">
          More coffee = more commits
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Totally rigorous. Built live at NYC Cook with Cursor Day
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div
          className={`rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-center transition-transform ${
            pulseCoffee ? "scale-105 ring-2 ring-amber-400/50" : ""
          }`}
        >
          <div className="mb-1 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-amber-400/80">
            <Coffee className="h-4 w-4" />
            Coffees today
          </div>
          <p className="text-4xl font-bold tabular-nums text-amber-300 md:text-5xl">
            {session.todayCoffees}
          </p>
        </div>
        <div
          className={`rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 text-center transition-transform ${
            pulseCoffee ? "scale-105 ring-2 ring-violet-400/50" : ""
          }`}
        >
          <div className="mb-1 flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-violet-400/80">
            <GitCommit className="h-4 w-4" />
            Commits today
          </div>
          <p className="text-4xl font-bold tabular-nums text-violet-300 md:text-5xl">
            {session.todayCommits}
          </p>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center rounded-xl border border-kitchen-border bg-kitchen-bg/60 p-4 sm:col-span-1">
          <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-kitchen-muted">
            <TrendingUp className="h-4 w-4 text-emerald-400" />
            Correlation
          </div>
          <p className="text-3xl font-bold tabular-nums text-emerald-300">
            r = {r.toFixed(2)}
          </p>
          <p className="mt-1 text-center text-[10px] text-zinc-500">
            {totalCoffees} ☕ · {totalCommits} commits all week
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-col items-center">
        <GroupedBarChart week={session.week} today={todayPoint} />
        <div className="mt-3 flex flex-wrap justify-center gap-4 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-amber-700 to-amber-300" />
            Coffees
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-gradient-to-t from-violet-800 to-violet-300" />
            Commits
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Button
          size="lg"
          onClick={addCoffee}
          className="min-w-[220px] bg-gradient-to-r from-amber-500 to-orange-600 text-lg font-bold shadow-lg shadow-amber-900/30 hover:from-amber-400 hover:to-orange-500"
        >
          <Coffee className="h-6 w-6" />
          Add Coffee
        </Button>
        <p className="text-xs text-kitchen-muted">
          Each sip mysteriously generates 3–6 commits
        </p>
        {quip && (
          <p className="animate-fade-in max-w-md text-center text-sm italic text-amber-200/90">
            {quip}
          </p>
        )}
        {session.totalCoffeesAdded > 0 && (
          <p className="text-xs text-kitchen-muted">
            {session.totalCoffeesAdded} pour
            {session.totalCoffeesAdded !== 1 ? "s" : ""} logged this demo
          </p>
        )}
      </div>

      <p className="mt-6 text-center text-[10px] text-zinc-600">
        Tasting Menu · 3 ingredients: Next.js · localStorage · CSS/SVG motion
      </p>
    </Card>
  );
}
