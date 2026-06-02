import type { CookRequest, CookResponse } from "./cook-types";
import { mockSimmer, mockPlate } from "./simmer-engine";

function clientMock(body: CookRequest): CookResponse {
  if (body.action === "simmer") {
    return mockSimmer(
      body.dishName,
      body.pitch ?? "",
      body.trackId,
      body.ingredients ?? [],
      body.spice
    );
  }
  return mockPlate(
    body.input,
    body.dishName ?? "Chef's Special",
    body.trackId ?? "ai-tool",
    body.ingredients ?? [],
    body.spice
  );
}

export async function callCook(body: CookRequest): Promise<CookResponse> {
  const useApi = process.env.NEXT_PUBLIC_USE_API !== "false";

  if (useApi) {
    try {
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const res = await fetch(`${base}/api/cook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) return (await res.json()) as CookResponse;
    } catch {
      /* fall through to client mock */
    }
  }

  return clientMock(body);
}
