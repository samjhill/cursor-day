import { NextResponse } from "next/server";
import type { CookRequest, CookResponse } from "@/lib/cook-types";
import {
  mockSimmer,
  mockPlate,
  buildSimmerPrompt,
  buildPlatePrompt,
  parseAiJson,
} from "@/lib/simmer-engine";

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
      temperature: 0.7,
      max_tokens: 600,
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? null;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as CookRequest | null;

  if (!body || !body.action) {
    return NextResponse.json({ error: "action is required" }, { status: 400 });
  }

  if (body.action === "simmer") {
    const { dishName, pitch, trackId, ingredients, spice } = body;
    if (!dishName?.trim() || !trackId) {
      return NextResponse.json(
        { error: "dishName and trackId are required" },
        { status: 400 }
      );
    }

    const aiText = await callOpenAI(
      buildSimmerPrompt(dishName, pitch ?? "", trackId, ingredients ?? [], spice)
    );

    if (aiText) {
      const parsed = parseAiJson<{
        features: string[];
        files: string[];
        demoScript: string;
        chefNote: string;
      }>(aiText);

      if (parsed?.features?.length) {
        const response: CookResponse = {
          action: "simmer",
          features: parsed.features.slice(0, 4),
          files: parsed.files?.slice(0, 4) ?? [],
          demoScript: parsed.demoScript ?? "",
          chefNote: parsed.chefNote ?? "Order up!",
          mock: false,
        };
        return NextResponse.json(response);
      }
    }

    return NextResponse.json(
      mockSimmer(dishName, pitch ?? "", trackId, ingredients ?? [], spice)
    );
  }

  if (body.action === "plate") {
    const { input, dishName, trackId, ingredients, spice } = body;
    if (!input?.trim()) {
      return NextResponse.json({ error: "input is required" }, { status: 400 });
    }

    const aiText = await callOpenAI(
      buildPlatePrompt(
        input,
        dishName ?? "Chef's Special",
        trackId ?? "ai-tool",
        ingredients ?? [],
        spice
      )
    );

    if (aiText) {
      const parsed = parseAiJson<{ output: string; garnish: string }>(aiText);
      if (parsed?.output) {
        const response: CookResponse = {
          action: "plate",
          output: parsed.output,
          garnish: parsed.garnish ?? "Bon appétit!",
          mock: false,
        };
        return NextResponse.json(response);
      }
    }

    return NextResponse.json(
      mockPlate(
        input,
        dishName ?? "Chef's Special",
        trackId ?? "ai-tool",
        ingredients ?? [],
        spice
      )
    );
  }

  return NextResponse.json({ error: "unknown action" }, { status: 400 });
}
