# Prompt Kitchen 🍳

**Your mise en place for NYC Cook with Cursor Day** — Tuesday, June 2, 2026.

A pre-scaffolded Next.js app themed for the event. Roll the dice, simmer a build plan, plate your idea, and serve at show & tell.

## Live Demo

**https://samjhill.github.io/cursor-day/**

(Pushes to `main` auto-deploy via GitHub Pages.)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## What's Included

| Path | Purpose |
|------|---------|
| `/` | Landing + track picker + event timeline |
| `/kitchen` | Dice roll, simmer, ingredients → Cursor deeplink + **isolated workspace** |
| `/build/{slug}` | Per-roll demo route (Cursor builds here) |
| `projects/{slug}/` | Tool components — won't overwrite other rolls |
| `/present` | Show & tell mode + track-specific widgets |
| `app/api/cook/route.ts` | Simmer/plate API (local dev; client mock on Pages) |
| `BUILD.md` | Hour-by-hour plan for the event |
| `DEMO.md` | 30-second demo script + judging tips |

## Three Tracks (pick one at 9:45)

1. **🤖 AI Micro-Tool** — Plate Your Idea (input → build plan)
2. **📊 Visual Dashboard** — Live kitchen analytics from your session
3. **🎮 Interactive Experience** — Iron Chef 2-minute build sprint

## Event Flow

```
9:00   Kickoff
9:15   Q&A with Jon Kaplan — ask about Agent, MCP, roadmap
9:45   → /kitchen: roll dice → simmer → Open in Cursor
12:00  → /present mode, 30-sec demo, win credits + swag
```

## Deploy

**GitHub Pages** (configured): push to `main`.

**Vercel** (optional, enables live OpenAI API):

```bash
npx vercel
# Set OPENAI_API_KEY for real AI simmer/plate responses
```

## Strategy for Winning Show & Tell

- **Live demo only** — no slides
- **Hook in 5 seconds** — what + who + why
- **Cursor meta story** — "Built with Agent in 2.5 hours" resonates here
- **Have a backup** — screenshot if WiFi fails

See `DEMO.md` for the full script.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- lucide-react icons
- localStorage persistence (no DB needed)

Built to be extended fast with Cursor Agent. Good luck — break a leg at show & tell! 👨‍🍳
