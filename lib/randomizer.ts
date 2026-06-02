import type { Ingredient } from "./ingredients";
import { INGREDIENTS } from "./ingredients";
import { SPICES, type Spice, randomDishName, randomChefQuote } from "./spices";
import { TRACKS, type Track, type TrackId } from "./tracks";

export interface RollResult {
  track: Track;
  ingredients: Ingredient[];
  spice: Spice;
  dishName: string;
  chefQuote: string;
  dice: {
    track: number;
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

  return {
    track,
    ingredients: picked,
    spice,
    dishName: randomDishName(),
    chefQuote: randomChefQuote(),
    dice: {
      track: trackDie,
      ingredientCount: spice.id === "tasting" ? 3 : ingredientCount,
      spice: spiceDie,
    },
  };
}

export function trackIdFromRoll(track: Track): TrackId {
  return track.id;
}
