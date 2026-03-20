import { MarketingPage } from "@/components/landing/MarketingPage";

export default function ContactPage() {
  return (
    <MarketingPage
      intro="Need help with onboarding, account access, or a project issue? Use the details below."
      label="Contact"
      title="Talk to Renno"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-[28px] border border-cream-300 bg-white p-6">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Support</p>
          <p className="mt-4 text-lg text-brown-600">support@renno.app</p>
        </div>
        <div className="rounded-[28px] border border-cream-300 bg-white p-6">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Partnerships</p>
          <p className="mt-4 text-lg text-brown-600">founders@renno.app</p>
        </div>
      </div>
    </MarketingPage>
  );
}
