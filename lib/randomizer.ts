import type { Ingredient } from "./ingredients";
import { INGREDIENTS } from "./ingredients";
import { SPICES, type Spice, randomChefQuote } from "./spices";
import { pickToolForTrack, type ToolIdea } from "./tool-ideas";
import { TRACKS, type Track, type TrackId } from "./tracks";
import {
  createBuildWorkspace,
  createDemoBuildWorkspace,
  type BuildWorkspace,
} from "./build-workspace";
import { TOOL_IDEAS } from "./tool-ideas";

export interface RollResult {
  track: Track;
  tool: ToolIdea;
  workspace: BuildWorkspace;
  ingredients: Ingredient[];
  spice: Spice;
  dishName: string;
  chefQuote: string;
  pitch: string;
  dice: {
    track: number;
    tool: number;
    ingredientCount: number;
    spice: number;
  };
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function rollKitchen(): RollResult {
  const trackDie = Math.floor(Math.random() * 6) + 1;
  const trackIndex = (trackDie - 1) % TRACKS.length;
  const track = TRACKS[trackIndex];

  const toolDie = Math.floor(Math.random() * 6) + 1;
  const tool = pickToolForTrack(track.id, toolDie);

  const countDie = Math.floor(Math.random() * 6) + 1;
  const ingredientCount = Math.min(Math.max(countDie, 3), INGREDIENTS.length);

  const spiceDie = Math.floor(Math.random() * 6) + 1;
  const spice = SPICES[(spiceDie - 1) % SPICES.length];

  const core = INGREDIENTS.filter((i) => i.category === "core");
  const rest = shuffle(INGREDIENTS.filter((i) => i.category !== "core"));
  const picked: Ingredient[] = [];

  if (core.length > 0) picked.push(core[Math.floor(Math.random() * core.length)]);

  for (const ing of rest) {
    if (picked.length >= ingredientCount) break;
    if (!picked.find((p) => p.id === ing.id)) picked.push(ing);
  }

  if (spice.id === "tasting") {
    while (picked.length > 3) picked.pop();
    while (picked.length < 3) {
      const extra = rest.find((i) => !picked.find((p) => p.id === i.id));
      if (!extra) break;
      picked.push(extra);
    }
  }

  const pitch = `${tool.tagline} ${tool.demoHook}`;
  const workspace = createBuildWorkspace(tool);

  return {
    track,
    tool,
    workspace,
    ingredients: picked,
    spice,
    dishName: tool.name,
    chefQuote: randomChefQuote(),
    pitch,
    dice: {
      track: trackDie,
      tool: toolDie,
      ingredientCount: spice.id === "tasting" ? 3 : ingredientCount,
      spice: spiceDie,
    },
  };
}

export function trackIdFromRoll(track: Track): TrackId {
  return track.id;
}

const DEMO_INGREDIENT_IDS = ["nextjs", "ai-api", "voice", "cursor-meta"] as const;

/** Hero roll for /kitchen?demo=1 — Commit Message Chef, AI track, Cursor spice. */
export function demoKitchenRoll(): RollResult {
  const track = TRACKS.find((t) => t.id === "ai-tool") ?? TRACKS[0];
  const tool = TOOL_IDEAS.find((t) => t.id === "commit-msg") ?? TOOL_IDEAS[0];
  const spice = SPICES.find((s) => s.id === "secret-cursor") ?? SPICES[0];
  const ingredients = DEMO_INGREDIENT_IDS.map(
    (id) => INGREDIENTS.find((i) => i.id === id)!
  ).filter(Boolean);

  const pitch = `${tool.tagline} ${tool.demoHook}`;

  return {
    track,
    tool,
    workspace: createDemoBuildWorkspace(tool),
    ingredients,
    spice,
    dishName: tool.name,
    chefQuote: "Demo mode — same roll every time. Perfect for show & tell.",
    pitch,
    dice: { track: 1, tool: 1, ingredientCount: 4, spice: 4 },
  };
}
