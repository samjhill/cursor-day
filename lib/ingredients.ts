import type { Track } from "./tracks";
import type { Spice } from "./spices";
import type { ToolIdea } from "./tool-ideas";
import type { BuildWorkspace } from "./build-workspace";
import {
  workspacePromptBlock,
  workspaceFileHints,
} from "./build-workspace";

export interface Ingredient {
  id: string;
  emoji: string;
  name: string;
  category: "core" | "flavor" | "garnish";
  promptFragment: string;
}

export const INGREDIENTS: Ingredient[] = [
  {
    id: "nextjs",
    emoji: "⚡",
    name: "Next.js App Router",
    category: "core",
    promptFragment: "Use Next.js 15 App Router with TypeScript.",
  },
  {
    id: "ai-api",
    emoji: "🧠",
    name: "Live AI API",
    category: "core",
    promptFragment:
      "Add an API route that calls OpenAI/Anthropic. Gracefully mock if no key.",
  },
  {
    id: "local-storage",
    emoji: "💾",
    name: "Persistent State",
    category: "flavor",
    promptFragment: "Persist user data in localStorage (already wired in lib/hooks.ts).",
  },
  {
    id: "animations",
    emoji: "✨",
    name: "Polish & Motion",
    category: "flavor",
    promptFragment:
      "Add tasteful CSS transitions and micro-interactions. Dark theme, violet accent.",
  },
  {
    id: "share-link",
    emoji: "🔗",
    name: "Shareable URL",
    category: "garnish",
    promptFragment: "Deploy to Vercel. Show live URL at demo.",
  },
  {
    id: "cursor-meta",
    emoji: "🍳",
    name: "Cursor Meta Story",
    category: "garnish",
    promptFragment:
      "Lean into the 'Cook with Cursor' theme — mention it was built live with Agent.",
  },
  {
    id: "mcp",
    emoji: "🔌",
    name: "MCP Integration",
    category: "garnish",
    promptFragment:
      "Optional: use an MCP tool (Stripe, Neon, Vercel) if relevant to the idea.",
  },
  {
    id: "voice",
    emoji: "🎤",
    name: "Demo-Ready UX",
    category: "flavor",
    promptFragment:
      "Optimize for a 30-second live demo: big text, obvious CTA, no login required.",
  },
];

export const DEFAULT_INGREDIENTS: Ingredient[] = INGREDIENTS.filter((i) =>
  ["nextjs", "animations", "voice", "cursor-meta"].includes(i.id)
);

export interface Recipe {
  prompt: string;
  checklist: string[];
  timeBudget: string;
}

export function buildRecipeFromIngredients(
  selected: Ingredient[],
  track: Track,
  spice?: Spice | null,
  dishName?: string,
  tool?: ToolIdea | null,
  workspace?: BuildWorkspace | null
): Recipe {
  const fragments = selected.map((i) => `- ${i.promptFragment}`).join("\n");
  const spiceBlock = spice
    ? `\n## Wild Spice (${spice.emoji} ${spice.name})\n- ${spice.constraint}`
    : "";
  const toolBlock = tool
    ? `\n## Build this useful tool (${tool.emoji} ${tool.name})
- ${tool.description}
- Demo hook: ${tool.demoHook}
- Implementation brief: ${tool.buildBrief}`
    : "";
  const workspaceBlock = workspace ? `\n${workspacePromptBlock(workspace)}` : "";
  const fileHints = workspace
    ? workspaceFileHints(workspace)
    : track.fileHints;

  const prompt = `# Cook with Cursor — Build Task

## Project context
You are building inside an existing Next.js scaffold called "Prompt Kitchen".
Track: ${track.name} (${track.emoji})
${dishName ? `Project name: ${dishName}` : ""}
${workspace ? `Workspace slug: ${workspace.slug}` : ""}
Event: NYC Cook with Cursor Day — 2.5 hour build window.

## Track starter
${track.starterPrompt}${toolBlock}${workspaceBlock}

## Ingredients (requirements)
${fragments}${spiceBlock}

## Constraints
- Ship something demo-able in under 2 hours
- Demo lives at ${workspace?.demoPath ?? "/build/{slug}"} — NOT in shared kitchen pages
- Keep scope narrow — one killer feature beats five half-done ones
- Match existing dark theme and component style in components/ui/
- Do NOT add auth, databases, or payment unless it's the core demo

## Suggested files
${fileHints.map((f) => `- ${f}`).join("\n")}

## Done when
- [ ] Feature works at ${workspace?.demoPath ?? "your build route"}
- [ ] No edits outside workspace folder
- [ ] 30-second demo script is clear
- [ ] Deployed to Vercel (optional but impressive)`;

  const checklist = [
    "Roll the dice → get isolated workspace folder",
    "Open in Cursor via deeplink on /kitchen",
    `Build ONLY in ${workspace?.projectsDir ?? "your workspace"}`,
    `Demo at ${workspace?.demoPath ?? "/build/{slug}"}`,
    "Practice 30-sec demo twice",
    "Deploy & get shareable URL",
    "Service! Show & tell at 12:00 🏆",
  ];

  return {
    prompt,
    checklist,
    timeBudget: "9:45–11:30 build · 11:30–12:00 polish + deploy · 12:00 demo",
  };
}
