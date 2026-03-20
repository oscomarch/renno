import { MarketingPage } from "@/components/landing/MarketingPage";

export default function ForProsPage() {
  return (
    <MarketingPage
      intro="Renno is built for tradespeople who want cleaner leads, clearer quoting, and fewer payment headaches."
      label="For professionals"
      title="Tools for pros who want real clients, not junk leads."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {[
          "Build a trusted profile with trades, rates, and real project history.",
          "Respond to matching homeowner briefs with structured quotes.",
          "Turn accepted quotes into live jobs with milestone tracking.",
          "Keep everything in one place: messages, pricing, and schedule visibility."
        ].map((item) => (
          <div key={item} className="rounded-[28px] border border-cream-300 bg-white p-6 text-lg text-brown-500">
            {item}
          </div>
        ))}
      </div>
    </MarketingPage>
  );
}
