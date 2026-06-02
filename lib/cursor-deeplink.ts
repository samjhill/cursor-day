/** @see https://cursor.com/docs/reference/deeplinks */

export const CURSOR_PROMPT_DEEPLINK_MAX_URL = 8000;
export const CURSOR_PROMPT_SAFE_TEXT_CHARS = 3500;

const CURSOR_APP_PROMPT_BASE = "cursor://anysphere.cursor-deeplink/prompt";
const CURSOR_WEB_PROMPT_BASE = "https://cursor.com/link/prompt";

export function truncatePromptForDeeplink(text: string): string {
  const raw = String(text || "");
  if (raw.length <= CURSOR_PROMPT_SAFE_TEXT_CHARS) return raw;
  return `${raw.slice(0, CURSOR_PROMPT_SAFE_TEXT_CHARS - 1)}…`;
}

export function buildCursorPromptDeeplink(
  base: string,
  text: string
): string {
  const url = new URL(base);
  url.searchParams.set("text", text);
  return url.toString();
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
  const text = truncatePromptForDeeplink(full);
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
    truncated: text.length < full.length,
  };
}
