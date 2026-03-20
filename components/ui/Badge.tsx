import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-cream-300 bg-cream-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-brown-500",
        className
      )}
    >
      {children}
    </span>
  );
}
