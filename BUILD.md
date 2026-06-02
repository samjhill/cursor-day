# BUILD.md — Hour-by-Hour Plan

**Total build time: ~2 hours 15 min** (9:45 AM → 12:00 PM, with buffer)

---

## Before 9:00 AM (prep — you're doing this now ✅)

- [x] Clone/open this repo
- [ ] `npm install && npm run dev` — confirm localhost works
- [ ] Skim README + pick a **default track** (recommend: AI Micro-Tool)
- [ ] Charge laptop, test hotspot as WiFi backup
- [ ] Optional: `npx vercel login` so deploy is one command later

---

## 9:00 – 9:15 · Kickoff

**Do:** Listen, note any announcements about prizes or constraints.

**Don't:** Start coding yet.

---

## 9:15 – 9:45 · Q&A with Jon Kaplan

**Questions worth asking:**
- What's the team's favorite Agent workflow for hackathon-speed builds?
- Any MCP servers they'd demo live?
- Where is Cursor headed in the next 6 months? (off-the-record gold)

**Do:** Refine your track choice based on what excites you.

---

## 9:45 – 10:00 · Setup (15 min)

1. Open `/kitchen` → pick track + ingredients
2. Name your project + write one-line pitch
3. **Copy recipe → Cursor Agent (⌘I)** → kick off first build task
4. While Agent runs: open `/present` and know where demo placeholder lives

**Checkpoint:** Agent has started on core feature. You know what you're building.

---

## 10:00 – 11:00 · Core Build (60 min)

**Focus:** ONE core interaction working end-to-end.

| Track | Build this first |
|-------|------------------|
| AI Micro-Tool | Input form → API route → output display |
| Visual Dashboard | One animated chart with real or mock data |
| Interactive | Core game loop / one satisfying interaction |

**Agent tips:**
- "Build X only. Stop when I can test at localhost."
- Test after every Agent turn — don't queue 5 tasks blindly
- If blocked 10+ min → simplify or switch track

**Checkpoint:** Feature works locally. You could demo it badly.

---

## 11:00 – 11:30 · Polish + Present Mode (30 min)

1. Replace placeholder in `app/present/page.tsx` with your live feature
2. Add one "wow" moment: animation, sound, or unexpected output
3. Practice demo once out loud (use timer — 30 sec max)
4. Fix anything that breaks during practice

**Checkpoint:** `/present` shows your real demo. 30-sec script feels natural.

---

## 11:30 – 11:55 · Deploy + Backup (25 min)

```bash
npx vercel --prod
```

- Add URL to `.env.local` as `NEXT_PUBLIC_APP_URL`
- Screenshot or 15-sec screen recording as WiFi backup
- Write demo opener on a sticky note / phone

**Checkpoint:** Live URL works on your phone.

---

## 12:00 · Show & Tell

See `DEMO.md`. Volunteer early if confident — first demos set the energy.

---

## If You're Behind at 11:00

**Cut scope immediately:**
1. Drop MCP, deploy, and "garnish" ingredients
2. Mock AI responses instead of wiring API keys
3. Demo from localhost if deploy fails — honest + fast beats broken URL
4. Your meta story ("built this scaffold + feature in 2 hours with Cursor") is itself impressive

---

## If You're Ahead at 11:00

**Add one of these (max 20 min each):**
- Deploy + QR code on present page
- Keyboard shortcut for demo (press `D` → demo mode)
- One MCP integration with a real data source
- "Built with Cursor" easter egg animation

Do NOT start a second feature.
