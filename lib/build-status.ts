import fs from "fs";
import path from "path";

export interface BuildStatus {
  ready: boolean;
  slug: string;
  demoPath: string;
  reason?: "invalid_slug" | "no_page" | "template_only" | "no_projects";
}

const SLUG_PATTERN = /^[a-z0-9-]+$/i;

export function getBuildStatus(slug: string): BuildStatus {
  const demoPath = `/build/${slug}`;

  if (!SLUG_PATTERN.test(slug)) {
    return { ready: false, slug, demoPath, reason: "invalid_slug" };
  }

  const root = process.cwd();
  const pagePath = path.join(root, "app/build", slug, "page.tsx");
  const projectsDir = path.join(root, "projects", slug);

  if (!fs.existsSync(pagePath)) {
    return { ready: false, slug, demoPath, reason: "no_page" };
  }

  const content = fs.readFileSync(pagePath, "utf-8");
  if (
    content.includes("Your tool goes here") ||
    content.includes("BuildTemplatePage")
  ) {
    return { ready: false, slug, demoPath, reason: "template_only" };
  }

  const hasProjects =
    fs.existsSync(projectsDir) &&
    fs.readdirSync(projectsDir).some((f) => !f.startsWith("."));

  if (!hasProjects && !content.includes(`projects/${slug}`)) {
    return { ready: false, slug, demoPath, reason: "no_projects" };
  }

  return { ready: true, slug, demoPath };
}
