import { redirect } from "next/navigation";

import { SignupForm } from "@/components/auth/SignupForm";
import { Card } from "@/components/ui/Card";
import { getAuthenticatedHome, getCurrentAccount } from "@/lib/auth";

export default async function SignupPage() {
  const { user, profile } = await getCurrentAccount();

  if (user) {
    redirect(getAuthenticatedHome(profile));
  }

  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-3xl rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Get started</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Create your account</h1>
        <SignupForm />
      </Card>
    </main>
  );
}
