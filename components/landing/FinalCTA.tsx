import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function FinalCTA() {
  return (
    <section className="container-shell py-16 sm:py-24">
      <div className="rounded-[36px] border border-cream-300 bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
        <h2 className="font-serif text-4xl leading-tight text-brown-800 sm:text-6xl">
          <span className="block">Stop gambling on contractors.</span>
          <span className="block text-terracotta-500">Start building with confidence.</span>
        </h2>
        <div className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row">
          <Input placeholder="Enter your email" type="email" />
          <Button className="sm:min-w-56">Get started for free</Button>
        </div>
        <p className="mt-4 text-sm text-brown-400">Free for homeowners. No credit card.</p>
      </div>
    </section>
  );
}
