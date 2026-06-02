"use client";

import { Suspense, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, RotateCcw, Soup } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IngredientPicker } from "@/components/ingredient-picker";
import { RecipePreview } from "@/components/recipe-preview";
import {
  ChefsDiceStation,
  type RollResult,
} from "@/components/chefs-dice-station";
import { TRACKS, getTrackById, type TrackId } from "@/lib/tracks";
import {
  INGREDIENTS,
  type Ingredient,
  buildRecipeFromIngredients,
  DEFAULT_INGREDIENTS,
} from "@/lib/ingredients";
import type { Spice } from "@/lib/spices";
import type { ToolIdea } from "@/lib/tool-ideas";
import { useLocalStorage } from "@/lib/hooks";
import { recordRoll } from "@/lib/kitchen-stats";
import { SimmerPanel } from "@/components/simmer-panel";

function KitchenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackParam = searchParams.get("track") as TrackId | null;
  const track = getTrackById(trackParam);

  const [selected, setSelected] = useLocalStorage<Ingredient[]>(
    "pk-ingredients",
    DEFAULT_INGREDIENTS
  );
  const [projectName, setProjectName] = useLocalStorage(
    "pk-project-name",
    "My Cursor Creation"
  );
  const [pitch, setPitch] = useLocalStorage(
    "pk-pitch",
    "Built in 2.5 hours with Cursor at NYC Tech Week."
  );
  const [spice, setSpice] = useLocalStorage<Spice | null>("pk-spice", null);
  const [dishName, setDishName] = useLocalStorage<string | null>(
    "pk-dish-name",
    null
  );
  const [tool, setTool] = useLocalStorage<ToolIdea | null>("pk-tool", null);
  const [, setTrackId] = useLocalStorage<TrackId>("pk-track", "ai-tool");

  useEffect(() => {
    if (trackParam) setTrackId(trackParam);
  }, [trackParam, setTrackId]);

  const recipe = buildRecipeFromIngredients(
    selected,
    track,
    spice,
    dishName ?? undefined,
    tool
  );

  const handleRollComplete = useCallback(
    (result: RollResult) => {
      setSelected(result.ingredients);
      setSpice(result.spice);
      setTool(result.tool);
      setProjectName(result.tool.name);
      setDishName(result.tool.name);
      setPitch(result.pitch);
      setTrackId(result.track.id);
      recordRoll(
        result.spice.id,
        result.ingredients.map((i) => i.id)
      );
      router.replace(`/kitchen?track=${result.track.id}`);
    },
    [setSelected, setSpice, setTool, setProjectName, setDishName, setPitch, setTrackId, router]
  );

  const reset = () => {
    setSelected(DEFAULT_INGREDIENTS);
    setProjectName("My Cursor Creation");
    setPitch("Built in 2.5 hours with Cursor at NYC Tech Week.");
    setSpice(null);
    setDishName(null);
    setTool(null);
    router.replace("/kitchen");
  };

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-kitchen-warm">
            🍳 Service starts at 12:00 · Course: {track.emoji} {track.name}
          </p>
          <h1 className="text-3xl font-bold">The Kitchen</h1>
          <p className="mt-1 text-zinc-400">
            Roll the dice · gather ingredients · let Cursor cook
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Clear the Pass
        </Button>
      </div>

      {/* Dice station — hero of the kitchen */}
      <div className="mb-8">
        <ChefsDiceStation
          onRollComplete={handleRollComplete}
          currentTrack={track}
          spice={spice}
        />
      </div>

      <div className="mb-8">
        <SimmerPanel
          dishName={projectName}
          pitch={pitch}
          track={track}
          ingredients={selected}
          spice={spice}
          tool={tool}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <label className="text-sm text-kitchen-muted">Dish name</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-2 w-full rounded-lg border border-kitchen-border bg-kitchen-bg px-4 py-2.5 text-lg font-semibold outline-none focus:border-amber-500"
              placeholder="Chef's Surprise Soufflé"
            />
          </Card>

          <Card>
            <label className="text-sm text-kitchen-muted">
              Ticket description (your show & tell pitch)
            </label>
            <textarea
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              rows={2}
              className="mt-2 w-full resize-none rounded-lg border border-kitchen-border bg-kitchen-bg px-4 py-2.5 outline-none focus:border-amber-500"
            />
          </Card>

          {tool && (
            <Card className="border-emerald-500/40 bg-emerald-500/5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{tool.emoji}</span>
                <div>
                  <p className="font-semibold text-emerald-300">
                    Build: {tool.name}
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">{tool.description}</p>
                  <p className="mt-2 text-xs text-emerald-400/80">
                    Demo: {tool.demoHook}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {spice && (
            <Card className="border-orange-500/40 bg-orange-500/5">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{spice.emoji}</span>
                <div>
                  <p className="font-semibold text-orange-300">
                    Wild Spice: {spice.name}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    {spice.constraint}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card>
            <h2 className="mb-1 flex items-center gap-2 font-semibold">
              <Soup className="h-4 w-4 text-kitchen-warm" />
              Ingredient Board
            </h2>
            <p className="mb-4 text-xs text-kitchen-muted">
              Tap to add or remove · or let the dice decide
            </p>
            <IngredientPicker
              ingredients={INGREDIENTS}
              selected={selected}
              onToggle={(ingredient) => {
                setSelected((prev) => {
                  const exists = prev.find((i) => i.id === ingredient.id);
                  if (exists)
                    return prev.filter((i) => i.id !== ingredient.id);
                  return [...prev, ingredient];
                });
              }}
            />
          </Card>

          <Card className="border-violet-500/30 bg-violet-500/5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
              <div>
                <p className="font-medium text-violet-300">Recipe Card Ready</p>
                <p className="mt-1 text-sm text-zinc-400">
                  Open in Cursor from the recipe ticket — review and send in
                  Agent.
                </p>
              </div>
            </div>
          </Card>
        </div>

        <RecipePreview
          recipe={recipe}
          projectName={projectName}
          pitch={pitch}
          track={track}
          spice={spice}
          tool={tool}
        />
      </div>

      <section className="mt-12">
        <h2 className="mb-4 text-sm font-medium text-kitchen-muted">
          Switch course manually
        </h2>
        <div className="flex flex-wrap gap-2">
          {TRACKS.map((t) => (
            <a
              key={t.id}
              href={`/kitchen?track=${t.id}`}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                t.id === track.id
                  ? "border-amber-500 bg-amber-500/10 text-amber-300"
                  : "border-kitchen-border text-zinc-400 hover:border-zinc-600"
              }`}
            >
              {t.emoji} {t.name}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function KitchenPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-zinc-400">
          Firing up the kitchen…
        </div>
      }
    >
      <KitchenContent />
    </Suspense>
  );
}
