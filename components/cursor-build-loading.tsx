"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_LINES = [
  "Opening Cursor…",
  "Agent is reading your recipe…",
  "Chopping components…",
  "Simmering the build…",
  "Plating your demo…",
];

interface Props {
  slug: string;
  demoPath: string;
  projectName: string;
  onCancel: () => void;
}

export function CursorBuildLoading({ slug, demoPath, projectName, onCancel }: Props) {
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLineIndex((i) => (i + 1) % STATUS_LINES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-kitchen-bg/95 p-6 backdrop-blur-md animate-[fade-in_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cursor-build-loading-title"
    >
      <div className="relative glass kitchen-glow w-full max-w-md rounded-2xl border-violet-500/30 p-8 text-center">
        <button
          type="button"
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-kitchen-surface hover:text-zinc-200"
          aria-label="Cancel and stay on kitchen"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-violet-500/40 bg-violet-500/10">
            <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
          </div>
        </div>

        <Sparkles className="mx-auto mt-6 h-6 w-6 text-amber-400" />
        <h2 id="cursor-build-loading-title" className="mt-3 text-2xl font-bold gradient-text">
          Cooking in Cursor
        </h2>
        <p className="mt-2 text-zinc-300">{projectName}</p>

        <p
          key={lineIndex}
          className="mt-6 min-h-[1.5rem] text-sm text-violet-300 animate-[fade-in_0.4s_ease-out]"
        >
          {STATUS_LINES[lineIndex]}
        </p>

        <p className="mt-4 font-mono text-xs text-zinc-500">{slug}</p>
        <p className="mt-1 text-xs text-zinc-500">
          We&apos;ll open <span className="text-cyan-400">{demoPath}</span> when Agent finishes.
        </p>

        <Button variant="outline" size="sm" className="mt-8" onClick={onCancel}>
          Stay on kitchen
        </Button>
      </div>
    </div>
  );
}
