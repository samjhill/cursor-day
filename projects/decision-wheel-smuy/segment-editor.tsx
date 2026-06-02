"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { createSegment, MAX_SEGMENTS, MIN_SEGMENTS } from "./constants";
import type { WheelSegment } from "./types";

interface SegmentEditorProps {
  segments: WheelSegment[];
  onChange: (segments: WheelSegment[]) => void;
  disabled: boolean;
}

export function SegmentEditor({ segments, onChange, disabled }: SegmentEditorProps) {
  const updateLabel = (id: string, label: string) => {
    onChange(segments.map((s) => (s.id === id ? { ...s, label } : s)));
  };

  const addSegment = () => {
    if (segments.length >= MAX_SEGMENTS) return;
    onChange([...segments, createSegment(`Option ${segments.length + 1}`, segments.length)]);
  };

  const removeSegment = (id: string) => {
    if (segments.length <= MIN_SEGMENTS) return;
    onChange(segments.filter((s) => s.id !== id));
  };

  return (
    <Card className="border-kitchen-border/80">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Wheel options
        </h2>
        <span className="text-xs text-zinc-500">
          {segments.length}/{MAX_SEGMENTS}
        </span>
      </div>

      <ul className="space-y-2">
        {segments.map((seg, i) => (
          <li key={seg.id} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ background: seg.color }}
              aria-hidden
            />
            <input
              type="text"
              value={seg.label}
              onChange={(e) => updateLabel(seg.id, e.target.value)}
              disabled={disabled}
              maxLength={24}
              className="min-w-0 flex-1 rounded-lg border border-kitchen-border bg-kitchen-bg px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 disabled:opacity-50"
              placeholder={`Option ${i + 1}`}
              aria-label={`Segment ${i + 1} label`}
            />
            <button
              type="button"
              onClick={() => removeSegment(seg.id)}
              disabled={disabled || segments.length <= MIN_SEGMENTS}
              className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-kitchen-bg hover:text-red-400 disabled:opacity-30"
              aria-label={`Remove ${seg.label}`}
            >
              <Minus className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>

      <Button
        variant="outline"
        size="sm"
        className="mt-4 w-full"
        onClick={addSegment}
        disabled={disabled || segments.length >= MAX_SEGMENTS}
      >
        <Plus className="h-4 w-4" />
        Add option
      </Button>
    </Card>
  );
}
