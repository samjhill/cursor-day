"use client";

import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import type { WheelSegment } from "./types";

interface WinnerModalProps {
  winner: WheelSegment;
  onClose: () => void;
  onSpinAgain: () => void;
}

export function WinnerModal({ winner, onClose, onSpinAgain }: WinnerModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-[fade-in_0.3s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="winner-title"
    >
      <div className="relative w-full max-w-md animate-[fade-in_0.4s_ease-out]">
        {/* Confetti dots */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-2 w-2 rounded-full"
              style={{
                background: i % 2 === 0 ? "#7c3aed" : "#f59e0b",
                left: `${10 + (i * 7) % 80}%`,
                top: `${5 + (i * 11) % 30}%`,
                animation: `steam-rise ${1.2 + (i % 3) * 0.3}s ease-out ${i * 0.08}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="glass kitchen-glow rounded-2xl border-violet-500/30 p-8 text-center">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-zinc-400 transition-colors hover:bg-kitchen-surface hover:text-zinc-100"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <Sparkles className="mx-auto h-10 w-10 text-amber-400" />
          <p className="mt-3 text-sm font-medium uppercase tracking-widest text-violet-400">
            You&apos;re building
          </p>
          <h2 id="winner-title" className="mt-2 text-4xl font-bold gradient-text">
            {winner.label}
          </h2>
          <p className="mt-4 text-zinc-400">
            The wheel has spoken. Ship it before show &amp; tell!
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={onSpinAgain} className="min-w-[140px]">
              Spin again
            </Button>
            <Button size="lg" variant="outline" onClick={onClose}>
              Let&apos;s cook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
