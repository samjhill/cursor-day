"use client";

import { useState } from "react";
import { Loader2, UtensilsCrossed, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { PlateResponse } from "@/lib/cook-types";
import type { Ingredient } from "@/lib/ingredients";
import type { Spice } from "@/lib/spices";
import type { TrackId } from "@/lib/tracks";
import { recordPlate } from "@/lib/kitchen-stats";
import { callCook } from "@/lib/cook-client";

interface Props {
  dishName: string;
  trackId: TrackId;
  ingredients: Ingredient[];
  spice: Spice | null;
}

export function AiPlater({ dishName, trackId, ingredients, spice }: Props) {
  const [input, setInput] = useState(
    "A tool that turns chaotic hackathon ideas into a 30-second demo script"
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlateResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const plate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const data = await callCook({
        action: "plate",
        input,
        dishName,
        trackId,
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
      setResult(data as PlateResponse);
      recordPlate();
    } finally {
      setLoading(false);
    }
  };

  const copyOutput = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border-violet-500/30 bg-violet-500/5">
      <div className="mb-4 flex items-center gap-2">
        <UtensilsCrossed className="h-5 w-5 text-violet-400" />
        <h2 className="text-lg font-semibold">Plate Your Idea</h2>
      </div>
      <p className="mb-4 text-sm text-zinc-400">
        Describe your raw idea — the kitchen transforms it into a build plan.
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        className="mb-4 w-full resize-none rounded-lg border border-kitchen-border bg-kitchen-bg px-4 py-3 text-sm outline-none focus:border-violet-500"
        placeholder="What's on the order ticket?"
      />

      <Button
        onClick={plate}
        disabled={loading || !input.trim()}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Plating…
          </>
        ) : (
          <>🍽️ Plate It</>
        )}
      </Button>

      {result && (
        <div className="mt-6 animate-fade-in">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-violet-300">
              {result.garnish}
            </p>
            <div className="flex items-center gap-2">
              {result.mock && (
                <span className="text-xs text-kitchen-muted">mock chef</span>
              )}
              <Button variant="ghost" size="sm" onClick={copyOutput}>
                {copied ? (
                  <Check className="h-4 w-4 text-kitchen-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-xl border border-violet-500/20 bg-black/40 p-5 text-sm leading-relaxed text-zinc-300">
            {result.output}
          </pre>
        </div>
      )}
    </Card>
  );
}
