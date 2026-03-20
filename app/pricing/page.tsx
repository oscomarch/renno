import { MarketingPage } from "@/components/landing/MarketingPage";

export default function PricingPage() {
  return (
    <MarketingPage
      intro="Homeowners use Renno for free. Professionals only start paying once they want enhanced visibility and lower fees."
      label="Pricing"
      title="Simple marketplace pricing, without surprise fees."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[32px] border border-cream-300 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Homeowners</p>
          <h2 className="mt-4 font-serif text-5xl text-brown-800">Free</h2>
          <p className="mt-4 text-brown-400">Create projects, compare quotes, and manage milestones without upfront platform charges.</p>
        </div>
        <div className="rounded-[32px] border border-cream-300 bg-white p-8">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Professionals</p>
          <h2 className="mt-4 font-serif text-5xl text-brown-800">8% basic / 5% premium</h2>
          <p className="mt-4 text-brown-400">Fees apply when milestone funds are released. Premium lowers fees and improves discovery.</p>
        </div>
      </div>
    </MarketingPage>
  );
}
