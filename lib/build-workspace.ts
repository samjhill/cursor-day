import type { ToolIdea } from "./tool-ideas";

export interface BuildWorkspace {
  slug: string;
  toolId: string;
  toolName: string;
  createdAt: string;
  /** Route for show & tell — e.g. /build/commit-msg-chef-x7k2 */
  demoPath: string;
  /** Primary page Cursor should create (copy from _template) */
  pageFile: string;
  /** Shared logic, hooks, utils for this build only */
  projectsDir: string;
  /** Optional API route for this build only */
  apiFile: string;
}

export const WORKSPACE_KEY = "pk-build-workspace";
export const WORKSPACE_HISTORY_KEY = "pk-build-history";

export function createBuildWorkspace(tool: ToolIdea): BuildWorkspace {
  const suffix = Math.random().toString(36).slice(2, 6);
  const slug = `${tool.id}-${suffix}`;

  return {
    slug,
    toolId: tool.id,
    toolName: tool.name,
    createdAt: new Date().toISOString(),
    demoPath: `/build/${slug}`,
    pageFile: `app/build/${slug}/page.tsx`,
    projectsDir: `projects/${slug}/`,
    apiFile: `app/api/build/${slug}/route.ts`,
  };
}

export function workspacePromptBlock(ws: BuildWorkspace): string {
  return `## Isolated workspace (CRITICAL — do not overwrite other builds)
Each roll gets its own folder. This build's slug: \`${ws.slug}\`

**ONLY create or edit files inside this workspace:**
- \`${ws.pageFile}\` — main demo page (copy starter from \`app/build/_template/page.tsx\`)
- \`${ws.projectsDir}\` — components, hooks, lib for this tool only
- \`${ws.apiFile}\` — optional API route (only if needed)

**DO NOT modify:**
- \`app/kitchen/\`, \`app/present/\`, \`app/page.tsx\`, \`components/experience.tsx\`
- \`next.config.ts\`, \`package.json\`, \`.github/\` — breaks the running dev server
- Other \`app/build/*\` folders from previous rolls
- Shared \`components/ui/\` unless adding a generic primitive

**Demo URL when done:** ${ws.demoPath}
**After building:** user opens ${ws.demoPath} for show & tell (not /present).`;
}

export function workspaceFileHints(ws: BuildWorkspace): string[] {
  return [
    `app/build/_template/page.tsx — copy to ${ws.pageFile}`,
    `${ws.projectsDir}widget.tsx — main UI component`,
    ws.apiFile + " — optional",
  ];
}

export function registerWorkspaceHistory(ws: BuildWorkspace) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(WORKSPACE_HISTORY_KEY);
    const history: BuildWorkspace[] = raw ? JSON.parse(raw) : [];
    const next = [ws, ...history.filter((h) => h.slug !== ws.slug)].slice(0, 12);
    localStorage.setItem(WORKSPACE_HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
