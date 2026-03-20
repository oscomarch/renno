import { MarketingPage } from "@/components/landing/MarketingPage";

export default function PrivacyPage() {
  return (
    <MarketingPage
      intro="This is a starter privacy page describing the core categories of data used in the current product."
      label="Legal"
      title="Privacy policy"
    >
      <div className="space-y-5 rounded-[32px] border border-cream-300 bg-white p-8 text-brown-500">
        <p>Renno stores account data, project content, quote content, and messaging needed to operate the platform.</p>
        <p>We use Supabase for authentication and database services, and Vercel for hosting.</p>
        <p>Payment-related workflows are designed for Stripe, but you should publish a final reviewed privacy policy before launch.</p>
      </div>
    </MarketingPage>
  );
}
