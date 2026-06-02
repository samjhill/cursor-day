"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/lib/hooks";
import { RotateCw } from "lucide-react";
import { CursorBadge } from "./cursor-badge";
import { DEFAULT_SEGMENTS, STORAGE_KEY } from "./constants";
import { SegmentEditor } from "./segment-editor";
import { easeOutCubic, segmentAtRotation, targetRotationForSegment } from "./spin-math";
import type { WheelSegment } from "./types";
import { WheelCanvas } from "./wheel-canvas";
import { WinnerModal } from "./winner-modal";

const SPIN_DURATION_MS = 4200;

export function DecisionWheelWidget() {
  const [segments, setSegments] = useLocalStorage<WheelSegment[]>(
    STORAGE_KEY,
    DEFAULT_SEGMENTS
  );
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const frameRef = useRef<number | null>(null);

  const spin = useCallback(() => {
    if (spinning || segments.length < 2) return;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const winnerIndex = Math.floor(Math.random() * segments.length);
    const startRotation = rotation;
    const endRotation = startRotation + targetRotationForSegment(winnerIndex, segments.length);
    const startTime = performance.now();

    setSpinning(true);
    setWinner(null);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / SPIN_DURATION_MS, 1);
      const eased = easeOutCubic(t);
      const current = startRotation + (endRotation - startRotation) * eased;
      setRotation(current);

      if (t < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setSpinning(false);
        const landed = segmentAtRotation(endRotation, segments.length);
        setWinner(segments[landed]);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [rotation, segments, spinning]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        spin();
      }
    },
    [spin]
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6" onKeyDown={handleKeyDown}>
      <header className="mb-8 text-center">
        <p className="text-4xl sm:text-5xl">🎡</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl gradient-text">
          Feature Decision Wheel
        </h1>
        <p className="mt-2 text-lg text-zinc-400">
          Can&apos;t pick a scope? Let the wheel decide — live on stage.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-start">
        <div className="flex flex-col items-center">
          <div
            className={`relative transition-transform ${spinning ? "scale-[1.02]" : "scale-100"}`}
          >
            <WheelCanvas segments={segments} rotation={rotation} spinning={spinning} />
          </div>

          <Button
            size="lg"
            onClick={spin}
            disabled={spinning}
            className="mt-8 min-h-[56px] min-w-[200px] text-lg font-bold tracking-wide"
          >
            <RotateCw className={`h-5 w-5 ${spinning ? "animate-spin" : ""}`} />
            {spinning ? "Spinning…" : "SPIN!"}
          </Button>
          <p className="mt-3 text-xs text-zinc-500">
            Press <kbd className="rounded border border-kitchen-border px-1.5 py-0.5 font-mono">Space</kbd> to spin
          </p>
        </div>

        <SegmentEditor segments={segments} onChange={setSegments} disabled={spinning} />
      </div>

      {winner && (
        <WinnerModal
          winner={winner}
          onClose={() => setWinner(null)}
          onSpinAgain={() => {
            setWinner(null);
            spin();
          }}
        />
      )}

      <CursorBadge />
    </div>
  );
}
