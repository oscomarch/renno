import { MarketingPage } from "@/components/landing/MarketingPage";

const posts = [
  ["How to compare contractor quotes without getting burned", "A framework for reading breakdowns, allowances, and timeline risk."],
  ["What homeowners should ask before starting a renovation", "The questions that expose fit, communication quality, and pricing discipline."],
  ["How independent pros can present better quotes", "Clearer structure wins more trust than vague lump-sum pricing."]
];

export default function BlogPage() {
  return (
    <MarketingPage
      intro="Short guides on quoting, homeowner prep, and better marketplace habits."
      label="Blog"
      title="Notes on building better project workflows."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map(([title, body]) => (
          <article key={title} className="rounded-[28px] border border-cream-300 bg-white p-6">
            <h2 className="font-serif text-3xl text-brown-800">{title}</h2>
            <p className="mt-4 text-brown-400">{body}</p>
          </article>
        ))}
      </div>
    </MarketingPage>
  );
}
