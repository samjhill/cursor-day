"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { clsx } from "clsx";
import { pickRandomQuestion } from "./questions";
import type { AnswerState, QuestionSet, Topic } from "./types";
import { TOPICS } from "./types";

const MYSTERY_EMOJI = "🕵️";

export function TwoTruthsWidget() {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [question, setQuestion] = useState<QuestionSet | null>(null);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const startTopic = useCallback((t: Topic) => {
    setTopic(t);
    setQuestion(pickRandomQuestion(t));
    setPickedIndex(null);
    setRevealed(false);
  }, []);

  const nextQuestion = useCallback(() => {
    if (!topic) return;
    setQuestion((prev) => pickRandomQuestion(topic, prev?.id));
    setPickedIndex(null);
    setRevealed(false);
  }, [topic]);

  const pickAnswer = useCallback(
    (index: number) => {
      if (revealed || !question) return;
      setPickedIndex(index);
      setRevealed(true);
    },
    [question, revealed]
  );

  const revealLie = useCallback(() => {
    if (!question || revealed) return;
    setRevealed(true);
  }, [question, revealed]);

  useEffect(() => {
    if (!question) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "3" && !revealed) {
        e.preventDefault();
        pickAnswer(Number(e.key) - 1);
        return;
      }
      if (e.key === "r" || e.key === "R") {
        if (revealed) nextQuestion();
        else revealLie();
      }
      if (e.key === "Escape" && topic) {
        setTopic(null);
        setQuestion(null);
        setPickedIndex(null);
        setRevealed(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [question, revealed, pickAnswer, nextQuestion, revealLie, topic]);

  const getStatementState = (index: number): AnswerState => {
    if (!revealed || !question) return "idle";
    if (pickedIndex === index && index === question.lieIndex) return "correct";
    if (index === question.lieIndex) return "wrong";
    if (pickedIndex === index) return "wrong";
    return "idle";
  };

  const wasCorrect =
    revealed && pickedIndex !== null && pickedIndex === question?.lieIndex;

  if (!topic || !question) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <header className="mb-10 text-center">
          <p className="text-5xl sm:text-6xl">{MYSTERY_EMOJI}</p>
          <h1 className="mt-4 text-3xl font-bold sm:text-5xl gradient-text">
            Two Truths &amp; A Lie
          </h1>
          <p className="mt-2 text-xl text-zinc-400 sm:text-2xl">
            Code Edition {MYSTERY_EMOJI}
          </p>
          <p className="mt-4 text-lg text-zinc-500">
            Pick a topic — spot the lie before the crowd does.
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-3">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => startTopic(t.id)}
              className="group rounded-xl border border-kitchen-border bg-kitchen-surface p-8 text-center transition-all hover:border-violet-500/50 hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.98]"
            >
              <span className="text-5xl">{t.emoji}</span>
              <span className="mt-4 block text-2xl font-bold text-zinc-100 group-hover:text-white">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const topicMeta = TOPICS.find((t) => t.id === topic)!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      <header className="mb-6 text-center sm:mb-8">
        <p className="text-4xl sm:text-5xl">{MYSTERY_EMOJI}</p>
        <h1 className="mt-2 text-2xl font-bold sm:text-4xl gradient-text">
          Two Truths &amp; A Lie: {topicMeta.label} {topicMeta.emoji}
        </h1>
        <p className="mt-2 text-base text-zinc-500 sm:text-lg">
          Press <kbd className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-300">1</kbd>{" "}
          <kbd className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-300">2</kbd>{" "}
          <kbd className="rounded bg-zinc-800 px-2 py-0.5 text-zinc-300">3</kbd> to
          pick — audience shouts, you reveal!
        </p>
      </header>

      <Card className="border-kitchen-border/80 p-4 sm:p-8">
        <p className="mb-6 text-center text-lg font-medium text-zinc-300 sm:text-xl">
          Which statement is the <span className="text-red-400">lie</span>?
        </p>

        <ul className="space-y-4">
          {question.statements.map((text, index) => {
            const state = getStatementState(index);
            const isLie = index === question.lieIndex;
            const showAsLie = revealed && isLie && pickedIndex !== question.lieIndex;

            return (
              <li key={index}>
                <button
                  type="button"
                  disabled={revealed}
                  onClick={() => pickAnswer(index)}
                  className={clsx(
                    "w-full rounded-xl border-2 p-4 text-left transition-all duration-300 sm:p-6",
                    "flex items-start gap-4 sm:gap-5",
                    state === "idle" &&
                      !revealed &&
                      "border-kitchen-border bg-zinc-900/50 hover:border-violet-500/60 hover:bg-violet-500/5 active:scale-[0.99]",
                    state === "idle" && revealed && !showAsLie && "border-zinc-700/50 bg-zinc-900/30 opacity-60",
                    showAsLie && "animate-pulse border-red-500 bg-red-500/20 shadow-lg shadow-red-500/20",
                    state === "correct" && "border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/20",
                    pickedIndex === index &&
                      revealed &&
                      pickedIndex !== question.lieIndex &&
                      "border-red-500 bg-red-500/20"
                  )}
                >
                  <span
                    className={clsx(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xl font-bold sm:h-12 sm:w-12 sm:text-2xl",
                      showAsLie && "bg-red-500 text-white",
                      state === "correct" && "bg-emerald-500 text-white",
                      state === "idle" && !revealed && "bg-violet-600/30 text-violet-300",
                      state === "idle" && revealed && !showAsLie && "bg-zinc-800 text-zinc-500"
                    )}
                  >
                    {index + 1}
                  </span>
                  <span className="text-base leading-relaxed text-zinc-100 sm:text-xl">{text}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {revealed && (
          <div
            className={clsx(
              "mt-6 animate-fade-in rounded-xl border p-4 sm:p-6",
              wasCorrect
                ? "border-emerald-500/50 bg-emerald-500/10"
                : pickedIndex !== null
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-amber-500/50 bg-amber-500/10"
            )}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              {wasCorrect
                ? "🎯 Nailed it!"
                : pickedIndex !== null
                  ? "❌ That was a truth!"
                  : `🕵️ The lie was #${question.lieIndex + 1}`}
            </p>
            <p className="mt-2 text-base leading-relaxed text-zinc-200 sm:text-lg">
              {question.explanation}
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {!revealed && (
            <Button size="lg" onClick={revealLie} variant="outline">
              Reveal the lie (R)
            </Button>
          )}
          {revealed && (
            <Button size="lg" onClick={nextQuestion}>
              Next round (R)
            </Button>
          )}
          <Button size="lg" variant="ghost" onClick={() => setTopic(null)}>
            Change topic
          </Button>
        </div>
      </Card>
    </div>
  );
}
