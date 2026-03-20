import { FadeIn } from "@/components/motion/FadeIn";

const cities = ["Paris", "London", "Berlin", "Madrid", "New York"];

export function SocialProof() {
  return (
    <section className="container-shell py-8 sm:py-12">
      <FadeIn className="flex flex-col items-center justify-center gap-4 rounded-full border border-cream-300 bg-white/75 px-6 py-5 text-center text-sm text-brown-400 sm:flex-row">
        <span className="uppercase tracking-[0.2em] text-brown-500">Trusted by homeowners in</span>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {cities.map((city) => (
            <span key={city} className="font-medium text-brown-300">
              {city}
            </span>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
