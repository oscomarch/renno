import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui/Card";
import { getAuthenticatedHome, getCurrentAccount } from "@/lib/auth";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: { next?: string; error?: string };
}) {
  const { user, profile } = await getCurrentAccount();

  if (user) {
    redirect(getAuthenticatedHome(profile));
  }

  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Welcome back</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Log in</h1>
        {searchParams?.error ? <p className="mt-4 text-sm text-red-600">{searchParams.error}</p> : null}
        <LoginForm next={searchParams?.next ?? "/app"} />
      </Card>
    </main>
  );
}
