import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/Input";

export function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-5 rounded-[28px] border border-cream-300 bg-white/80 p-5 shadow-sm shadow-brown-900/5 sm:flex-row sm:items-start sm:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Workspace</p>
        <h1 className="mt-2 font-serif text-4xl leading-tight text-brown-800">{title}</h1>
        <p className="mt-3 max-w-xl text-brown-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3 sm:pt-1">
        <div className="relative hidden min-w-[20rem] sm:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown-400" />
          <Input className="border-cream-300 bg-cream-50/70 pl-10" placeholder="Search projects, pros, messages" />
        </div>
        <button className="rounded-full border border-cream-300 bg-cream-50/70 p-3 text-brown-500 transition-colors hover:bg-white">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
