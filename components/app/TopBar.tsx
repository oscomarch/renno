import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/Input";

export function TopBar({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex flex-col gap-5 border-b border-cream-300 pb-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Workspace</p>
        <h1 className="mt-2 font-serif text-4xl text-brown-800">{title}</h1>
        <p className="mt-2 text-brown-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden min-w-72 sm:block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brown-400" />
          <Input className="pl-10" placeholder="Search projects, pros, messages" />
        </div>
        <button className="rounded-full border border-cream-300 bg-white p-3 text-brown-500">
          <Bell className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
