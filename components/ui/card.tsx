import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        "rounded-xl border border-kitchen-border bg-kitchen-surface p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
