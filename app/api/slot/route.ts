import { NextResponse } from "next/server";
import { mockEnhance, type SlotResult } from "@/lib/slot-data";

async function callOpenAI(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 200,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? null;
}

async function callAnthropic(prompt: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? "claude-3-5-haiku-latest",
      max_tokens: 200,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const block = data.content?.find((b: { type: string }) => b.type === "text");
  return block?.text?.trim() ?? null;
}

function buildEnhancePrompt(result: SlotResult): string {
  return `You are a hackathon coach at "Cook with Cursor Day" in NYC. Rewrite this build prompt into one punchy, inspiring sentence (max 40 words). Keep audience, feature, and twist. No bullet points.

Audience: ${result.audience}
Feature: ${result.feature}
Twist: ${result.twist}`;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.action || body.action !== "enhance") {
    return NextResponse.json({ error: "action must be 'enhance'" }, { status: 400 });
  }

  const result = body.result as SlotResult | undefined;
  if (!result?.audience || !result?.feature || !result?.twist) {
    return NextResponse.json(
      { error: "result with audience, feature, and twist is required" },
      { status: 400 }
    );
  }

  const prompt = buildEnhancePrompt(result);
  const aiText =
    (await callOpenAI(prompt)) ?? (await callAnthropic(prompt));

  if (aiText) {
    return NextResponse.json({ enhanced: aiText, mock: false });
  }

  return NextResponse.json({
    enhanced: mockEnhance(result),
    mock: true,
  });
}
