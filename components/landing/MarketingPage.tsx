import type { ReactNode } from "react";

import { Footer } from "@/components/landing/Footer";
import { Nav } from "@/components/landing/Nav";

export function MarketingPage({
  label,
  title,
  intro,
  children
}: {
  label: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main>
      <Nav />
      <section className="container-shell pb-8 pt-16 sm:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-label">{label}</p>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-brown-800 sm:text-7xl">{title}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brown-400">{intro}</p>
        </div>
      </section>
      <section className="container-shell pb-16">{children}</section>
      <Footer />
    </main>
  );
}
