import { MarketingPage } from "@/components/landing/MarketingPage";

export default function AboutPage() {
  return (
    <MarketingPage
      intro="Renno exists to make home improvement projects feel organized, trustworthy, and legible from both sides."
      label="About"
      title="Built to make renovations less opaque."
    >
      <div className="rounded-[32px] border border-cream-300 bg-white p-8 text-lg leading-8 text-brown-500">
        We care about reducing bad contractor experiences, unclear quoting, and payment anxiety. The product is designed
        around transparent comparison, milestone-based execution, and a calmer marketplace experience.
      </div>
    </MarketingPage>
  );
}
