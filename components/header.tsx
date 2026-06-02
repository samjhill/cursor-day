import Link from "next/link";
import { ChefHat, Soup } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-kitchen-border bg-kitchen-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <ChefHat className="h-5 w-5 text-kitchen-warm" />
          <span>Prompt Kitchen</span>
          <span className="hidden text-sm text-kitchen-muted sm:inline">
            · est. 2026
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/kitchen" className="flex items-center gap-1.5 hover:text-amber-300">
            <Soup className="h-3.5 w-3.5" />
            Kitchen
          </Link>
          <Link href="/present" className="hover:text-zinc-100">
            🛎️ Pass
          </Link>
        </nav>
      </div>
    </header>
  );
}
