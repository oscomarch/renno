"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ next = "/app" }: { next?: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace(next);
    router.refresh();
  }

  function handleGoogleSignIn() {
    setError(null);
    startTransition(async () => {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}&role=client`;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo
        }
      });

      if (oauthError) {
        setError(oauthError.message);
      }
    });
  }

  return (
    <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
      <Input autoComplete="email" name="email" placeholder="Email" required type="email" />
      <Input autoComplete="current-password" name="password" placeholder="Password" required type="password" />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <Button className="w-full" disabled={pending} type="submit">
        Continue
      </Button>
      <Button className="w-full gap-3" disabled={pending} onClick={handleGoogleSignIn} type="button" variant="secondary">
        <GoogleIcon />
        {pending ? "Connecting..." : "Continue with Google"}
      </Button>
      <div className="flex items-center justify-between text-sm text-brown-400">
        <a href="/contact" className="hover:text-brown-700">
          Need help?
        </a>
        <a href="/app/signup" className="font-medium text-terracotta-600 hover:text-terracotta-700">
          Create account
        </a>
      </div>
      <p className="text-xs leading-6 text-brown-400">
        By continuing, you agree to Renno&apos;s <a href="/terms" className="text-brown-700 underline">Terms</a> and{" "}
        <a href="/privacy" className="text-brown-700 underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
