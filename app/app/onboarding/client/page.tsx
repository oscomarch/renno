import { redirect } from "next/navigation";

import { saveClientProfileAction } from "@/app/app/actions";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { getAuthenticatedHome, getCurrentAccount } from "@/lib/auth";

export default async function ClientOnboardingPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const { user, profile } = await getCurrentAccount();

  if (!user) {
    redirect("/app/login?next=/app/onboarding/client");
  }

  if (profile?.role === "pro") {
    redirect("/app/pro/dashboard");
  }

  if (profile?.onboarding_completed) {
    redirect(getAuthenticatedHome(profile));
  }

  return (
    <main className="container-shell py-16">
      <Card className="mx-auto max-w-3xl rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Client onboarding</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Tell us where you live and what you&apos;re planning.</h1>
        <p className="mt-4 max-w-2xl text-brown-400">
          We use this to personalize your dashboard and attach projects to the right location.
        </p>
        <form action={saveClientProfileAction} className="mt-8 space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={profile?.full_name ?? ""} name="full_name" placeholder="Full name" required />
            <Input defaultValue={profile?.location_city ?? ""} name="location_city" placeholder="City" required />
            <Input defaultValue={profile?.phone ?? ""} name="phone" placeholder="Phone number" />
            <Input defaultValue={profile?.property_type ?? ""} name="property_type" placeholder="Property type" />
          </div>
          {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
          <SubmitButton pendingLabel="Saving profile...">Finish onboarding</SubmitButton>
        </form>
      </Card>
    </main>
  );
}
