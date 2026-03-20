"use client";

import type { HTMLProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn("relative min-h-screen overflow-hidden bg-cream-100 text-brown-800", className)}
      {...props}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1100px] overflow-hidden">
        <div
          className={cn(
            `
            absolute -inset-[10px] opacity-40 will-change-transform
            [--white:rgba(255,255,255,0.92)]
            [--cream:rgba(251,248,243,0.9)]
            [--terracotta-soft:rgba(196,88,26,0.22)]
            [--terracotta-bright:rgba(232,134,74,0.3)]
            [--sage-soft:rgba(107,147,96,0.18)]
            [--transparent:transparent]
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--cream)_8%,var(--transparent)_12%,var(--transparent)_16%,var(--white)_22%)]
            [--aurora:repeating-linear-gradient(100deg,var(--terracotta-soft)_10%,var(--terracotta-bright)_18%,var(--sage-soft)_26%,var(--cream)_34%,var(--terracotta-soft)_42%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_220%]
            [background-position:50%_50%,50%_50%]
            filter blur-[14px]
            after:absolute after:inset-0 after:content-['']
            after:[background-image:var(--white-gradient),var(--aurora)]
            after:[background-size:200%,_140%]
            after:[background-attachment:fixed]
            after:animate-aurora
            after:mix-blend-multiply
          `,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,rgba(0,0,0,0.82)_38%,transparent_72%)]"
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
