/** Included in every generated Cursor prompt — keeps Agent from killing localhost. */

export const DEV_SERVER_GUARDRAILS = `## Dev server (CRITICAL — read before touching anything)
The user already has \`npm run dev\` running at **http://localhost:3000**. The kitchen scaffold is live.

**DO NOT:**
- Run \`npm run dev\`, \`npm start\`, \`next dev\`, or start any other server/process
- Run \`npm run build\`, \`npm run build:pages\`, or \`rm -rf .next\` / \`rm -rf out\`
- Kill, restart, or \`pkill\` processes on port 3000 (or any port)
- Modify \`next.config.ts\`, \`package.json\`, \`postcss.config.mjs\`, \`tsconfig.json\`, or \`.github/workflows/\`
- Change \`GITHUB_PAGES\`, \`output: 'export'\`, \`basePath\`, or deploy config

**DO:**
- Edit only workspace files (see isolated workspace section)
- Tell the user to **refresh the browser** at their demo route — Next.js hot reload handles the rest
- If the page 404s before first save, that is expected until \`app/build/{slug}/page.tsx\` exists

Deploy (\`npx vercel\`) is for the **user at the end** — not for Agent to run mid-build.`;

export const DEV_SERVER_CHECKLIST = [
  "Do NOT run npm run dev — server already running on :3000",
  "Refresh browser at your /build/{slug} route to see changes",
];

export function devGuardrailsForDemo(demoPath: string): string {
  return `${DEV_SERVER_GUARDRAILS}\n\n**This build's demo URL (refresh, don't restart):** ${demoPath}`;
}
