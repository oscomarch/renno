"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Sidebar } from "@/components/app/Sidebar";
import type { Profile } from "@/types";

const authLikePrefixes = ["/app/login", "/app/signup", "/app/onboarding"];

export function AppShell({
  children,
  profile
}: {
  children: ReactNode;
  profile: (Profile & { locationCity?: string | null; propertyType?: string | null }) | null;
}) {
  const pathname = usePathname();
  const showSidebar = !authLikePrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!showSidebar) {
    return <main className="container-shell py-6 sm:py-8">{children}</main>;
  }

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar profile={profile} />
      <div className="flex-1">
        <main className="container-shell py-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
