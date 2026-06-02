import type { CookIngredient, CookSpice, SimmerResponse, PlateResponse } from "./cook-types";
import type { TrackId } from "./tracks";
import { getTrackById } from "./tracks";

const FEATURE_TEMPLATES: Record<TrackId, string[]> = {
  "ai-tool": [
    "Single input field → one-tap 'Plate It' → styled output card",
    "Graceful mock mode when no API key — never breaks live demo",
    "Copy-to-clipboard on the output for hackathon sharing",
  ],
  "visual-dash": [
    "Live counters for rolls, simmers, and plates from this session",
    "Animated bar chart of spice and ingredient frequency",
    "Pulse animation when a new stat ticks up",
  ],
  interactive: [
    "2-minute Iron Chef countdown tied to your rolled ingredients",
    "Start / pause / bell reset with big tap targets for demo",
    "Victory state when timer hits zero — 'Order up!'",
  ],
};

const FILE_TEMPLATES: Record<TrackId, string[]> = {
  "ai-tool": [
    "components/widgets/ai-plater.tsx — input + plated output UI",
    "app/api/cook/route.ts — plate action (already wired)",
    "app/present/page.tsx — embed AiPlater on the pass",
  ],
  "visual-dash": [
    "components/widgets/kitchen-dashboard.tsx — live stat viz",
    "lib/kitchen-stats.ts — session metrics helpers",
    "app/present/page.tsx — full-width dashboard embed",
  ],
  interactive: [
    "components/widgets/build-sprint.tsx — countdown + ingredient lock-in",
    "lib/kitchen-stats.ts — log sprint completions",
    "app/present/page.tsx — sprint widget front and center",
  ],
};

function ingredientHint(ingredients: CookIngredient[]): string {
  if (ingredients.length === 0) return "Keep the core loop tight";
  const names = ingredients.slice(0, 3).map((i) => i.name).join(", ");
  return `Weave in: ${names}`;
}

export function mockSimmer(
  dishName: string,
  pitch: string,
  trackId: TrackId,
  ingredients: CookIngredient[],
  spice?: CookSpice | null
): SimmerResponse {
  const track = getTrackById(trackId);
  const features = [
    ...FEATURE_TEMPLATES[trackId].map((f, i) =>
      i === 0 ? `${f} for "${dishName}"` : f
    ),
    ingredientHint(ingredients),
  ];
  if (spice) features.push(`Wild spice rule: ${spice.constraint}`);

  const demoScript = `"${dishName}" — ${pitch.slice(0, 80)}${pitch.length > 80 ? "…" : ""}. [Live demo: one interaction]. Built in 2.5 hours with Cursor at Cook Day.`;

  return {
    action: "simmer",
    features: features.slice(0, 4),
    files: FILE_TEMPLATES[trackId],
    demoScript,
    chefNote: spice
      ? `The ${spice.name} spice means you can't skip: ${spice.constraint.toLowerCase()}`
      : `Course ${track.emoji} ${track.name} — ship one interaction, not a platform.`,
    mock: true,
  };
}

export function mockPlate(
  input: string,
  dishName: string,
  trackId: TrackId,
  ingredients: CookIngredient[],
  spice?: CookSpice | null
): PlateResponse {
  const track = getTrackById(trackId);
  const ingList =
    ingredients.length > 0
      ? ingredients.map((i) => `${i.emoji} ${i.name}`).join(" · ")
      : "house staples";

  const lines = [
    `# ${dishName || "Chef's Special"}`,
    "",
    `**Course:** ${track.emoji} ${track.name}`,
    "",
    "## Your order",
    input.trim(),
    "",
    "## Plated (mock chef interpretation)",
    `- Core idea: ${input.slice(0, 120)}${input.length > 120 ? "…" : ""}`,
    `- Ingredients on the pass: ${ingList}`,
  ];

  if (spice) {
    lines.push(`- Spice note (${spice.emoji} ${spice.name}): ${spice.constraint}`);
  }

  lines.push(
    "",
    "## First 3 build steps",
    "1. Wire the input → API → output card (already scaffolded)",
    "2. Embed on `/present` — this IS the demo",
    "3. Practice the 30-second script twice before service"
  );

  const garnishes = [
    "Send it — the pass is hot! 🔥",
    "Tastes like a winner. Don't over-season the scope.",
    "Order up! One feature, perfectly plated.",
    "The judges will smell this from the back row.",
  ];

  return {
    action: "plate",
    output: lines.join("\n"),
    garnish: garnishes[Math.floor(Math.random() * garnishes.length)],
    mock: true,
  };
}

export function buildSimmerPrompt(
  dishName: string,
  pitch: string,
  trackId: TrackId,
  ingredients: CookIngredient[],
  spice?: CookSpice | null
): string {
  const track = getTrackById(trackId);
  const ing = ingredients.map((i) => i.name).join(", ") || "none";
  const spiceLine = spice ? `Wild spice: ${spice.name} — ${spice.constraint}` : "No wild spice";

  return `You are a hackathon chef at "Cook with Cursor" NYC. A builder rolled dice and got this recipe. Respond ONLY with valid JSON, no markdown fences:
{"features":["...","...","..."],"files":["...","...","..."],"demoScript":"one sentence","chefNote":"one witty sentence"}

Dish: ${dishName}
Pitch: ${pitch}
Course/Track: ${track.name}
Ingredients: ${ing}
${spiceLine}

features = exactly 3 concrete, shippable in 2 hours features for this track
files = exactly 3 file paths to create/edit
demoScript = 30-second show-and-tell opener
chefNote = one encouraging kitchen metaphor`;
}

export function buildPlatePrompt(
  input: string,
  dishName: string,
  trackId: TrackId,
  ingredients: CookIngredient[],
  spice?: CookSpice | null
): string {
  const track = getTrackById(trackId);
  const ing = ingredients.map((i) => i.name).join(", ") || "none";
  const spiceLine = spice ? `${spice.name}: ${spice.constraint}` : "none";

  return `You are a executive chef translating a hackathon idea into a build plan. Respond ONLY with valid JSON, no markdown fences:
{"output":"markdown string with sections: idea summary, 3 build steps, demo tip","garnish":"one short witty kitchen pun"}

Dish name: ${dishName}
Track: ${track.name}
Ingredients: ${ing}
Spice constraint: ${spiceLine}
Builder's raw order: ${input}

Keep output under 200 words. Be specific and actionable.`;
}

export function parseAiJson<T>(text: string): T | null {
  try {
    const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
    return JSON.parse(cleaned) as T;
  } catch {
    return null;
  }
}
