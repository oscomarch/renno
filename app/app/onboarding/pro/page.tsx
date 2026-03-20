import { redirect } from "next/navigation";

import { saveProProfileAction } from "@/app/app/actions";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { getAuthenticatedHome, getCurrentAccount } from "@/lib/auth";
import { TRADE_CATEGORIES } from "@/lib/constants";

export default async function ProOnboardingPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  const { user, profile } = await getCurrentAccount();

  if (!user) {
    redirect("/app/login?next=/app/onboarding/pro");
  }

  if (profile?.role === "client" && profile.onboarding_completed) {
    redirect("/app/dashboard");
  }

  if (profile?.role === "pro" && profile.onboarding_completed) {
    redirect(getAuthenticatedHome(profile));
  }

  return (
    <main className="container-shell py-16">
      <Card className="mx-auto max-w-5xl rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Professional onboarding</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Set up a profile clients can trust.</h1>
        <p className="mt-4 max-w-3xl text-lg text-brown-400">
          Add your business details, trades, and base pricing so qualified homeowners can discover you and request quotes.
        </p>

        <form action={saveProProfileAction} className="mt-8 space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={profile?.full_name ?? ""} name="full_name" placeholder="Your full name" required />
            <Input name="business_name" placeholder="Business name" required />
            <Input name="location_city" placeholder="Primary city" required />
            <Input min="0" name="years_experience" placeholder="Years of experience" type="number" />
            <Input min="0" name="hourly_rate" placeholder="Hourly rate (USD)" type="number" />
            <Input min="1" name="service_radius_km" placeholder="Service radius (km)" type="number" />
          </div>

          <div>
            <label className="mb-3 block text-sm uppercase tracking-[0.16em] text-brown-400">Trades</label>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {TRADE_CATEGORIES.map((trade) => (
                <label
                  key={trade.id}
                  className="flex items-center gap-3 rounded-2xl border border-cream-300 bg-cream-50 px-4 py-3 text-brown-700"
                >
                  <input className="h-4 w-4 accent-[#C4581A]" name="trades" type="checkbox" value={trade.label} />
                  <span>{trade.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-3 block text-sm uppercase tracking-[0.16em] text-brown-400">Profile summary</label>
            <Textarea
              name="bio"
              placeholder="Describe your team, specialties, ideal projects, and what makes your work reliable."
            />
          </div>

          {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
          <SubmitButton pendingLabel="Creating profile...">Finish pro onboarding</SubmitButton>
        </form>
      </Card>
    </main>
  );
}
