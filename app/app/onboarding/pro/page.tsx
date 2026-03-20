import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function ProOnboardingPage() {
  return (
    <main className="container-shell py-16">
      <Card className="mx-auto max-w-4xl rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Pro onboarding</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Set up your business, trades, and payout account.</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Input placeholder="Business name" />
          <Input placeholder="Primary city" />
          <Input placeholder="Trades" />
          <Input placeholder="Years of experience" />
          <Input placeholder="Hourly rate" />
          <Input placeholder="Service radius (km)" />
        </div>
        <div className="mt-6">
          <Button href="/app/pro/dashboard">Create Stripe Connect account</Button>
        </div>
      </Card>
    </main>
  );
}
