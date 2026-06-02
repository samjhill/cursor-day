"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/lib/hooks";
import {
  REELS,
  buildPrompt,
  rollSlot,
  type ReelId,
  type SlotResult,
} from "@/lib/slot-data";

const SPIN_DURATION = 2000;
const STAGGER_MS = 500;
const ITEM_HEIGHT = 72;

type ReelState = "idle" | "spinning" | "stopped";

interface ReelProps {
  reelId: ReelId;
  label: string;
  emoji: string;
  items: string[];
  target: string;
  state: ReelState;
  stopDelay: number;
}

function shuffleWithTarget(items: string[], target: string): string[] {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  const without = shuffled.filter((i) => i !== target);
  return [...without.slice(0, 10), target];
}

function ReelColumn({
  label,
  emoji,
  items,
  target,
  state,
  stopDelay,
}: ReelProps) {
  const [spinItems, setSpinItems] = useState<string[]>([target]);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState("none");
  const reelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state === "idle") {
      setSpinItems([target]);
      setOffset(0);
      setTransition("none");
      return;
    }

    if (state !== "spinning") return;

    const list = shuffleWithTarget(items, target);
    setSpinItems(list);
    setOffset(0);
    setTransition("none");

    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition(
          `transform ${SPIN_DURATION + stopDelay}ms cubic-bezier(0.12, 0.85, 0.22, 1)`
        );
        setOffset(-(list.length - 1) * ITEM_HEIGHT);
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [state, target, items, stopDelay]);

  const displayList = state === "idle" ? [target] : spinItems;

  return (
    <div className="flex flex-1 flex-col items-center">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-violet-400">
        {emoji} {label}
      </p>
      <div className="slot-window relative w-full overflow-hidden rounded-lg border-2 border-violet-500/40 bg-black/60 shadow-inner shadow-violet-500/10">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-gradient-to-b from-black/90 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6 bg-gradient-to-t from-black/90 to-transparent" />
        <div
          ref={reelRef}
          className={`slot-reel ${state === "stopped" ? "slot-reel-landed" : ""}`}
          style={{
            transform: `translateY(${offset}px)`,
            transition,
          }}
        >
          {displayList.map((item, i) => (
            <div
              key={`${item}-${i}`}
              className="slot-item flex items-center justify-center px-2 text-center text-sm font-semibold leading-tight text-zinc-100 md:text-base"
              style={{ height: ITEM_HEIGHT }}
            >
              {item}
            </div>
          ))}
        </div>
        <div
          className={`pointer-events-none absolute inset-x-1 top-1/2 z-20 -translate-y-1/2 rounded border border-violet-400/40 bg-violet-500/5 ${
            state === "stopped" ? "slot-win-pulse" : ""
          }`}
          style={{ height: ITEM_HEIGHT }}
        />
      </div>
    </div>
  );
}

interface ExperienceProps {
  showEasterEgg?: boolean;
}

export function Experience({ showEasterEgg = true }: ExperienceProps) {
  const [lastResult, setLastResult] = useLocalStorage<SlotResult | null>(
    "pk-slot-result",
    null
  );
  const [spinCount, setSpinCount] = useLocalStorage("pk-slot-spins", 0);
  const [result, setResult] = useState<SlotResult>(
    lastResult ?? {
      audience: REELS[0].items[0],
      feature: REELS[1].items[0],
      twist: REELS[2].items[0],
    }
  );
  const [reelStates, setReelStates] = useState<ReelState[]>([
    "idle",
    "idle",
    "idle",
  ]);
  const [spinning, setSpinning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [enhanced, setEnhanced] = useState<string | null>(null);
  const [enhancing, setEnhancing] = useState(false);
  const [leverPulled, setLeverPulled] = useState(false);
  const [showCursorBadge, setShowCursorBadge] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const prompt = buildPrompt(result);
  const allStopped = reelStates.every((s) => s === "stopped" || s === "idle");
  const showResult = allStopped && !spinning;

  const pullLever = useCallback(() => {
    if (spinning) return;

    const next = rollSlot(result);
    setResult(next);
    setSpinning(true);
    setLeverPulled(true);
    setEnhanced(null);
    setCopied(false);
    setReelStates(["spinning", "spinning", "spinning"]);

    setTimeout(() => setReelStates((s) => ["stopped", s[1], s[2]]), SPIN_DURATION);
    setTimeout(
      () => setReelStates((s) => ["stopped", "stopped", s[2]]),
      SPIN_DURATION + STAGGER_MS
    );
    setTimeout(() => {
      setReelStates(["stopped", "stopped", "stopped"]);
      setSpinning(false);
      setLastResult(next);
      setSpinCount((c) => c + 1);
    }, SPIN_DURATION + STAGGER_MS * 2 + 150);

    setTimeout(() => setLeverPulled(false), 550);
  }, [spinning, result, setLastResult, setSpinCount]);

  const copyPrompt = async () => {
    const text = enhanced ?? prompt;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };

  const enhancePrompt = async () => {
    setEnhancing(true);
    try {
      const res = await fetch("/api/slot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "enhance", result }),
      });
      const data = await res.json();
      setEnhanced(data.enhanced ?? prompt);
    } catch {
      setEnhanced(null);
    } finally {
      setEnhancing(false);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault();
        pullLever();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pullLever]);

  return (
    <div className="relative">
      <Card className="relative overflow-hidden border-2 border-violet-500/30 bg-gradient-to-br from-kitchen-surface via-kitchen-surface to-violet-950/30">
        <div className="pointer-events-none absolute -right-6 -top-6 text-8xl opacity-[0.06]">
          🎰
        </div>

        <div className="relative mb-6 text-center">
          <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-violet-400">
            🎰 Prompt Slot Machine
          </p>
          <h2 className="text-2xl font-bold md:text-3xl">
            Pull the lever. Ship the prompt.
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Built live with Cursor Agent at NYC Cook with Cursor Day
          </p>
        </div>

        <div className="mb-8 flex gap-2 md:gap-4">
          {REELS.map((reel, i) => (
            <ReelColumn
              key={reel.id}
              reelId={reel.id}
              label={reel.label}
              emoji={reel.emoji}
              items={reel.items}
              target={
                reel.id === "audience"
                  ? result.audience
                  : reel.id === "feature"
                    ? result.feature
                    : result.twist
              }
              state={reelStates[i]}
              stopDelay={i * STAGGER_MS}
            />
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={pullLever}
            disabled={spinning}
            className={`slot-lever group relative flex flex-col items-center gap-1 transition-transform disabled:opacity-50 ${
              leverPulled ? "slot-lever-pulled" : ""
            }`}
            aria-label="Pull lever to spin"
          >
            <div className="h-16 w-3 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-lg" />
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-500/60 bg-gradient-to-br from-amber-400 to-orange-600 shadow-lg shadow-amber-900/40 transition group-hover:scale-105 group-active:scale-95">
              <span className="text-3xl">{spinning ? "✨" : "🎰"}</span>
            </div>
            <span className="text-base font-semibold text-amber-300">
              {spinning ? "Spinning…" : "Pull Lever"}
            </span>
            <span className="text-xs text-kitchen-muted">or press Space</span>
          </button>

          {spinCount > 0 && (
            <p className="text-xs text-kitchen-muted">
              {spinCount} spin{spinCount !== 1 ? "s" : ""} served tonight
            </p>
          )}
        </div>

        {showResult && (
          <div className="mt-8 animate-fade-in space-y-4">
            <div className="rounded-xl border border-violet-500/30 bg-violet-500/5 p-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-violet-400">
                Your build prompt
              </p>
              <p className="text-lg font-medium leading-relaxed text-zinc-100 md:text-xl">
                {enhanced ?? prompt}
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" onClick={copyPrompt}>
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copy Prompt
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={enhancePrompt}
                disabled={enhancing}
              >
                {enhancing ? (
                  <>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                    Plating…
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    AI Garnish
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Card>

      {showEasterEgg && (
        <button
          type="button"
          onClick={() => setShowCursorBadge((v) => !v)}
          className="group absolute -bottom-2 right-4 text-[10px] text-zinc-600 transition hover:text-violet-400"
          aria-label="Built with Cursor easter egg"
        >
          <span className="opacity-40 group-hover:opacity-100">⌘</span>
          {showCursorBadge && (
            <span className="absolute bottom-full right-0 mb-1 whitespace-nowrap rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300 animate-fade-in">
              ✨ Built with Cursor
            </span>
          )}
        </button>
      )}
    </div>
  );
}
