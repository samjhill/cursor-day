"use client";

import Link from "next/link";
import { ChefHat, Flame, Presentation, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TRACKS } from "@/lib/tracks";
import { TOOL_IDEAS, toolsForTrack } from "@/lib/tool-ideas";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <section className="mb-20 text-center">
        <div className="relative mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-200">
          <Flame className="h-4 w-4 text-kitchen-warm" />
          NYC Cook with Cursor · June 2, 2026
          <span className="absolute -right-1 -top-1 text-lg">🍳</span>
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl">
          Welcome to the <span className="gradient-text">Prompt Kitchen</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-400">
          Roll the dice. Simmer your recipe. Plate your idea. Serve at show &
          tell — the kitchen actually cooks now.
        </p>
        <p className="mx-auto mb-10 max-w-xl text-sm italic text-amber-200/70">
          &ldquo;In this kitchen, chaos is a feature — not a bug.&rdquo;
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/kitchen">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-600 shadow-lg shadow-amber-900/30 hover:from-amber-400 hover:to-orange-500"
            >
              <Dices className="h-5 w-5" />
              Roll the Dice
            </Button>
          </Link>
          <Link href="/kitchen">
            <Button size="lg" variant="outline">
              <ChefHat className="h-5 w-5" />
              Enter Kitchen
            </Button>
          </Link>
          <Link href="/present">
            <Button variant="ghost" size="lg">
              <Presentation className="h-5 w-5" />
              Pass · Present
            </Button>
          </Link>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Today&apos;s Service
        </h2>
        <p className="mb-8 text-center text-sm text-kitchen-muted">
          From prep to plate in one morning
        </p>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { time: "9:00", label: "Doors Open", emoji: "🚪", status: "done" },
            { time: "9:15", label: "Chef's Table Q&A", emoji: "👨‍🍳", status: "done" },
            { time: "9:45", label: "Line Cooks Build", emoji: "🔥", status: "active" },
            { time: "12:00", label: "Service! Show & Tell", emoji: "🛎️", status: "upcoming" },
          ].map((item) => (
            <Card
              key={item.time}
              className={
                item.status === "active"
                  ? "border-amber-500/50 ring-1 ring-amber-500/20"
                  : ""
              }
            >
              <p className="text-2xl">{item.emoji}</p>
              <p className="mt-2 text-sm text-kitchen-muted">{item.time} AM</p>
              <p className="font-medium">{item.label}</p>
              {item.status === "active" && (
                <p className="mt-2 text-xs text-amber-400">← Aprons on</p>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-20">
        <Card className="border-amber-500/20 bg-gradient-to-br from-kitchen-surface to-amber-950/10 text-center">
          <p className="text-4xl">🎲</p>
          <h2 className="mt-4 text-2xl font-semibold">Chef&apos;s Roulette</h2>
          <p className="mx-auto mt-2 max-w-lg text-zinc-400">
            Three dice decide your course, ingredient count, and a wild spice
            constraint. Can&apos;t pick? Let fate season your hackathon.
          </p>
          <Link href="/kitchen" className="mt-6 inline-block">
            <Button>
              <Dices className="h-4 w-4" />
              Roll for Today&apos;s Special
            </Button>
          </Link>
        </Card>
      </section>

      <section className="mb-20">
        <h2 className="mb-2 text-center text-2xl font-semibold">
          What You Might Build
        </h2>
        <p className="mb-8 text-center text-sm text-zinc-400">
          {TOOL_IDEAS.length} useful tools in the menu — the dice pick one for your track
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {TRACKS.map((track) => (
            <Card key={track.id}>
              <h3 className="mb-4 font-semibold">
                {track.emoji} {track.name}
              </h3>
              <ul className="space-y-3">
                {toolsForTrack(track.id).slice(0, 4).map((t) => (
                  <li key={t.id} className="text-sm">
                    <span className="mr-1">{t.emoji}</span>
                    <span className="font-medium text-zinc-200">{t.name}</span>
                    <p className="text-xs text-kitchen-muted">{t.tagline}</p>
                  </li>
                ))}
              </ul>
              {toolsForTrack(track.id).length > 4 && (
                <p className="mt-4 text-xs text-kitchen-muted">
                  +{toolsForTrack(track.id).length - 4} more on the roll
                </p>
              )}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 text-center text-2xl font-semibold">
          Pick a Course
        </h2>
        <p className="mb-8 text-center text-zinc-400">
          Or let the dice choose for you at{" "}
          <code className="text-amber-400">/kitchen</code>
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {TRACKS.map((track) => (
            <Link key={track.id} href={`/kitchen?track=${track.id}`}>
              <Card className="h-full transition-colors hover:border-amber-500/40">
                <span className="text-3xl">{track.emoji}</span>
                <h3 className="mt-4 text-lg font-semibold">{track.name}</h3>
                <p className="mt-2 text-sm text-zinc-400">{track.description}</p>
                <p className="mt-4 text-xs text-kitchen-muted">
                  Plate time: {track.demoSeconds}s · Heat: {track.difficulty}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
