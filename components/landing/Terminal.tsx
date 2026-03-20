import { FadeIn } from "@/components/motion/FadeIn";

export function Terminal() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <FadeIn className="overflow-hidden rounded-[32px] border border-brown-700 bg-brown-800 shadow-warm">
        <div className="flex items-center gap-2 border-b border-brown-700 px-6 py-4">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="space-y-3 px-6 py-8 font-mono text-sm leading-7 text-cream-100 sm:px-8 sm:text-base">
          <p>$ renno quote --project &quot;kitchen-renovation&quot; --budget 15000</p>
          <p className="text-sage-200">✓ 4 verified pros matched in your area.</p>
          <p className="text-sage-200">✓ Quotes arriving within 24h.</p>
          <p className="text-sage-200">✓ Escrow protection enabled.</p>
        </div>
      </FadeIn>
    </section>
  );
}
