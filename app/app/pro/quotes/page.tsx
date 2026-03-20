import { QuoteComparison } from "@/components/app/QuoteComparison";
import { TopBar } from "@/components/app/TopBar";
import { demoQuotes } from "@/lib/data";

export default function ProQuotesPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Submitted quotes" subtitle="Track acceptance, rejection, and expiry across leads." />
      <QuoteComparison quotes={demoQuotes} />
    </div>
  );
}
