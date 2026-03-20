import { redirect } from "next/navigation";

import { getAuthenticatedHome, requireAccount } from "@/lib/auth";

export default async function AppIndexPage() {
  const { profile } = await requireAccount();
  redirect(getAuthenticatedHome(profile));
}
