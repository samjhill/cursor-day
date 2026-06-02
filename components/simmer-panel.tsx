"use client";

import { useState } from "react";
import { Flame, Loader2, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SimmerResponse } from "@/lib/cook-types";
import type { Ingredient } from "@/lib/ingredients";
import type { Spice } from "@/lib/spices";
import type { Track, TrackId } from "@/lib/tracks";
import { recordSimmer } from "@/lib/kitchen-stats";
import { useLocalStorage } from "@/lib/hooks";
import { callCook } from "@/lib/cook-client";
import type { ToolIdea } from "@/lib/tool-ideas";

interface Props {
  dishName: string;
  pitch: string;
  track: Track;
  ingredients: Ingredient[];
  spice: Spice | null;
  tool?: ToolIdea | null;
}

export function SimmerPanel({
  dishName,
  pitch,
  track,
  ingredients,
  spice,
  tool,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useLocalStorage<SimmerResponse | null>(
    "pk-simmer",
    null
  );
  const [error, setError] = useState<string | null>(null);

  const simmer = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await callCook({
        action: "simmer",
        dishName,
        pitch,
        trackId: track.id as TrackId,
        toolBrief: tool?.buildBrief,
        toolName: tool?.name,
        ingredients: ingredients.map((i) => ({
          id: i.id,
          name: i.name,
          emoji: i.emoji,
        })),
        spice: spice
          ? {
              id: spice.id,
              name: spice.name,
              emoji: spice.emoji,
              constraint: spice.constraint,
            }
          : null,
      });
      setResult(data as SimmerResponse);
      recordSimmer();
    } catch {
      setError("Couldn't reach the kitchen. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-orange-500/30 bg-gradient-to-br from-orange-950/20 to-kitchen-surface">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-orange-400">
            <Flame className="h-4 w-4" />
            Simmer
          </p>
          <p className="mt-1 text-sm text-zinc-400">
            Turn your rolled recipe into a build plan — features, files, demo
            script.
          </p>
        </div>
        <Button
          onClick={simmer}
          disabled={loading || !dishName.trim()}
          className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Simmering…
            </>
          ) : (
            <>
              <Flame className="h-4 w-4" />
              Simmer This Recipe
            </>
          )}
        </Button>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-400">{error}</p>
      )}

      {result && (
        <div className="mt-6 animate-fade-in space-y-5 border-t border-kitchen-border pt-6">
          <div className="flex items-center gap-2 text-sm">
            <ChefHat className="h-4 w-4 text-amber-400" />
            <span className="italic text-amber-200/90">{result.chefNote}</span>
            {result.mock && (
              <span className="rounded-full bg-kitchen-border px-2 py-0.5 text-xs text-kitchen-muted">
                mock chef
              </span>
            )}
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-kitchen-muted">
              Ship these features
            </p>
            <ul className="space-y-2">
              {result.features.map((f, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-sm text-zinc-300"
                >
                  <span className="text-orange-400">{i + 1}.</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-kitchen-muted">
              Edit these files
            </p>
            <ul className="space-y-1 font-mono text-xs text-violet-300">
              {result.files.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-amber-400">
              Demo script
            </p>
            <p className="text-sm text-zinc-200">{result.demoScript}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
