import type { KitchenStats } from "./cook-types";
import { DEFAULT_STATS, STATS_KEY } from "./cook-types";

export function readStats(): KitchenStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return DEFAULT_STATS;
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

export function writeStats(stats: KitchenStats) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  window.dispatchEvent(new CustomEvent("pk-stats-updated"));
}

export function recordRoll(spiceId?: string, ingredientIds?: string[]) {
  const stats = readStats();
  stats.rolls += 1;
  stats.lastRollAt = new Date().toISOString();
  if (spiceId) {
    stats.spiceCounts[spiceId] = (stats.spiceCounts[spiceId] ?? 0) + 1;
  }
  for (const id of ingredientIds ?? []) {
    stats.ingredientCounts[id] = (stats.ingredientCounts[id] ?? 0) + 1;
  }
  writeStats(stats);
}

export function recordSimmer() {
  const stats = readStats();
  stats.simmers += 1;
  writeStats(stats);
}

export function recordPlate() {
  const stats = readStats();
  stats.plates += 1;
  writeStats(stats);
}

export function topEntries(counts: Record<string, number>, limit = 5) {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}
