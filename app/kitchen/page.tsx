"use client";

import { Suspense, useCallback, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  RotateCcw,
  Soup,
  ArrowLeft,
  ArrowRight,
  Presentation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IngredientPicker } from "@/components/ingredient-picker";
import { RecipePreview } from "@/components/recipe-preview";
import {
  ChefsDiceStation,
  type RollResult,
} from "@/components/chefs-dice-station";
import {
  KitchenStepNav,
  KITCHEN_STEP_KEY,
  type KitchenStep,
} from "@/components/kitchen-step-nav";
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
import { BuildWorkspaceCard } from "@/components/build-workspace-card";
import {
  type BuildWorkspace,
  WORKSPACE_KEY,
  registerWorkspaceHistory,
} from "@/lib/build-workspace";

function KitchenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackParam = searchParams.get("track") as TrackId | null;
  const track = getTrackById(trackParam);

  const [step, setStep] = useLocalStorage<KitchenStep>(KITCHEN_STEP_KEY, 0);
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
  const [workspace, setWorkspace] = useLocalStorage<BuildWorkspace | null>(
    WORKSPACE_KEY,
    null
  );
  const [, setTrackId] = useLocalStorage<TrackId>("pk-track", "ai-tool");

  const maxReached = useMemo<KitchenStep>(() => {
    if (!workspace) return 0;
    return 3;
  }, [workspace]);

  useEffect(() => {
    if (trackParam) setTrackId(trackParam);
  }, [trackParam, setTrackId]);

  useEffect(() => {
    if (!workspace && step > 0) setStep(0);
  }, [workspace, step, setStep]);

  const recipe = buildRecipeFromIngredients(
    selected,
    track,
    spice,
    dishName ?? undefined,
    tool,
    workspace
  );

  const handleRollComplete = useCallback(
    (result: RollResult) => {
      setSelected(result.ingredients);
      setSpice(result.spice);
      setTool(result.tool);
      setWorkspace(result.workspace);
      registerWorkspaceHistory(result.workspace);
      setProjectName(result.tool.name);
      setDishName(result.tool.name);
      setPitch(result.pitch);
      setTrackId(result.track.id);
      recordRoll(
        result.spice.id,
        result.ingredients.map((i) => i.id)
      );
      router.replace(`/kitchen?track=${result.track.id}`);
      setStep(1);
    },
    [
      setSelected,
      setSpice,
      setTool,
      setWorkspace,
      setProjectName,
      setDishName,
      setPitch,
      setTrackId,
      router,
      setStep,
    ]
  );

  const reset = () => {
    setSelected(DEFAULT_INGREDIENTS);
    setProjectName("My Cursor Creation");
    setPitch("Built in 2.5 hours with Cursor at NYC Tech Week.");
    setSpice(null);
    setDishName(null);
    setTool(null);
    setWorkspace(null);
    setStep(0);
    if (typeof window !== "undefined") {
      localStorage.removeItem("pk-simmer");
    }
    router.replace("/kitchen");
  };

  const goNext = () => {
    if (step < 3) setStep((step + 1) as KitchenStep);
  };

  const goBack = () => {
    if (step > 0) setStep((step - 1) as KitchenStep);
  };

  const canContinue =
    step === 0
      ? !!workspace
      : step === 1
        ? projectName.trim().length > 0
        : true;

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-kitchen-warm">
            🍳 Service starts at 12:00 · Course: {track.emoji} {track.name}
          </p>
          <h1 className="text-3xl font-bold">The Kitchen</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Clear the Pass
        </Button>
      </div>

      <KitchenStepNav
        step={step}
        maxReached={maxReached}
        onStepClick={setStep}
      />

      <div className="animate-fade-in">
        {step === 0 && (
          <div className="space-y-6">
            <ChefsDiceStation
              onRollComplete={handleRollComplete}
              currentTrack={track}
              spice={spice}
            />
            <p className="text-center text-sm text-zinc-500">
              Roll to reveal today&apos;s special — then you&apos;ll gather
              ingredients.
            </p>
          </div>
        )}

        {step === 1 && workspace && (
          <div className="space-y-6">
            {tool && (
              <Card className="border-emerald-500/40 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tool.emoji}</span>
                  <div>
                    <p className="font-semibold text-emerald-300">
                      Build: {tool.name}
                    </p>
                    <p className="mt-1 text-sm text-zinc-300">
                      {tool.description}
                    </p>
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

            <BuildWorkspaceCard workspace={workspace} />

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

            <Card>
              <h2 className="mb-1 flex items-center gap-2 font-semibold">
                <Soup className="h-4 w-4 text-kitchen-warm" />
                Ingredient Board
              </h2>
              <p className="mb-4 text-xs text-kitchen-muted">
                Tap to add or remove · dice picks the starting set
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

            <details className="rounded-xl border border-kitchen-border bg-kitchen-surface/30 px-4 py-3">
              <summary className="cursor-pointer text-sm text-kitchen-muted">
                Switch course manually
              </summary>
              <div className="mt-3 flex flex-wrap gap-2">
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
            </details>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">
              Turn your recipe into a build plan — features, files, and a demo
              script.
            </p>
            <SimmerPanel
              dishName={projectName}
              pitch={pitch}
              track={track}
              ingredients={selected}
              spice={spice}
              tool={tool}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Card className="border-violet-500/30 bg-violet-500/5">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
                <div>
                  <p className="font-medium text-violet-300">
                    Recipe ticket ready
                  </p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Open in Cursor, review the prompt, and send in Agent.
                  </p>
                </div>
              </div>
            </Card>
            <RecipePreview
              recipe={recipe}
              projectName={projectName}
              pitch={pitch}
              track={track}
              spice={spice}
              tool={tool}
              workspace={workspace}
            />
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4 border-t border-kitchen-border pt-6">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={step === 0}
          className={step === 0 ? "invisible" : ""}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        {step < 3 ? (
          <Button onClick={goNext} disabled={!canContinue}>
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Link href="/present">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500">
              <Presentation className="h-4 w-4" />
              Go to Show & Tell
            </Button>
          </Link>
        )}
      </div>
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
