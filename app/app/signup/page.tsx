import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function SignupPage() {
  return (
    <main className="container-shell flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-3xl rounded-[32px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Get started</p>
        <h1 className="mt-4 font-serif text-5xl text-brown-800">Choose your side</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-[28px] border border-cream-300 bg-cream-50 p-6">
            <h2 className="font-serif text-3xl text-brown-800">I&apos;m a homeowner</h2>
            <p className="mt-3 text-brown-400">Post a project, compare quotes, and pay in protected milestones.</p>
            <Button className="mt-6" href="/app/onboarding/client">
              Continue as client
            </Button>
          </div>
          <div className="rounded-[28px] border border-cream-300 bg-cream-50 p-6">
            <h2 className="font-serif text-3xl text-brown-800">I&apos;m a professional</h2>
            <p className="mt-3 text-brown-400">Get matched with real clients and manage quotes, jobs, and payouts.</p>
            <Button className="mt-6" href="/app/onboarding/pro">
              Continue as pro
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}
