"use client";

import { useState } from "react";

export function CursorBadge() {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setRevealed((v) => !v)}
      className="group fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full border border-kitchen-border bg-kitchen-surface/90 px-3 py-1.5 text-xs text-zinc-500 backdrop-blur transition-all hover:border-violet-500/40 hover:text-zinc-300"
      aria-label="Built with Cursor easter egg"
    >
      <span
        className={`inline-block transition-transform duration-500 ${revealed ? "rotate-[360deg] scale-110" : "group-hover:rotate-12"}`}
      >
        ◆
      </span>
      <span
        className={`overflow-hidden transition-all duration-300 ${revealed ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100"}`}
      >
        Built with <span className="font-semibold text-violet-400">Cursor</span>
      </span>
    </button>
  );
}
