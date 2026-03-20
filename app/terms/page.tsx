import { MarketingPage } from "@/components/landing/MarketingPage";

export default function TermsPage() {
  return (
    <MarketingPage
      intro="These terms are a starter legal page for the Renno application and should be reviewed by counsel before production launch."
      label="Legal"
      title="Terms of service"
    >
      <div className="space-y-5 rounded-[32px] border border-cream-300 bg-white p-8 text-brown-500">
        <p>Renno provides software for project matching, quoting, messaging, and payment workflow coordination.</p>
        <p>Users are responsible for the accuracy of their account, project, and business information.</p>
        <p>Professionals remain responsible for licensing, insurance, and legal compliance in their jurisdiction.</p>
        <p>These terms should be replaced with final counsel-approved terms before public launch.</p>
      </div>
    </MarketingPage>
  );
}
