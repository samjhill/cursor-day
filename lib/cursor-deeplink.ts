/** @see https://cursor.com/docs/reference/deeplinks */

export const CURSOR_PROMPT_DEEPLINK_MAX_URL = 8000;

const CURSOR_APP_PROMPT_BASE = "cursor://anysphere.cursor-deeplink/prompt";
const CURSOR_WEB_PROMPT_BASE = "https://cursor.com/link/prompt";

const PROMPT_DEEPLINK_BASES = [CURSOR_APP_PROMPT_BASE, CURSOR_WEB_PROMPT_BASE] as const;

export function buildCursorPromptDeeplink(
  base: string,
  text: string
): string {
  const url = new URL(base);
  url.searchParams.set("text", text);
  return url.toString();
}

function promptDeeplinkUrlLength(base: string, text: string): number {
  return buildCursorPromptDeeplink(base, text).length;
}

/** Max prompt chars that fit all prompt deeplink bases within Cursor's URL limit. */
export function maxPromptCharsForDeeplink(
  fullText: string,
  maxUrlLength = CURSOR_PROMPT_DEEPLINK_MAX_URL
): number {
  const full = String(fullText || "");
  if (full.length === 0) return 0;

  const fits = (length: number) =>
    PROMPT_DEEPLINK_BASES.every(
      (base) => promptDeeplinkUrlLength(base, full.slice(0, length)) <= maxUrlLength
    );

  if (fits(full.length)) return full.length;

  let lo = 0;
  let hi = full.length;
  while (lo < hi) {
    const mid = Math.ceil((lo + hi) / 2);
    if (fits(mid)) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

/** Fit prompt text to Cursor's 8k deeplink URL limit (URL-encoded), without arbitrary char caps. */
export function fitPromptForDeeplink(
  text: string,
  maxUrlLength = CURSOR_PROMPT_DEEPLINK_MAX_URL
): { text: string; truncated: boolean } {
  const full = String(text || "");
  const maxChars = maxPromptCharsForDeeplink(full, maxUrlLength);
  const fitted = full.slice(0, maxChars);
  return { text: fitted, truncated: fitted.length < full.length };
}

/** @deprecated Use fitPromptForDeeplink — kept for callers that only need a string. */
export function truncatePromptForDeeplink(text: string): string {
  return fitPromptForDeeplink(text).text;
}

export interface CursorPromptLinks {
  text: string;
  appUrl: string;
  webUrl: string;
  urlTooLong: boolean;
  truncated: boolean;
}

export function buildCursorPromptLinks(prompt: string): CursorPromptLinks {
  const full = String(prompt || "");
  const { text, truncated } = fitPromptForDeeplink(full);
  const webUrl = buildCursorPromptDeeplink(CURSOR_WEB_PROMPT_BASE, text);
  const appUrl = buildCursorPromptDeeplink(CURSOR_APP_PROMPT_BASE, text);
  const urlTooLong =
    webUrl.length > CURSOR_PROMPT_DEEPLINK_MAX_URL ||
    appUrl.length > CURSOR_PROMPT_DEEPLINK_MAX_URL;

  return {
    text,
    webUrl,
    appUrl,
    urlTooLong,
    truncated,
  };
}

/** Open a cursor:// or https:// cursor deeplink without leaving the kitchen page. */
export function openCursorDeeplink(url: string, preferNewTab = false) {
  if (preferNewTab) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.style.display = "none";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}
