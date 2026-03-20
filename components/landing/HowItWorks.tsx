import { FadeIn } from "@/components/motion/FadeIn";
import { SectionIntro } from "@/components/ui/SectionIntro";

const steps = [
  {
    number: "01",
    title: "Describe",
    description: "Tell us about your project. Upload photos, set your budget and timeline."
  },
  {
    number: "02",
    title: "Match",
    description: "We match you with 3-5 verified pros based on trade, location, and ratings."
  },
  {
    number: "03",
    title: "Compare",
    description: "Review transparent quotes side-by-side. No hidden costs, no bidding wars."
  },
  {
    number: "04",
    title: "Build",
    description: "Pay in milestones with escrow protection. Track progress in real time."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-shell py-16 sm:py-24">
      <SectionIntro
        label="How it works"
        title="A clearer workflow from first brief to final handover."
        description="The platform keeps sourcing, quoting, payments, and updates in one calm place."
      />
      <div className="mt-14 grid gap-5 lg:grid-cols-4">
        {steps.map((step, index) => (
          <FadeIn
            key={step.number}
            delay={index * 0.1}
            className="rounded-[28px] border border-cream-300 bg-white p-6"
          >
            <div className="text-sm uppercase tracking-[0.18em] text-terracotta-500">{step.number}</div>
            <h3 className="mt-5 font-serif text-3xl text-brown-800">{step.title}</h3>
            <p className="mt-3 text-brown-400">{step.description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
