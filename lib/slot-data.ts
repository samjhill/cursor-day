export type ReelId = "audience" | "feature" | "twist";

export interface ReelConfig {
  id: ReelId;
  label: string;
  emoji: string;
  items: string[];
}

export const REELS: ReelConfig[] = [
  {
    id: "audience",
    label: "Audience",
    emoji: "👥",
    items: [
      "junior developers",
      "startup founders",
      "designers who code",
      "hackathon judges",
      "remote teams",
      "non-technical PMs",
      "open-source maintainers",
      "Cursor power users",
      "NY Tech Week attendees",
      "solo indie hackers",
    ],
  },
  {
    id: "feature",
    label: "Feature type",
    emoji: "⚡",
    items: [
      "AI micro-tool",
      "real-time dashboard",
      "browser game",
      "CLI helper",
      "Chrome extension",
      "Slack bot",
      "landing page generator",
      "code review copilot",
      "prompt library",
      "API wrapper",
    ],
  },
  {
    id: "twist",
    label: "Twist",
    emoji: "🌶️",
    items: [
      "must work fully offline",
      "voice input only",
      "no external npm packages",
      "single-screen demo",
      "must mention Cursor Agent",
      "dark mode is mandatory",
      "copy-to-clipboard is the hero",
      "30-second demo or bust",
      "localStorage only — no backend",
      "audience picks the twist live",
    ],
  },
];

export interface SlotResult {
  audience: string;
  feature: string;
  twist: string;
}

export function buildPrompt(result: SlotResult): string {
  return `Build a ${result.feature} for ${result.audience}. Constraint: ${result.twist}. Ship something demo-able in under 2 hours with Cursor Agent.`;
}

export function pickRandomItem(items: string[], exclude?: string): string {
  const pool = exclude ? items.filter((i) => i !== exclude) : items;
  return pool[Math.floor(Math.random() * pool.length)] ?? items[0];
}

export function rollSlot(previous?: SlotResult | null): SlotResult {
  const [audienceReel, featureReel, twistReel] = REELS;
  return {
    audience: pickRandomItem(audienceReel.items, previous?.audience),
    feature: pickRandomItem(featureReel.items, previous?.feature),
    twist: pickRandomItem(twistReel.items, previous?.twist),
  };
}

export const MOCK_ENHANCEMENTS = [
  (r: SlotResult) =>
    `🍳 Chef's order: Ship a ${r.feature} that ${r.audience} will actually use in 30 seconds. Hard rule — ${r.twist}. Cursor Agent writes the boilerplate; you taste-test on stage.`,
  (r: SlotResult) =>
    `Live at Cook with Cursor: one killer ${r.feature} loop for ${r.audience}. The secret ingredient? ${r.twist}. Demo it at /present before the bell.`,
  (r: SlotResult) =>
    `Your 2-hour special: ${r.feature} × ${r.audience} × ${r.twist}. Paste this into Cursor Agent and don't over-scope — one interaction, big text, copy button.`,
];

export function mockEnhance(result: SlotResult): string {
  const fn = MOCK_ENHANCEMENTS[Math.floor(Math.random() * MOCK_ENHANCEMENTS.length)];
  return fn(result);
}
