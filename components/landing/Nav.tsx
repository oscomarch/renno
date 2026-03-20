"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div
        className={cn(
          "container-shell flex items-center justify-between rounded-full border border-transparent py-3 transition-all duration-300",
          scrolled && "border-cream-300 bg-cream-100/80 shadow-sm backdrop-blur"
        )}
      >
        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-brown-800">
          renno<span className="text-terracotta-500">.</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link className="px-3 py-2 text-xs font-medium uppercase tracking-[0.18em] text-brown-500" href="/app/login">
            Log in
          </Link>
          <Button className="gap-3 px-4 py-2.5 text-xs uppercase tracking-[0.14em]" href="/app/signup">
            Get started
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">S</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
