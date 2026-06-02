export type TrackId = "ai-tool" | "visual-dash" | "interactive";

export interface Track {
  id: TrackId;
  emoji: string;
  name: string;
  description: string;
  demoSeconds: number;
  difficulty: "Easy" | "Medium" | "Ambitious";
  starterPrompt: string;
  fileHints: string[];
}

export const TRACKS: Track[] = [
  {
    id: "ai-tool",
    emoji: "🤖",
    name: "AI Micro-Tool",
    description:
      "A focused AI-powered utility — summarizer, classifier, copilot for one task. High wow-factor, narrow scope.",
    demoSeconds: 30,
    difficulty: "Easy",
    starterPrompt: `Build a single-purpose AI tool with a clean input → output flow.
Create your page at app/build/{slug}/page.tsx (workspace path from the roll).
Put components in projects/{slug}/. Optional API at app/api/build/{slug}/route.ts.
Mock responses if no API key; wire real AI if OPENAI_API_KEY is set.`,
    fileHints: [
      "app/build/{slug}/page.tsx",
      "projects/{slug}/widget.tsx",
      "app/api/build/{slug}/route.ts",
    ],
  },
  {
    id: "visual-dash",
    emoji: "📊",
    name: "Visual Dashboard",
    description:
      "Real-time or animated data viz — metrics, timelines, maps. Looks impressive on a projector.",
    demoSeconds: 25,
    difficulty: "Medium",
    starterPrompt: `Build a visual dashboard with at least one animated chart or live-updating metric.
Create app/build/{slug}/page.tsx and projects/{slug}/ for chart components.
Use pure CSS/SVG or canvas — no heavy chart libraries unless you have time.`,
    fileHints: [
      "app/build/{slug}/page.tsx",
      "projects/{slug}/dashboard.tsx",
    ],
  },
  {
    id: "interactive",
    emoji: "🎮",
    name: "Interactive Experience",
    description:
      "Game, quiz, generator, or playful toy. Memorable demos win prizes — make it fun to watch.",
    demoSeconds: 20,
    difficulty: "Ambitious",
    starterPrompt: `Build an interactive browser experience with immediate feedback.
Create app/build/{slug}/page.tsx and projects/{slug}/ for the experience.
Keyboard or click interactions. One core loop, polished animations.`,
    fileHints: [
      "app/build/{slug}/page.tsx",
      "projects/{slug}/experience.tsx",
    ],
  },
];

export function getTrackById(id: TrackId | null | undefined): Track {
  return TRACKS.find((t) => t.id === id) ?? TRACKS[0];
}
