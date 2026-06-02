"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHEF_LINES = [
  "Ship code, tap done, watch the streak climb — built with Cursor.",
  "Every habit tracked in localStorage. Every line written by Agent.",
  "7-day heat grid, live flame animation — seasoned with ⌘K.",
  "The streak doesn't lie. Neither does the Cursor stamp.",
];

interface CursorBadgeProps {
  unlockSignal?: number;
}

export function CursorBadge({ unlockSignal = 0 }: CursorBadgeProps) {
  const [open, setOpen] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [wiggle, setWiggle] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reveal = useCallback(() => {
    setLineIndex(Math.floor(Math.random() * CHEF_LINES.length));
    setOpen(true);
    setWiggle(true);
    window.setTimeout(() => setWiggle(false), 600);
  }, []);

  useEffect(() => {
    if (unlockSignal > 0) reveal();
  }, [unlockSignal, reveal]);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 500);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      reveal();
    }
  };

  return (
    <>
      {/* Subtle watermark — hover to reveal */}
      <button
        type="button"
        onClick={handleLogoClick}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-1.5 rounded-lg px-2 py-1 text-zinc-600 opacity-30 transition-all hover:opacity-80 hover:text-violet-400"
        aria-label="Cursor watermark — triple-click to unlock"
        title="◆ Built with Cursor"
      >
        <span className="text-sm font-bold">◆</span>
        <span className="text-[10px] uppercase tracking-widest">Cursor</span>
      </button>

      <button
        type="button"
        onClick={reveal}
        className={`group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/20 bg-kitchen-surface/90 text-2xl shadow-lg shadow-violet-500/10 backdrop-blur transition-all hover:scale-110 hover:border-violet-500/50 hover:shadow-violet-500/25 ${wiggle ? "animate-[dice-shake_0.4s_ease-in-out]" : ""}`}
        aria-label="Secret spice jar — built with Cursor"
        title="What's in the jar?"
      >
        <span className="transition-transform group-hover:rotate-12">🫙</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-[fade-in_0.25s_ease-out]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cursor-spice-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-sm animate-[fade-in_0.35s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass kitchen-glow rounded-2xl border-violet-500/40 p-8 text-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 transition-colors hover:bg-kitchen-surface hover:text-zinc-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-3xl">
                ◆
              </div>
              <Sparkles className="mx-auto mt-4 h-8 w-8 text-amber-400" />
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-amber-400/90">
                Wild spice unlocked
              </p>
              <h2 id="cursor-spice-title" className="mt-2 text-3xl font-bold gradient-text">
                Built with Cursor
              </h2>
              <p className="mt-4 text-zinc-400 italic">&ldquo;{CHEF_LINES[lineIndex]}&rdquo;</p>
              <p className="mt-2 text-xs text-zinc-500">
                Pro tip: triple-click the ◆ watermark or tap the spice jar.
              </p>

              <Button size="lg" className="mt-6 min-w-[160px]" onClick={() => setOpen(false)}>
                Keep the streak alive
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
