"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

import { GoogleIcon } from "@/components/auth/GoogleIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

type Role = "client" | "pro";

export function SignupForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("client");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const fullName = String(formData.get("full_name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const redirectPath = role === "pro" ? "/app/onboarding/pro" : "/app/onboarding/client";
    const supabase = createClient();

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}&role=${role}`,
        data: {
          full_name: fullName,
          role
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (data.session) {
      router.replace(redirectPath);
      router.refresh();
      return;
    }

    setMessage("Check your email to confirm your account, then you will be redirected back to Renno.");
  }

  function handleGoogleSignIn() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      const supabase = createClient();
      const redirectPath = role === "pro" ? "/app/onboarding/pro" : "/app/onboarding/client";
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectPath)}&role=${role}`;

      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo }
      });

      if (oauthError) {
        setError(oauthError.message);
      }
    });
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-3 md:grid-cols-2">
        <button
          className={`rounded-[24px] border p-5 text-left transition-all ${
            role === "client" ? "border-terracotta-400 bg-terracotta-50" : "border-cream-300 bg-cream-50"
          }`}
          onClick={() => setRole("client")}
          type="button"
        >
          <h2 className="font-serif text-3xl text-brown-800">I&apos;m a homeowner</h2>
          <p className="mt-3 text-brown-400">Post a project, compare quotes, and pay in milestones.</p>
        </button>
        <button
          className={`rounded-[24px] border p-5 text-left transition-all ${
            role === "pro" ? "border-terracotta-400 bg-terracotta-50" : "border-cream-300 bg-cream-50"
          }`}
          onClick={() => setRole("pro")}
          type="button"
        >
          <h2 className="font-serif text-3xl text-brown-800">I&apos;m a professional</h2>
          <p className="mt-3 text-brown-400">Get matched with clients and manage jobs, quotes, and payouts.</p>
        </button>
      </div>

      <input name="role" type="hidden" value={role} />
      <Input autoComplete="name" name="full_name" placeholder="Full name" required />
      <Input autoComplete="email" name="email" placeholder="Email" required type="email" />
      <Input autoComplete="new-password" minLength={8} name="password" placeholder="Password" required type="password" />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-sage-700">{message}</p> : null}

      <Button className="w-full" disabled={pending} type="submit">
        Create account
      </Button>
      <Button className="w-full gap-3" disabled={pending} onClick={handleGoogleSignIn} type="button" variant="secondary">
        <GoogleIcon />
        Continue with Google
      </Button>
      <p className="text-xs leading-6 text-brown-400">
        By creating an account, you agree to Renno&apos;s <a href="/terms" className="text-brown-700 underline">Terms</a> and{" "}
        <a href="/privacy" className="text-brown-700 underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
