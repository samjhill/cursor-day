"use client";

import { useEffect, useState } from "react";
import { BarChart3, Dices, Flame, UtensilsCrossed } from "lucide-react";
import { Card } from "@/components/ui/card";
import { INGREDIENTS } from "@/lib/ingredients";
import { SPICES } from "@/lib/spices";
import {
  readStats,
  topEntries,
} from "@/lib/kitchen-stats";
import { DEFAULT_STATS, type KitchenStats } from "@/lib/cook-types";

function StatBlock({
  label,
  value,
  icon,
  pulse,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  pulse?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-kitchen-border bg-kitchen-bg p-4 ${pulse ? "animate-pulse ring-1 ring-amber-500/30" : ""}`}
    >
      <div className="mb-2 flex items-center gap-2 text-kitchen-muted">
        {icon}
        <span className="text-xs uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-bold tabular-nums text-amber-300">{value}</p>
    </div>
  );
}

function BarRow({
  label,
  count,
  max,
  emoji,
}: {
  label: string;
  count: number;
  max: number;
  emoji?: string;
}) {
  const pct = max > 0 ? (count / max) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>
          {emoji} {label}
        </span>
        <span className="tabular-nums text-kitchen-muted">{count}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-kitchen-border">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function KitchenDashboard() {
  const [stats, setStats] = useState<KitchenStats>(DEFAULT_STATS);

  useEffect(() => {
    const refresh = () => setStats(readStats());
    refresh();
    window.addEventListener("pk-stats-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("pk-stats-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const spiceTop = topEntries(stats.spiceCounts);
  const ingTop = topEntries(stats.ingredientCounts);
  const maxSpice = spiceTop[0]?.[1] ?? 1;
  const maxIng = ingTop[0]?.[1] ?? 1;

  const spiceName = (id: string) =>
    SPICES.find((s) => s.id === id)?.name ?? id;
  const spiceEmoji = (id: string) =>
    SPICES.find((s) => s.id === id)?.emoji ?? "🌶️";
  const ingName = (id: string) =>
    INGREDIENTS.find((i) => i.id === id)?.name ?? id;
  const ingEmoji = (id: string) =>
    INGREDIENTS.find((i) => i.id === id)?.emoji ?? "🥄";

  return (
    <Card className="border-emerald-500/20 bg-emerald-950/10">
      <div className="mb-6 flex items-center gap-2">
        <BarChart3 className="h-5 w-5 text-emerald-400" />
        <h2 className="text-lg font-semibold">Kitchen Analytics</h2>
        <span className="ml-auto text-xs text-kitchen-muted">live session</span>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-4">
        <StatBlock
          label="Rolls"
          value={stats.rolls}
          icon={<Dices className="h-4 w-4" />}
        />
        <StatBlock
          label="Simmers"
          value={stats.simmers}
          icon={<Flame className="h-4 w-4" />}
        />
        <StatBlock
          label="Plates"
          value={stats.plates}
          icon={<UtensilsCrossed className="h-4 w-4" />}
        />
      </div>

      {stats.rolls === 0 ? (
        <p className="rounded-lg border border-dashed border-kitchen-border p-6 text-center text-sm text-zinc-400">
          No rolls yet — head to the kitchen and roll the dice to populate
          this dashboard.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-kitchen-muted">
              Spice frequency
            </p>
            <div className="space-y-3">
              {spiceTop.length === 0 ? (
                <p className="text-sm text-zinc-500">No spices rolled yet</p>
              ) : (
                spiceTop.map(([id, count]) => (
                  <BarRow
                    key={id}
                    label={spiceName(id)}
                    emoji={spiceEmoji(id)}
                    count={count}
                    max={maxSpice}
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-kitchen-muted">
              Ingredient heat
            </p>
            <div className="space-y-3">
              {ingTop.length === 0 ? (
                <p className="text-sm text-zinc-500">No ingredients logged</p>
              ) : (
                ingTop.map(([id, count]) => (
                  <BarRow
                    key={id}
                    label={ingName(id)}
                    emoji={ingEmoji(id)}
                    count={count}
                    max={maxIng}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {stats.lastRollAt && (
        <p className="mt-6 text-center text-xs text-kitchen-muted">
          Last roll: {new Date(stats.lastRollAt).toLocaleTimeString()}
        </p>
      )}
    </Card>
  );
}
