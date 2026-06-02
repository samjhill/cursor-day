"use client";

import { useEffect, useRef } from "react";

const POLL_INTERVAL_MS = 2000;
const INITIAL_DELAY_MS = 1500;

interface Options {
  slug: string | null;
  enabled: boolean;
  onReady: (demoPath: string) => void;
}

export function useBuildReadyPoll({ slug, enabled, onReady }: Options) {
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    if (!enabled || !slug) return;

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const poll = async () => {
      if (cancelled) return;

      try {
        const res = await fetch(`/api/build/${encodeURIComponent(slug)}/status`);
        if (!res.ok) throw new Error("status check failed");
        const data = (await res.json()) as { ready?: boolean; demoPath?: string };
        if (!cancelled && data.ready && data.demoPath) {
          onReadyRef.current(data.demoPath);
          return;
        }
      } catch {
        /* keep polling */
      }

      if (!cancelled) {
        timeoutId = setTimeout(poll, POLL_INTERVAL_MS);
      }
    };

    timeoutId = setTimeout(poll, INITIAL_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [slug, enabled]);
}
