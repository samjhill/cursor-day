import type { TrackId } from "./tracks";

export interface ToolIdea {
  id: string;
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  tracks: TrackId[];
  demoHook: string;
  buildBrief: string;
}

/** Useful micro-tools & experiences shippable in ~2 hours at Cook with Cursor. */
export const TOOL_IDEAS: ToolIdea[] = [
  // ── AI Micro-Tool ─────────────────────────────────────────────
  {
    id: "action-items",
    emoji: "✅",
    name: "Action Item Extractor",
    tagline: "Paste messy notes → get a clean todo list.",
    description:
      "Developers paste standup notes or meeting blurbs; output is prioritized action items with owners and due hints.",
    tracks: ["ai-tool"],
    demoHook: "Paste 3 sentences of chaos, get a checklist in 2 seconds.",
    buildBrief:
      "Textarea in → bullet list out. Parse lines for verbs (fix, ship, review). Optional AI or regex mock. Copy-all button.",
  },
  {
    id: "commit-msg",
    emoji: "📝",
    name: "Commit Message Chef",
    tagline: "Bullet points in → conventional commit out.",
    description:
      "Turn scratch notes into `feat:` / `fix:` / `chore:` messages with a subject line and body.",
    tracks: ["ai-tool"],
    demoHook: "Type 'added dark mode toggle' → get a proper commit message.",
    buildBrief:
      "Input bullets → output formatted commit (type, scope, subject, body). Offer 3 variants: safe, detailed, cheeky.",
  },
  {
    id: "user-story",
    emoji: "📖",
    name: "User Story Formatter",
    tagline: "Rough idea → 'As a… I want… So that…'",
    description:
      "Product-ish input becomes a proper user story plus 2–3 acceptance criteria checkboxes.",
    tracks: ["ai-tool"],
    demoHook: "One sentence idea becomes a story card you could paste into Linear.",
    buildBrief:
      "Single input field. Output card with story template + acceptance criteria. Copy markdown.",
  },
  {
    id: "regex-explainer",
    emoji: "🔍",
    name: "Regex Plain English",
    tagline: "Paste a regex → human-readable breakdown.",
    description:
      "Demystify patterns for juniors: token-by-token explanation plus a test string highlighter.",
    tracks: ["ai-tool"],
    demoHook: "Paste `/^\\d{3}-\\d{2}-\\d{4}$/` → see what each piece means.",
    buildBrief:
      "Regex input + sample string. Output explanation list + highlight matches in sample. Mock parser is fine.",
  },
  {
    id: "elevator-pitch",
    emoji: "🎤",
    name: "30-Second Pitch Sharpener",
    tagline: "Long description → demo-day opener.",
    description:
      "Hackathon builders paste a paragraph; get a tight 30-word hook + one follow-up sentence.",
    tracks: ["ai-tool"],
    demoHook: "Perfect for show & tell — literally what this event needs.",
    buildBrief:
      "Textarea → two output lines: HOOK (≤30 words) + PROOF POINT. Character counter. One-click copy.",
  },
  {
    id: "error-decoder",
    emoji: "🐛",
    name: "Stack Trace Decoder",
    tagline: "Paste an error → likely cause + next step.",
    description:
      "Common JS/Python/Java errors mapped to plain English fixes (ENOENT, CORS, 401, etc.).",
    tracks: ["ai-tool"],
    demoHook: "Paste a scary red error, get 'try this first' advice.",
    buildBrief:
      "Error paste zone. Pattern-match known errors → card with Cause / Fix / Docs link. Fallback: generic triage steps.",
  },
  {
    id: "pr-description",
    emoji: "🔀",
    name: "PR Description Writer",
    tagline: "Change summary → ready-to-paste PR body.",
    description:
      "Bullet what changed → markdown PR template with Summary, Test plan, and Screenshots placeholder.",
    tracks: ["ai-tool"],
    demoHook: "Three bullets in → GitHub-flavored markdown out.",
    buildBrief:
      "Bullets input → PR markdown output. Include checklist section. Copy button.",
  },
  {
    id: "tweet-thread",
    emoji: "🐦",
    name: "Thread Condenser",
    tagline: "Long post → numbered tweet thread.",
    description:
      "Split text into ≤280-char chunks with optional hook tweet and CTA tweet at the end.",
    tracks: ["ai-tool"],
    demoHook: "Paste a blog paragraph, get a 4-tweet thread.",
    buildBrief:
      "Long text in → numbered tweet cards out. Char count per tweet. Copy thread button.",
  },

  // ── Visual Dashboard ──────────────────────────────────────────
  {
    id: "habit-streak",
    emoji: "🔥",
    name: "Habit Streak Board",
    tagline: "Track daily wins with satisfying streak flames.",
    description:
      "Add habits, tap to mark today done, see streak count and a 7-day heat grid.",
    tracks: ["visual-dash"],
    demoHook: "Add 'ship code' → tap done → watch the streak increment live.",
    buildBrief:
      "localStorage habits. Grid of last 7 days. Animated bar or flame when streak increases. Add/remove habit.",
  },
  {
    id: "hackathon-clock",
    emoji: "⏰",
    name: "Hackathon Countdown",
    tagline: "Big clock to show & tell deadline with phase labels.",
    description:
      "Phases: Build / Polish / Demo. Progress ring + time remaining until a configurable deadline.",
    tracks: ["visual-dash"],
    demoHook: "Set deadline to 12:00 — ring turns red under 30 min.",
    buildBrief:
      "Countdown to noon (or custom). Circular progress SVG. Phase labels based on time left. Pulse under 30 min.",
  },
  {
    id: "team-mood",
    emoji: "📊",
    name: "Team Energy Meter",
    tagline: "Anonymous vibe check aggregated live.",
    description:
      "Buttons: 😴 😐 🔥 — bar chart of today's votes from localStorage or room QR.",
    tracks: ["visual-dash"],
    demoHook: "Tap 🔥 three times, watch the bar animate up.",
    buildBrief:
      "Three emoji vote buttons. Running totals + animated horizontal bars. Reset day button. No auth.",
  },
  {
    id: "issue-pulse",
    emoji: "💓",
    name: "Open Work Pulse",
    tagline: "Dashboard of mock PRs, issues, and deploy status.",
    description:
      "Fake but realistic metrics: open PRs, CI green/red, last deploy — all animating on interval.",
    tracks: ["visual-dash"],
    demoHook: "Numbers tick like a real ops dashboard — impressive on a projector.",
    buildBrief:
      "3–4 metric cards with mock data. setInterval to jitter numbers slightly. Sparkline SVG optional.",
  },
  {
    id: "coffee-commits",
    emoji: "☕",
    name: "Coffee vs Commits",
    tagline: "Absurd correlation chart for demo laughs.",
    description:
      "Log coffees and commits; chart 'proves' more coffee = more commits (mock data seeded).",
    tracks: ["visual-dash"],
    demoHook: "Add a coffee, watch the chart update — judges always laugh.",
    buildBrief:
      "Two counters + dual-axis or grouped bar chart (CSS/SVG). Seed funny correlation. Add coffee button.",
  },
  {
    id: "tech-week-schedule",
    emoji: "📅",
    name: "Tech Week Timeline",
    tagline: "Scrollable event timeline with 'you are here'.",
    description:
      "Today's NY Tech Week-style schedule as a vertical timeline with current event highlighted.",
    tracks: ["visual-dash"],
    demoHook: "Scroll to Cook with Cursor — pulsing 'now' marker.",
    buildBrief:
      "Hardcode today's schedule. Vertical timeline CSS. Active event glows. Mobile-friendly scroll.",
  },
  {
    id: "budget-split",
    emoji: "💸",
    name: "Dinner Bill Splitter Viz",
    tagline: "Enter total + people → animated split chart.",
    description:
      "Post-hackathon dinner? Split evenly or by item with a pie or bar breakdown.",
    tracks: ["visual-dash"],
    demoHook: "Type $847 for 6 people — instant per-person + tip.",
    buildBrief:
      "Amount, people, tip %. Animated pie chart of shares. Copy venmo-style request text.",
  },

  // ── Interactive ───────────────────────────────────────────────
  {
    id: "decision-wheel",
    emoji: "🎡",
    name: "Feature Decision Wheel",
    tagline: "Spin to pick what to build when you're stuck.",
    description:
      "Add 4–8 options, spin the wheel with physics-ish animation, land on one.",
    tracks: ["interactive"],
    demoHook: "Spin live on stage — audience picks your scope.",
    buildBrief:
      "Canvas or CSS wheel. Click spin → decelerate animation → winner modal. Editable segments.",
  },
  {
    id: "pomodoro-kitchen",
    emoji: "🍅",
    name: "Kitchen Pomodoro",
    tagline: "25-min focus timer with service bell at the end.",
    description:
      "Themed pomodoro: prep (5) → cook (25) → rest (5). Big timer, satisfying bell.",
    tracks: ["interactive"],
    demoHook: "Start timer, pause for demo, bell rings — crowd reacts.",
    buildBrief:
      "Timer states: prep/cook/rest. Start pause reset. Bell on complete (optional sound). Big digits.",
  },
  {
    id: "slot-prompt",
    emoji: "🎰",
    name: "Prompt Slot Machine",
    tagline: "Pull the lever → random build constraint combo.",
    description:
      "Three reels: audience, feature type, twist. Slot animation then copy result.",
    tracks: ["interactive"],
    demoHook: "Pull lever three times at show & tell for chaos.",
    buildBrief:
      "Three spinning columns. Lever button. Reels stop staggered. Output concatenated prompt + copy.",
  },
  {
    id: "typing-sprint",
    emoji: "⌨️",
    name: "Line Cook Typing Sprint",
    tagline: "60-second typing test with kitchen leaderboard.",
    description:
      "Type a recipe-themed paragraph; WPM + accuracy score, local high score.",
    tracks: ["interactive"],
    demoHook: "Race the person next to you — instant score.",
    buildBrief:
      "Show target text. Track typed chars, errors, timer 60s. WPM formula. localStorage high score.",
  },
  {
    id: "would-you-rather",
    emoji: "🤔",
    name: "Product Would-You-Rather",
    tagline: "Swipe left/right on product tradeoffs.",
    description:
      "Card stack: 'Ship fast vs polish UI', 'Mock data vs real API' — see aggregate % (local).",
    tracks: ["interactive"],
    demoHook: "Swipe two cards, see how your choices compare to defaults.",
    buildBrief:
      "Card stack UI. Swipe or button L/R. Track votes in localStorage. Show % breakdown after 5 cards.",
  },
  {
    id: "two-truths",
    emoji: "🎭",
    name: "Two Truths & A Lie: Code Edition",
    tagline: "Generate a quiz from a codebase topic.",
    description:
      "Pick a topic (React, Git, CSS); get 3 statements — user picks the lie, instant feedback.",
    tracks: ["interactive"],
    demoHook: "Audience shouts 1, 2, or 3 — you reveal the lie.",
    buildBrief:
      "Topic picker. Hardcoded question sets per topic (3–5 each). Click answer → green/red flash + explanation.",
  },
  {
    id: "emoji-story",
    emoji: "📖",
    name: "Emoji Story Generator",
    tagline: "Pick 5 emoji → get a absurd product pitch.",
    description:
      "Tap emoji from a grid; combine into a randomized startup one-liner and feature list.",
    tracks: ["interactive"],
    demoHook: "Pick 🦄🍕🚀💡🎸 — read the generated pitch aloud.",
    buildBrief:
      "Emoji grid multi-select (5 max). Template mad-libs for pitch + 3 features. Regenerate button.",
  },
  {
    id: "scope-shrinker",
    emoji: "🔪",
    name: "Scope Shrinking Game",
    tagline: "Start with a huge idea — cut until it's 2-hour shippable.",
    description:
      "Interactive card: each click removes a feature until you're down to ONE killer interaction.",
    tracks: ["interactive"],
    demoHook: "Start with 'Notion + Slack + AI' — end with one checkbox.",
    buildBrief:
      "Start with bloated feature list. Click to 'cut' items with animation. Win when 1 feature left. Timer optional.",
  },
];

export function toolsForTrack(trackId: TrackId): ToolIdea[] {
  return TOOL_IDEAS.filter((t) => t.tracks.includes(trackId));
}

export function pickToolForTrack(trackId: TrackId, die: number): ToolIdea {
  const pool = toolsForTrack(trackId);
  if (pool.length === 0) return TOOL_IDEAS[0];
  return pool[(die - 1) % pool.length];
}

export function toolsByTrack(): Record<TrackId, ToolIdea[]> {
  return {
    "ai-tool": toolsForTrack("ai-tool"),
    "visual-dash": toolsForTrack("visual-dash"),
    interactive: toolsForTrack("interactive"),
  };
}
