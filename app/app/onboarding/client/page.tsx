import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function ClientOnboardingPage() {
  return (
    <main className="container-shell py-16">
      <Card className="mx-auto max-w-3xl rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Client onboarding</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Tell us where you live and what you&apos;re planning.</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Input placeholder="Full name" />
          <Input placeholder="City" />
          <Input placeholder="Phone number" />
          <Input placeholder="Property type" />
        </div>
        <div className="mt-6">
          <Button href="/app/dashboard">Finish onboarding</Button>
        </div>
      </Card>
    </main>
  );
}
