import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";

const points = [
  "Free CRM, quoting, and scheduling tools",
  "Escrow guarantees payment on completion",
  "Build a verified, portable reputation",
  "Zero platform fees for your first 3 months"
];

export function ForPros() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <FadeIn className="rounded-[36px] border border-cream-300 bg-white px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="section-label">For professionals</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-brown-800 sm:text-6xl">
              Built for pros who deliver.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-brown-400">
              No more garbage leads. Get matched with real clients, quote on your terms, and get paid on time every
              time.
            </p>
          </div>
          <div className="space-y-4 text-lg text-brown-600">
            {points.map((point) => (
              <p key={point}>{point}</p>
            ))}
            <div className="pt-4">
              <Button href="/app/onboarding/pro">Join as a pro</Button>
              <p className="mt-3 text-sm text-brown-400">Free for independent tradespeople.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
