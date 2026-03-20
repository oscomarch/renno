"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, ClipboardList, LayoutDashboard, MessageSquare, Search, Settings, Wallet } from "lucide-react";

import { signOutAction } from "@/app/app/actions";
import { cn } from "@/lib/utils";
import type { Profile } from "@/types";

const clientItems = [
  { href: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/projects/new", label: "New project", icon: ClipboardList },
  { href: "/app/find-pros", label: "Find pros", icon: Search },
  { href: "/app/messages", label: "Messages", icon: MessageSquare },
  { href: "/app/settings", label: "Settings", icon: Settings }
];

const proItems = [
  { href: "/app/pro/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/pro/leads", label: "Leads", icon: Search },
  { href: "/app/pro/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/app/pro/quotes", label: "Quotes", icon: ClipboardList },
  { href: "/app/pro/earnings", label: "Earnings", icon: Wallet },
  { href: "/app/settings", label: "Settings", icon: Settings }
];

export function Sidebar({
  profile
}: {
  profile: (Profile & { locationCity?: string | null; propertyType?: string | null }) | null;
}) {
  const pathname = usePathname();
  const items = profile?.role === "pro" ? proItems : clientItems;

  return (
    <aside className="hidden min-h-screen w-[260px] shrink-0 border-r border-cream-300 bg-white/70 px-5 py-6 lg:flex lg:flex-col">
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
          <p className="mt-3 font-medium">{profile?.fullName ?? "Renno user"}</p>
          <p className="text-sm text-cream-200">{profile?.role === "pro" ? "Professional" : "Homeowner"}</p>
          <p className="mt-1 text-sm text-cream-300">{profile?.email ?? ""}</p>
          <form action={signOutAction} className="mt-4">
            <button className="text-sm font-medium text-terracotta-200 transition-colors hover:text-white" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
}
