"use client";

import { useMemo } from "react";
import { ExternalLink, CheckCircle2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Recipe } from "@/lib/ingredients";
import type { Track } from "@/lib/tracks";
import type { Spice } from "@/lib/spices";
import type { ToolIdea } from "@/lib/tool-ideas";
import { buildCursorPromptLinks } from "@/lib/cursor-deeplink";

interface Props {
  recipe: Recipe;
  projectName: string;
  pitch: string;
  track: Track;
  spice?: Spice | null;
  tool?: ToolIdea | null;
}

export function RecipePreview({
  recipe,
  projectName,
  pitch,
  track,
  spice,
  tool,
}: Props) {
  const links = useMemo(
    () => buildCursorPromptLinks(recipe.prompt),
    [recipe.prompt]
  );

  return (
    <div className="space-y-6">
      <Card className="sticky top-24 border-amber-500/20 kitchen-glow">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 font-semibold">
            <ClipboardList className="h-4 w-4 text-kitchen-warm" />
            Recipe Ticket
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {!links.urlTooLong ? (
              <a href={links.appUrl}>
                <Button size="sm">Open in Cursor</Button>
              </a>
            ) : (
              <a href={links.webUrl} target="_blank" rel="noopener noreferrer">
                <Button size="sm">Open in Cursor</Button>
              </a>
            )}
            <a
              href={links.webUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-kitchen-muted hover:text-zinc-300"
            >
              <ExternalLink className="h-3 w-3" />
              Browser link
            </a>
          </div>
        </div>

        {links.truncated && (
          <p className="mb-4 text-xs text-amber-400/90">
            Prompt trimmed for deeplink limit — full text stays in the preview
            below.
          </p>
        )}

        <div className="mb-4 rounded-lg border border-dashed border-amber-500/30 bg-kitchen-bg p-4 text-sm">
          <p className="text-kitchen-muted">Dish</p>
          <p className="font-medium">{projectName}</p>
          {tool && (
            <>
              <p className="mt-3 text-kitchen-muted">Tool</p>
              <p className="text-emerald-300">
                {tool.emoji} {tool.name}
              </p>
            </>
          )}
          <p className="mt-3 text-kitchen-muted">Ticket</p>
          <p className="text-zinc-300">{pitch}</p>
          <p className="mt-3 text-kitchen-muted">Course</p>
          <p>
            {track.emoji} {track.name}
          </p>
          {spice && (
            <>
              <p className="mt-3 text-kitchen-muted">Wild Spice</p>
              <p className="text-orange-300">
                {spice.emoji} {spice.name}
              </p>
            </>
          )}
        </div>

        <pre className="max-h-[360px] overflow-auto rounded-lg bg-black/50 p-4 font-mono text-xs leading-relaxed text-zinc-400">
          {recipe.prompt}
        </pre>
      </Card>

      <Card>
        <h3 className="mb-4 flex items-center gap-2 font-semibold">
          <CheckCircle2 className="h-4 w-4 text-kitchen-success" />
          Line Cook Checklist
        </h3>
        <ul className="space-y-2">
          {recipe.checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
              <span className="mt-0.5 text-kitchen-muted">□</span>
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-kitchen-muted">{recipe.timeBudget}</p>
      </Card>
    </div>
  );
}
