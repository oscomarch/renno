import { FadeIn } from "@/components/motion/FadeIn";
import { SectionIntro } from "@/components/ui/SectionIntro";

const items = [
  ["[renovate]", "Renovations", "Full kitchen and bathroom remodels with milestone tracking."],
  ["[fix]", "Repairs", "Plumbing, electrical, HVAC — get it fixed right."],
  ["[paint]", "Painting", "Interior and exterior, color consultation included."],
  ["[build]", "Extensions", "Loft conversions, garden rooms, new builds."],
  ["[install]", "Installations", "Windows, doors, flooring, tiling."],
  ["[maintain]", "Maintenance", "Regular upkeep, inspections, seasonal work."]
];

export function FeatureGrid() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <SectionIntro
        label="Built for every home project"
        title="A marketplace tuned for the real work."
        description="From emergency fixes to full renovations, Renno keeps every workflow structured and legible."
      />
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map(([label, title, description], index) => (
          <FadeIn
            key={title}
            delay={index * 0.07}
            className="rounded-[28px] border border-cream-300 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brown-400">{label}</p>
            <h3 className="mt-5 font-serif text-3xl text-brown-800">{title}</h3>
            <p className="mt-3 text-brown-400">{description}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
