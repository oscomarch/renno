import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta-500 focus:ring-offset-2 focus:ring-offset-cream-100";

const variants = {
  primary: "bg-terracotta-500 text-white hover:bg-terracotta-600",
  secondary: "border border-cream-300 bg-white text-brown-700 hover:bg-cream-100",
  ghost: "text-brown-700 hover:bg-cream-200/80"
};

type ButtonProps = {
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  href?: string;
};

export function Button({ children, className, variant = "primary", href }: ButtonProps) {
  const classes = cn(baseStyles, variants[variant], className);
  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return <button className={classes}>{children}</button>;
}
