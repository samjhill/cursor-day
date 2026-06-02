import { NextResponse } from "next/server";
import { getBuildStatus } from "@/lib/build-status";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const status = getBuildStatus(slug);
  return NextResponse.json(status);
}
