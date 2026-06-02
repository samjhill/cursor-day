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
  {
    id: "changelog",
    emoji: "📋",
    name: "Changelog Writer",
    tagline: "Bullet what changed → Keep a Changelog format.",
    description:
      "Paste rough release notes or commit bullets; output Added / Changed / Fixed sections.",
    tracks: ["ai-tool"],
    demoHook: "Three messy bullets → polished CHANGELOG.md block.",
    buildBrief:
      "Bullets in → categorized changelog markdown. Copy button. Optional version + date fields.",
  },
  {
    id: "sql-explainer",
    emoji: "🗃️",
    name: "SQL Plain English",
    tagline: "Paste a query → step-by-step explanation.",
    description:
      "Break down SELECT/JOIN/WHERE clauses for juniors learning to read production queries.",
    tracks: ["ai-tool"],
    demoHook: "Paste a gnarly JOIN → see what each clause actually does.",
    buildBrief:
      "SQL textarea → numbered explanation list per clause. Sample query prefill. Mock parser or AI.",
  },
  {
    id: "tone-shifter",
    emoji: "🎭",
    name: "Tone Shifter",
    tagline: "Same message, three voices: formal, casual, technical.",
    description:
      "Rewrite Slack drafts or emails so you sound professional, friendly, or engineer-brained.",
    tracks: ["ai-tool"],
    demoHook: "Type 'hey can u fix the bug' → get three polished variants.",
    buildBrief:
      "Single input → three tabbed outputs (Formal / Casual / Technical). Copy per tab. Mock templates OK.",
  },
  {
    id: "api-namer",
    emoji: "🏷️",
    name: "API Route Namer",
    tagline: "Describe an endpoint → REST path suggestions.",
    description:
      "Natural language like 'get user profile' → `/users/:id`, method, and status code hints.",
    tracks: ["ai-tool"],
    demoHook: "Type 'delete expired sessions' → get REST naming options.",
    buildBrief:
      "Description in → 3 route suggestions with HTTP method + example JSON. Copy path button.",
  },
  {
    id: "variable-namer",
    emoji: "🔤",
    name: "Variable Name Fixer",
    tagline: "Vague names → descriptive identifier suggestions.",
    description:
      "Paste `x`, `data2`, `temp` with context; get camelCase/snake_case renames that read well.",
    tracks: ["ai-tool"],
    demoHook: "Paste `const d = fetch()` → get `userProfileResponse` suggestions.",
    buildBrief:
      "Code snippet + optional context → 3 rename suggestions with one-line rationale. Copy button.",
  },
  {
    id: "meeting-cost",
    emoji: "💰",
    name: "Meeting Cost Calculator",
    tagline: "Attendees × duration × rate → real dollar cost.",
    description:
      "Enter headcount, hourly rate, and minutes — show how expensive that standup actually was.",
    tracks: ["ai-tool"],
    demoHook: "12 people × 30 min × $150/hr — watch the number hurt.",
    buildBrief:
      "Three inputs → big cost number + 'could have shipped X' quip. Slider for duration. Shareable result.",
  },
  {
    id: "readme-gen",
    emoji: "📄",
    name: "README Starter",
    tagline: "Project blurb → README skeleton with badges.",
    description:
      "One paragraph about your hackathon project → markdown README with install, usage, and demo sections.",
    tracks: ["ai-tool"],
    demoHook: "Describe your app in two sentences → paste-ready README.",
    buildBrief:
      "Short description in → markdown README template out. Sections: Install, Usage, Demo, License. Copy button.",
  },
  {
    id: "test-case-gen",
    emoji: "🧪",
    name: "Test Case Generator",
    tagline: "Function signature → happy path + edge case list.",
    description:
      "Paste a function name and params; get a checklist of unit test scenarios to write.",
    tracks: ["ai-tool"],
    demoHook: "Paste `validateEmail(str)` → get 5 test cases including edge cases.",
    buildBrief:
      "Function signature input → numbered test scenarios (happy, empty, invalid, boundary). Copy as checklist.",
  },
  {
    id: "branch-namer",
    emoji: "🌿",
    name: "Git Branch Namer",
    tagline: "Ticket + summary → conventional branch name.",
    description:
      "Turn 'fix login bug on mobile' into `fix/mobile-login-timeout` with type prefix suggestions.",
    tracks: ["ai-tool"],
    demoHook: "Type a ticket title → get feat/fix/chore branch options.",
    buildBrief:
      "Summary input → 3 branch name variants (kebab-case). Copy button. Optional ticket number prefix.",
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
  {
    id: "contrib-graph",
    emoji: "🟩",
    name: "Contribution Graph",
    tagline: "GitHub-style heatmap you can click to fill in.",
    description:
      "52-week grid of squares — click to log a 'ship day' and watch your streak grow.",
    tracks: ["visual-dash"],
    demoHook: "Click today's square — watch the grid light up green.",
    buildBrief:
      "SVG or CSS grid of 52×7 squares. localStorage ship dates. Hover tooltip with count. Streak stat.",
  },
  {
    id: "sleep-tracker",
    emoji: "😴",
    name: "Sleep Debt Dashboard",
    tagline: "Log hours slept → weekly deficit chart.",
    description:
      "Track last 7 nights vs 8-hour target; bar chart shows cumulative sleep debt.",
    tracks: ["visual-dash"],
    demoHook: "Log 5 hours — watch the debt bar climb into the red.",
    buildBrief:
      "Hours input per day. 7-day bar chart with target line. Running debt total. localStorage persistence.",
  },
  {
    id: "word-frequency",
    emoji: "☁️",
    name: "Word Cloud Builder",
    tagline: "Paste text → sized word frequency viz.",
    description:
      "Drop in a paragraph or README; render words sized by count with animated entrance.",
    tracks: ["visual-dash"],
    demoHook: "Paste your commit messages — see which words dominate.",
    buildBrief:
      "Textarea → tokenize → word frequency map. CSS-sized spans or canvas cloud. Top 20 words. Regenerate button.",
  },
  {
    id: "burndown",
    emoji: "📉",
    name: "Sprint Burndown",
    tagline: "Mock story points chart with ideal vs actual line.",
    description:
      "Pre-seeded sprint data with draggable or auto-updating remaining points line.",
    tracks: ["visual-dash"],
    demoHook: "Click 'complete task' — watch the burndown line drop.",
    buildBrief:
      "SVG line chart: ideal dashed + actual solid. Buttons to knock off 1–3 points. Day labels on X axis.",
  },
  {
    id: "leaderboard",
    emoji: "🏆",
    name: "Hackathon Leaderboard",
    tagline: "Add teams + scores → animated ranking board.",
    description:
      "Enter team names and points; sorted bar race or podium view for show & tell.",
    tracks: ["visual-dash"],
    demoHook: "Add three teams, bump scores — watch bars reorder live.",
    buildBrief:
      "Add team + score form. Horizontal bar chart sorted by score. Bump +/- buttons. localStorage entries.",
  },
  {
    id: "focus-time",
    emoji: "🎯",
    name: "Deep Work Tracker",
    tagline: "Log focus blocks → daily and weekly totals.",
    description:
      "Tap to start/stop a focus session; dashboard shows today's minutes and 7-day trend.",
    tracks: ["visual-dash"],
    demoHook: "Start a block, stop it — see today's total tick up.",
    buildBrief:
      "Start/stop timer button. Log sessions to localStorage. Today's total + 7-day mini bar chart. Big minute counter.",
  },
  {
    id: "deploy-timeline",
    emoji: "🚀",
    name: "Deploy Timeline",
    tagline: "Vertical timeline of mock releases with status dots.",
    description:
      "Hardcoded deploy history with success/fail/rollback markers and hover details.",
    tracks: ["visual-dash"],
    demoHook: "Scroll the timeline — one deploy is pulsing red 'rollback'.",
    buildBrief:
      "Vertical timeline CSS. 5–8 mock deploys with version, time, status color. Active/latest glows. Mobile scroll.",
  },
  {
    id: "poll-results",
    emoji: "📊",
    name: "Live Poll Results",
    tagline: "Audience votes → real-time bar chart update.",
    description:
      "Present a question with 3–4 options; tap to vote and watch bars animate to new percentages.",
    tracks: ["visual-dash"],
    demoHook: "Ask the room to shout A or B — tap votes, chart updates.",
    buildBrief:
      "Question + 4 options. Click to vote (localStorage totals). Animated horizontal % bars. Reset poll button.",
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
  {
    id: "hot-or-not",
    emoji: "🔥",
    name: "Feature Hot or Not",
    tagline: "Swipe yes/no on feature ideas — see crowd favorites.",
    description:
      "Tinder-style cards with product feature ideas; track local yes/no ratios after a session.",
    tracks: ["interactive"],
    demoHook: "Swipe on 'dark mode' vs 'AI chat' — see which wins.",
    buildBrief:
      "Card stack with 5–8 feature ideas. Swipe or button yes/no. Results screen with % breakdown. localStorage votes.",
  },
  {
    id: "mad-libs-prompt",
    emoji: "📜",
    name: "Mad Libs Prompt Builder",
    tagline: "Fill blanks → complete Cursor Agent prompt.",
    description:
      "Pick audience, feature, and constraint from dropdowns; assemble a copy-ready build prompt.",
    tracks: ["interactive"],
    demoHook: "Pick 'hackathon' + 'dashboard' + 'no backend' → copy prompt.",
    buildBrief:
      "3–4 dropdowns or word chips. Live preview of assembled prompt below. Copy button. Fun kitchen-themed options.",
  },
  {
    id: "bingo-card",
    emoji: "🎱",
    name: "Hackathon Bingo",
    tagline: "Random 5×5 card of dev conference clichés.",
    description:
      "Generate a bingo board ('works on my machine', 'just one more commit'); tap to mark squares.",
    tracks: ["interactive"],
    demoHook: "Generate a card — first to BINGO during show & tell wins.",
    buildBrief:
      "25 cliché phrases in pool. Random 5×5 grid. Click to mark. BINGO detection on row/col/diag. New card button.",
  },
  {
    id: "icebreaker",
    emoji: "🧊",
    name: "Icebreaker Spinner",
    tagline: "Spin for a random team bonding question.",
    description:
      "Wheel or card flip with fun questions for standups, offsites, or hackathon intros.",
    tracks: ["interactive"],
    demoHook: "Spin once — read the question aloud to the room.",
    buildBrief:
      "20+ hardcoded questions. Spin animation or random card flip. 'Another one' button. Big readable text.",
  },
  {
    id: "applause-meter",
    emoji: "👏",
    name: "Applause Meter",
    tagline: "Tap fast — gauge hits 100% when the crowd goes wild.",
    description:
      "Big button or spacebar mash; meter fills with decay over time — perfect for judging demos.",
    tracks: ["interactive"],
    demoHook: "Everyone mash the button after a demo — watch the meter peak.",
    buildBrief:
      "Click/spacebar increases meter. Decay over time (requestAnimationFrame). Peak score + confetti at 100%. localStorage high score.",
  },
  {
    id: "quiz-buzzer",
    emoji: "🔔",
    name: "Dev Trivia Buzzer",
    tagline: "Multiple choice — first tap wins, instant reveal.",
    description:
      "10 hardcoded dev trivia questions with 4 options; timer optional, score at end.",
    tracks: ["interactive"],
    demoHook: "Ask the room — reveal answer with a satisfying green flash.",
    buildBrief:
      "Question card + 4 buttons. Click → correct/incorrect feedback + short explanation. Progress 1/10. Final score screen.",
  },
  {
    id: "password-strength",
    emoji: "🔐",
    name: "Password Strength Game",
    tagline: "Type a password — live crack-time estimate + tips.",
    description:
      "Interactive meter that updates as you type with entropy estimate and improvement hints.",
    tracks: ["interactive"],
    demoHook: "Type 'password123' — watch it go red in real time.",
    buildBrief:
      "Password input with show/hide toggle. Live strength bar (weak/fair/strong). Checklist: length, symbols, numbers. Fun copy.",
  },
  {
    id: "reaction-time",
    emoji: "⚡",
    name: "Reaction Time Test",
    tagline: "Wait for green — click as fast as you can.",
    description:
      "Classic reflex test: red → wait → green → measure ms. Local best-of-three score.",
    tracks: ["interactive"],
    demoHook: "Challenge someone in the audience — compare ms scores.",
    buildBrief:
      "States: idle, waiting (red), go (green), result. Click too early = false start. Show ms + personal best. localStorage.",
  },
  {
    id: "color-guesser",
    emoji: "🎨",
    name: "Hex Color Guesser",
    tagline: "See a color — pick the closest hex from options.",
    description:
      "Show a swatch; four hex choices, one correct. Score streak over 5 rounds.",
    tracks: ["interactive"],
    demoHook: "Can you tell #7C3AED from #8B5CF6? The room tries.",
    buildBrief:
      "Random color swatch. 4 hex options (1 correct, 3 close decoys). Streak counter. 5 rounds then results. CSS color blocks.",
  },
  {
    id: "estimate-game",
    emoji: "🃏",
    name: "Planning Poker Lite",
    tagline: "Pick a story point card — reveal team votes.",
    description:
      "Simulated planning poker: pick 1/2/3/5/8/13, then flip to see mock team votes and consensus.",
    tracks: ["interactive"],
    demoHook: "Pick 8 — reveal that the 'team' split between 5 and 13.",
    buildBrief:
      "Fibonacci card picker. Flip animation reveals 3 mock teammate votes. Highlight spread vs consensus. New story button.",
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
