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
    <aside className="hidden min-h-screen w-[272px] shrink-0 border-r border-cream-300/90 bg-white/80 px-5 py-5 backdrop-blur lg:flex lg:flex-col">
      <div className="rounded-[28px] border border-cream-300 bg-cream-50/80 p-4">
        <Link href="/" className="font-serif text-3xl font-bold tracking-tight text-brown-800">
          renno<span className="text-terracotta-500">.</span>
        </Link>
        <p className="mt-3 text-sm leading-6 text-brown-500">
          {profile?.role === "pro"
            ? "A calmer workspace for leads, quotes, and jobs."
            : "A calmer workspace for projects, quotes, and updates."}
        </p>
      </div>
      <div className="mt-8">
        <p className="px-3 text-xs uppercase tracking-[0.18em] text-brown-400">Workspace</p>
      </div>
      <nav className="mt-3 space-y-1.5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-all",
                active
                  ? "border-terracotta-200 bg-terracotta-50 text-brown-800 shadow-sm shadow-terracotta-500/5"
                  : "border-transparent text-brown-500 hover:border-cream-300 hover:bg-cream-50 hover:text-brown-700"
              )}
            >
              <span
                className={cn(
                  "rounded-xl border p-2",
                  active ? "border-terracotta-200 bg-white text-terracotta-600" : "border-cream-300 bg-white text-brown-500"
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto pt-20">
        <div className="rounded-[24px] border border-brown-700 bg-brown-800 p-4 text-cream-100 shadow-sm shadow-brown-900/20">
          <p className="text-xs uppercase tracking-[0.18em] text-cream-200">Account</p>
          <p className="mt-3 font-medium">{profile?.fullName ?? "Renno user"}</p>
          <p className="text-sm text-cream-200">{profile?.role === "pro" ? "Professional" : "Homeowner"}</p>
          <p className="mt-1 text-sm text-cream-300">{profile?.email ?? ""}</p>
          {profile?.locationCity ? <p className="mt-2 text-sm text-cream-300">{profile.locationCity}</p> : null}
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
