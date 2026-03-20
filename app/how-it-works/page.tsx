import { MarketingPage } from "@/components/landing/MarketingPage";

const steps = [
  ["Describe", "Tell Renno what you want to build, fix, or improve."],
  ["Match", "Get surfaced to relevant professionals based on trade and city."],
  ["Compare", "Review clear pricing and milestone structure side by side."],
  ["Build", "Track messages, progress, and milestone status in one workspace."]
];

export default function HowItWorksPage() {
  return (
    <MarketingPage
      intro="Renno is structured to remove ambiguity from the homeowner-to-professional workflow."
      label="How it works"
      title="A calmer workflow from first brief to final handover."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steps.map(([title, body], index) => (
          <div key={title} className="rounded-[28px] border border-cream-300 bg-white p-6">
            <p className="text-sm uppercase tracking-[0.16em] text-terracotta-500">0{index + 1}</p>
            <h2 className="mt-4 font-serif text-3xl text-brown-800">{title}</h2>
            <p className="mt-3 text-brown-400">{body}</p>
          </div>
        ))}
      </div>
    </MarketingPage>
  );
}
