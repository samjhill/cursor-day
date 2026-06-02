import type { TrackId } from "./tracks";

export interface CookIngredient {
  id: string;
  name: string;
  emoji: string;
}

export interface CookSpice {
  id: string;
  name: string;
  emoji: string;
  constraint: string;
}

export interface SimmerRequest {
  action: "simmer";
  dishName: string;
  pitch: string;
  trackId: TrackId;
  ingredients: CookIngredient[];
  spice?: CookSpice | null;
  toolName?: string;
  toolBrief?: string;
}

export interface PlateRequest {
  action: "plate";
  input: string;
  dishName?: string;
  trackId?: TrackId;
  ingredients?: CookIngredient[];
  spice?: CookSpice | null;
  toolName?: string;
  toolBrief?: string;
}

export type CookRequest = SimmerRequest | PlateRequest;

export interface SimmerResponse {
  action: "simmer";
  features: string[];
  files: string[];
  demoScript: string;
  chefNote: string;
  mock: boolean;
}

export interface PlateResponse {
  action: "plate";
  output: string;
  garnish: string;
  mock: boolean;
}

export type CookResponse = SimmerResponse | PlateResponse;

export interface KitchenStats {
  rolls: number;
  simmers: number;
  plates: number;
  spiceCounts: Record<string, number>;
  ingredientCounts: Record<string, number>;
  lastRollAt: string | null;
}

export const DEFAULT_STATS: KitchenStats = {
  rolls: 0,
  simmers: 0,
  plates: 0,
  spiceCounts: {},
  ingredientCounts: {},
  lastRollAt: null,
};

export const STATS_KEY = "pk-stats";
