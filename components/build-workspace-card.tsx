"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { BuildWorkspace } from "@/lib/build-workspace";

interface Props {
  workspace: BuildWorkspace | null;
}

export function BuildWorkspaceCard({ workspace }: Props) {
  const [copied, setCopied] = useState<string | null>(null);

  if (!workspace) {
    return (
      <Card className="border-kitchen-border bg-kitchen-surface/50">
        <p className="text-sm text-zinc-400">
          Roll the dice to get an isolated build folder — each project lands in
          its own station so nothing gets overwritten.
        </p>
      </Card>
    );
  }

  const copy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const rows = [
    { key: "slug", label: "Slug", value: workspace.slug },
    { key: "page", label: "Page file", value: workspace.pageFile },
    { key: "dir", label: "Projects dir", value: workspace.projectsDir },
    { key: "api", label: "API (optional)", value: workspace.apiFile },
  ];

  return (
    <Card className="border-cyan-500/30 bg-cyan-950/10">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-5 w-5 text-cyan-400" />
          <div>
            <p className="font-semibold text-cyan-200">Isolated workspace</p>
            <p className="text-xs text-kitchen-muted">
              Cursor should only edit files below
            </p>
          </div>
        </div>
        <Link href={workspace.demoPath}>
          <Button size="sm" variant="outline">
            <ExternalLink className="h-4 w-4" />
            Open demo route
          </Button>
        </Link>
      </div>

      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.key}
            className="flex items-center justify-between gap-2 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs"
          >
            <span className="text-kitchen-muted">{row.label}</span>
            <span className="truncate text-zinc-200">{row.value}</span>
            <button
              type="button"
              onClick={() => copy(row.value, row.key)}
              className="shrink-0 text-kitchen-muted hover:text-zinc-200"
              aria-label={`Copy ${row.label}`}
            >
              {copied === row.key ? (
                <Check className="h-3.5 w-3.5 text-kitchen-success" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-cyan-400/80">
        Demo at{" "}
        <Link href={workspace.demoPath} className="underline hover:text-cyan-300">
          {workspace.demoPath}
        </Link>{" "}
        — previous rolls keep their own folders under <code>app/build/</code>
      </p>
    </Card>
  );
}
