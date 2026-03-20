import { FadeIn } from "@/components/motion/FadeIn";

const items = [
  { value: "28%", label: "Of homeowners report contractor issues" },
  { value: "70%", label: "Of projects finish late or over budget" },
  { value: "$902", label: "Average cost of contractor mistakes" }
];

export function ProblemStats() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="grid gap-8 border-y border-cream-300 py-10 md:grid-cols-3">
        {items.map((item, index) => (
          <FadeIn key={item.label} delay={index * 0.1} className="text-center md:text-left">
            <div className="font-serif text-6xl text-brown-800 sm:text-7xl">{item.value}</div>
            <p className="mt-4 max-w-xs text-sm uppercase tracking-[0.12em] text-brown-400">{item.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
