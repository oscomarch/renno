import { QuoteComparison } from "@/components/app/QuoteComparison";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapQuoteRow, requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProQuotesPage({
  searchParams
}: {
  searchParams?: { success?: string };
}) {
  const { user } = await requireProAccount();
  const supabase = createClient();

  const { data: quoteRows } = await supabase
    .from("quotes")
    .select("id, project_id, pro_id, status, total_amount, estimated_duration_days, message, breakdown")
    .eq("pro_id", user.id)
    .order("created_at", { ascending: false });

  const { data: proProfile } = await supabase.from("pro_profiles").select("business_name").eq("id", user.id).maybeSingle();
  const quotes = (quoteRows ?? []).map((quote) => ({ ...mapQuoteRow(quote), proName: proProfile?.business_name ?? "You" }));

  return (
    <div className="space-y-8">
      <TopBar title="Submitted quotes" subtitle="Track acceptance, rejection, and expiry across leads." />
      {searchParams?.success ? <p className="text-sm text-sage-700">{searchParams.success}</p> : null}
      {quotes.length ? (
        <QuoteComparison quotes={quotes} />
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No quotes submitted yet</h2>
          <p className="mt-3 text-brown-400">Lead responses will appear here once you send your first quote.</p>
        </Card>
      )}
    </div>
  );
}
