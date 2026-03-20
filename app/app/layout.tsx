import type { ReactNode } from "react";

import { AppShell } from "@/components/app/AppShell";
import { getCurrentAccount, mapProfileRow } from "@/lib/auth";

export default async function ProductLayout({ children }: { children: ReactNode }) {
  const { profile } = await getCurrentAccount();

  return (
    <AppShell profile={profile ? mapProfileRow(profile) : null}>{children}</AppShell>
  );
}
