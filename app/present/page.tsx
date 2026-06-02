"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoffeeVsCommitsDashboard } from "@/components/dashboard";
import { useLocalStorage } from "@/lib/hooks";
import { DEMO_SCRIPT } from "@/lib/demo-script";
import { WORKSPACE_KEY, type BuildWorkspace } from "@/lib/build-workspace";

export default function PresentPage() {
  const [projectName] = useLocalStorage("pk-project-name", "Coffee vs Commits");
  const [workspace] = useLocalStorage<BuildWorkspace | null>(
    WORKSPACE_KEY,
    null
  );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/kitchen">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
              Back to Kitchen
            </Button>
          </Link>
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300">
            📊 VISUAL DASHBOARD · LIVE
          </span>
        </div>

        <div className="mb-10 text-center">
          <p className="mb-2 text-sm text-kitchen-muted">Now serving</p>
          <h1 className="mb-3 text-5xl font-bold tracking-tight md:text-6xl">
            {projectName}
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-zinc-400">
            The chart proves it: more coffee, more commits. (Do not question the
            methodology.)
          </p>
        </div>

        {workspace && (
          <Card className="mb-8 border-cyan-500/30 bg-cyan-950/10">
            <p className="text-sm text-cyan-300">Isolated build workspace:</p>
            <Link href={workspace.demoPath} className="mt-3 inline-block">
              <Button size="lg" className="w-full sm:w-auto">
                <ExternalLink className="h-4 w-4" />
                Open {workspace.demoPath}
              </Button>
            </Link>
            <p className="mt-2 font-mono text-xs text-kitchen-muted">
              {workspace.pageFile}
            </p>
          </Card>
        )}

        <div className="mb-12">
          <CoffeeVsCommitsDashboard />
        </div>

        <Card>
          <h2 className="mb-4 font-semibold">30-Second Service Script</h2>
          <ol className="space-y-3 text-sm text-zinc-300">
            {DEMO_SCRIPT.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-xs font-bold text-amber-400">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </Card>

        <p className="mt-8 text-center text-xs text-kitchen-muted">
          {appUrl ? (
            <>
              Live at{" "}
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                {appUrl}
                <ExternalLink className="ml-1 inline h-3 w-3" />
              </a>
            </>
          ) : (
            <>
              Deploy with{" "}
              <code className="text-amber-400">npx vercel</code> and set{" "}
              <code className="text-amber-400">NEXT_PUBLIC_APP_URL</code> in
              .env.local
            </>
          )}
        </p>
      </div>
    </div>
  );
}
