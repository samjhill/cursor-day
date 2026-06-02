export interface Spice {
  id: string;
  emoji: string;
  name: string;
  constraint: string;
}

export const SPICES: Spice[] = [
  {
    id: "flambe",
    emoji: "🔥",
    name: "Flambé Finish",
    constraint: "Include one animation that makes the audience go 'whoa'.",
  },
  {
    id: "tasting",
    emoji: "🥄",
    name: "Tasting Menu",
    constraint: "Use exactly 3 ingredients — no more, no less.",
  },
  {
    id: "iron-chef",
    emoji: "⏱️",
    name: "Iron Chef Timer",
    constraint: "Demo must complete in under 20 seconds. Practice twice.",
  },
  {
    id: "secret-cursor",
    emoji: "🍳",
    name: "Secret Ingredient: Cursor",
    constraint: "UI must include a visible 'Built with Cursor' easter egg.",
  },
  {
    id: "mystery-emoji",
    emoji: "🎭",
    name: "Mystery Emoji",
    constraint: "Pick a random emoji and weave it into the product name or UI.",
  },
  {
    id: "no-backend",
    emoji: "🥗",
    name: "Raw & Simple",
    constraint: "No API routes — client-only for maximum speed.",
  },
  {
    id: "loud-colors",
    emoji: "🌶️",
    name: "Extra Spicy UI",
    constraint: "Use at least one bold accent color beyond violet.",
  },
  {
    id: "sound-bite",
    emoji: "🔔",
    name: "Service Bell",
    constraint: "Add a satisfying sound or haptic moment on the main action.",
  },
];

export const CHEF_QUOTES = [
  "Order up! Let's see what the dice decree…",
  "The kitchen gods are feeling playful today.",
  "Mise en place? More like surprise en place!",
  "In this kitchen, we roll with it. Literally.",
  "Julia Child never had Cursor. You do. Lucky.",
  "Hot pans, hot takes, hot deploys.",
  "Taste as you build. Adjust seasoning (scope) often.",
];

export const DISH_PREFIXES = [
  "Chef's",
  "Midnight",
  "Brooklyn",
  "Cursor",
  "Tech Week",
  "Simmered",
  "Flash-Fried",
  "Deconstructed",
];

export const DISH_SUFFIXES = [
  "Surprise",
  "Special",
  "Roulade",
  "Reduction",
  "Amuse-Bouche",
  "Stack",
  "Hash",
  "Soufflé",
];

export function randomDishName(): string {
  const prefix = DISH_PREFIXES[Math.floor(Math.random() * DISH_PREFIXES.length)];
  const suffix = DISH_SUFFIXES[Math.floor(Math.random() * DISH_SUFFIXES.length)];
  return `${prefix} ${suffix}`;
}

export function randomChefQuote(): string {
  return CHEF_QUOTES[Math.floor(Math.random() * CHEF_QUOTES.length)];
}
