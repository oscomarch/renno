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
    <main className="container-shell grid min-h-screen items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="hidden rounded-[36px] border border-cream-300 bg-white/70 p-10 lg:block">
        <p className="section-label">Welcome back</p>
        <h1 className="mt-6 font-serif text-6xl leading-tight text-brown-800">Pick up the renovation right where you left it.</h1>
        <div className="mt-10 space-y-5 text-brown-500">
          <p>Track every quote, message, milestone, and payment in one calm workspace.</p>
          <p>Clients see only their own projects. Professionals see only the leads and jobs they&apos;re part of.</p>
        </div>
      </div>
      <Card className="mx-auto w-full max-w-xl rounded-[32px] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Welcome back</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Log in</h1>
        <p className="mt-4 text-brown-400">Use your email or continue with Google to access your Renno workspace.</p>
        {searchParams?.error ? <p className="mt-4 text-sm text-red-600">{searchParams.error}</p> : null}
        <LoginForm next={searchParams?.next ?? "/app"} />
      </Card>
    </main>
  );
}
