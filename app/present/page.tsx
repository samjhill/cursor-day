"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrackWidget } from "@/components/widgets/track-widget";
import { useLocalStorage } from "@/lib/hooks";
import { DEFAULT_INGREDIENTS } from "@/lib/ingredients";
import { getTrackById, type TrackId } from "@/lib/tracks";
import type { Spice } from "@/lib/spices";
import type { SimmerResponse } from "@/lib/cook-types";
import { DEMO_SCRIPT } from "@/lib/demo-script";

export default function PresentPage() {
  const [projectName] = useLocalStorage("pk-project-name", "My Cursor Creation");
  const [pitch] = useLocalStorage(
    "pk-pitch",
    "Built in 2.5 hours with Cursor at NYC Tech Week."
  );
  const [ingredients] = useLocalStorage("pk-ingredients", DEFAULT_INGREDIENTS);
  const [spice] = useLocalStorage<Spice | null>("pk-spice", null);
  const [trackId] = useLocalStorage<TrackId>("pk-track", "ai-tool");
  const [simmer] = useLocalStorage<SimmerResponse | null>("pk-simmer", null);

  const track = getTrackById(trackId);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/kitchen">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Kitchen
            </Button>
          </Link>
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-medium text-red-400">
            🛎️ SERVICE · PASS
          </span>
        </div>

        <div className="text-center">
          <p className="mb-2 text-sm text-kitchen-muted">Now serving</p>
          <p className="mb-4 text-kitchen-warm">
            {track.emoji} {track.name}
            {spice && (
              <span className="text-orange-400">
                {" "}
                · {spice.emoji} {spice.name}
              </span>
            )}
          </p>
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
            {projectName}
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-xl text-zinc-400">
            {pitch}
          </p>
        </div>

        <div className="mb-12">
          <TrackWidget
            trackId={trackId}
            dishName={projectName}
            ingredients={ingredients}
            spice={spice}
          />
        </div>

        {simmer && (
          <Card className="mb-12 border-orange-500/20 bg-orange-500/5">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-orange-400">
              From simmer
            </p>
            <p className="text-sm italic text-zinc-300">{simmer.demoScript}</p>
          </Card>
        )}

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {ingredients.map((i) => (
            <span
              key={i.id}
              className="rounded-full border border-kitchen-border bg-kitchen-surface px-3 py-1 text-sm"
            >
              {i.emoji} {i.name}
            </span>
          ))}
          {spice && (
            <span className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1 text-sm text-orange-300">
              {spice.emoji} {spice.name}
            </span>
          )}
        </div>

        <Card>
          <h2 className="mb-4 font-semibold">30-Second Service Script</h2>
          <ol className="space-y-3 text-sm text-zinc-300">
            {DEMO_SCRIPT.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>

        <p className="mt-8 text-center text-xs text-kitchen-muted">
          Deploy URL: add{" "}
          <code className="text-amber-400">NEXT_PUBLIC_APP_URL</code> to .env
          and show the live link
          <ExternalLink className="ml-1 inline h-3 w-3" />
        </p>
      </div>
    </div>
  );
}
