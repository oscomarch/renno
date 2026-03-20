"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, ClipboardList, LayoutDashboard, MessageSquare, Search, Settings, Wallet } from "lucide-react";

import { cn } from "@/lib/utils";

const items = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/projects/new", label: "New project", icon: ClipboardList },
  { href: "/app/find-pros", label: "Find pros", icon: Search },
  { href: "/app/pro/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/app/messages", label: "Messages", icon: MessageSquare },
  { href: "/app/settings", label: "Settings", icon: Settings },
  { href: "/app/pro/earnings", label: "Earnings", icon: Wallet }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] shrink-0 border-r border-cream-300 bg-white/70 px-5 py-6 lg:block">
      <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-brown-800">
        renno<span className="text-terracotta-500">.</span>
      </Link>
      <nav className="mt-10 space-y-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm text-brown-500 transition-all",
                active && "border-cream-300 bg-cream-100 text-brown-800",
                !active && "hover:bg-cream-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-20">
        <div className="rounded-[24px] bg-brown-800 p-4 text-cream-100">
          <p className="text-xs uppercase tracking-[0.18em] text-cream-200">Account</p>
          <p className="mt-3 font-medium">Olivia Harper</p>
          <p className="text-sm text-cream-200">Homeowner</p>
        </div>
      </div>
    </aside>
  );
}
