import type { WheelSegment } from "./types";

export const STORAGE_KEY = "decision-wheel-smuy-segments";
export const MIN_SEGMENTS = 4;
export const MAX_SEGMENTS = 8;

export const SEGMENT_COLORS = [
  "#7c3aed",
  "#f59e0b",
  "#6366f1",
  "#ea580c",
  "#8b5cf6",
  "#d97706",
  "#a855f7",
  "#fb923c",
];

export const DEFAULT_SEGMENTS: WheelSegment[] = [
  { id: "1", label: "Dark mode", color: SEGMENT_COLORS[0] },
  { id: "2", label: "AI summaries", color: SEGMENT_COLORS[1] },
  { id: "3", label: "Real-time sync", color: SEGMENT_COLORS[2] },
  { id: "4", label: "Export PDF", color: SEGMENT_COLORS[3] },
  { id: "5", label: "Keyboard shortcuts", color: SEGMENT_COLORS[4] },
  { id: "6", label: "Push notifications", color: SEGMENT_COLORS[5] },
];

export function createSegment(label: string, index: number): WheelSegment {
  return {
    id: crypto.randomUUID(),
    label,
    color: SEGMENT_COLORS[index % SEGMENT_COLORS.length],
  };
}
