"use client";

import { useCallback, useState } from "react";
import { Dices, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DiceRow } from "@/components/dice";
import type { Spice } from "@/lib/spices";
import { rollKitchen, type RollResult } from "@/lib/randomizer";
import type { Track } from "@/lib/tracks";

interface Props {
  onRollComplete: (result: RollResult) => void;
  currentTrack?: Track;
  spice?: Spice | null;
}

export function ChefsDiceStation({ onRollComplete, currentTrack, spice }: Props) {
  const [rolling, setRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<RollResult | null>(null);
  const [diceDisplay, setDiceDisplay] = useState({
    track: 1,
    tool: 1,
    ingredientCount: 4,
    spice: 1,
  });

  const roll = useCallback(() => {
    if (rolling) return;

    const result = rollKitchen();
    setRolling(true);
    setDiceDisplay({ track: 1, tool: 1, ingredientCount: 1, spice: 1 });

    setTimeout(() => {
      setDiceDisplay(result.dice);
    }, 200);

    setTimeout(() => {
      setRolling(false);
      setLastRoll(result);
      onRollComplete(result);
    }, 1400);
  }, [rolling, onRollComplete]);

  return (
    <Card className="relative overflow-hidden border-amber-500/30 bg-gradient-to-br from-kitchen-surface via-kitchen-surface to-amber-950/20">
      <div className="pointer-events-none absolute -right-8 -top-8 text-8xl opacity-[0.07]">
        🎲
      </div>
      <div className="steam steam-1" />
      <div className="steam steam-2" />
      <div className="steam steam-3" />

      <div className="relative">
        <div className="mb-2 flex items-center gap-2 text-amber-400">
          <Dices className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Chef&apos;s Roulette
          </span>
        </div>
        <h2 className="mb-1 text-xl font-bold">Roll the Dice</h2>
        <p className="mb-6 text-sm text-zinc-400">
          Four dice: course · useful tool · ingredients · wild spice. You build
          what lands.
        </p>

        <div className="mb-6 rounded-xl border border-kitchen-border/80 bg-black/30 px-4 py-6">
          <DiceRow values={diceDisplay} rolling={rolling} />
        </div>

        <Button
          size="lg"
          onClick={roll}
          disabled={rolling}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-900/30 hover:from-amber-400 hover:to-orange-500"
        >
          <Dices className="h-5 w-5" />
          {rolling ? "Rolling…" : "🎲 Roll for Today's Special"}
        </Button>

        {lastRoll && !rolling && (
          <div className="mt-6 animate-fade-in space-y-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm italic text-amber-200/90">
              &ldquo;{lastRoll.chefQuote}&rdquo;
            </p>
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
              <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
                Build this
              </p>
              <p className="mt-1 font-semibold text-zinc-100">
                {lastRoll.tool.emoji} {lastRoll.tool.name}
              </p>
              <p className="mt-1 text-sm text-zinc-400">{lastRoll.tool.tagline}</p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-violet-500/20 px-3 py-1 text-violet-200">
                {lastRoll.track.emoji} {lastRoll.track.name}
              </span>
              <span className="rounded-full bg-amber-500/20 px-3 py-1 text-amber-200">
                {lastRoll.spice.emoji} {lastRoll.spice.name}
              </span>
              <span className="rounded-full bg-kitchen-border px-3 py-1 text-zinc-300">
                {lastRoll.ingredients.length} ingredients
              </span>
            </div>
          </div>
        )}

        {!lastRoll && currentTrack && (
          <p className="mt-4 flex items-center gap-2 text-xs text-kitchen-muted">
            <UtensilsCrossed className="h-3.5 w-3.5" />
            Current course: {currentTrack.emoji} {currentTrack.name}
            {spice && ` · ${spice.emoji} ${spice.name}`}
          </p>
        )}
      </div>
    </Card>
  );
}

export type { RollResult };
