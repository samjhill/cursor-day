"use client";

import { useCallback, useMemo, useState } from "react";
import { ExternalLink, CheckCircle2, ClipboardList, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Recipe } from "@/lib/ingredients";
import type { Track } from "@/lib/tracks";
import type { Spice } from "@/lib/spices";
import type { ToolIdea } from "@/lib/tool-ideas";
import type { BuildWorkspace } from "@/lib/build-workspace";
import { buildCursorPromptLinks } from "@/lib/cursor-deeplink";

interface Props {
  recipe: Recipe;
  projectName: string;
  pitch: string;
  track: Track;
  spice?: Spice | null;
  tool?: ToolIdea | null;
  workspace?: BuildWorkspace | null;
}

export function RecipePreview({
  recipe,
  projectName,
  pitch,
  track,
  spice,
  tool,
  workspace,
}: Props) {
  const links = useMemo(
    () => buildCursorPromptLinks(recipe.prompt),
    [recipe.prompt]
  );
  const [copied, setCopied] = useState(false);

  const copyFullPrompt = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(recipe.prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [recipe.prompt]);

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
            <Button type="button" size="sm" variant="outline" onClick={copyFullPrompt}>
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy prompt
                </>
              )}
            </Button>
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
          <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200/90">
            Deeplink hit Cursor&apos;s 8k URL limit — tail trimmed. Use{" "}
            <strong>Copy prompt</strong> for the full text if anything is missing.
          </div>
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
          {workspace && (
            <>
              <p className="mt-3 text-kitchen-muted">Build</p>
              <p className="font-mono text-xs text-cyan-300">{workspace.slug}</p>
              <p className="mt-1 font-mono text-xs text-cyan-400/80">
                {workspace.demoPath}
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
