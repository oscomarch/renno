import { notFound } from "next/navigation";

import { acceptQuoteAction } from "@/app/app/actions";
import { QuoteComparison } from "@/components/app/QuoteComparison";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { mapQuoteRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectQuotesPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: { error?: string };
}) {
  const { user } = await requireClientAccount();
  const supabase = createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id, title")
    .eq("id", params.id)
    .eq("client_id", user.id)
    .maybeSingle();

  if (!project) notFound();

  const { data: quoteRows } = await supabase
    .from("quotes")
    .select("id, project_id, pro_id, status, total_amount, estimated_duration_days, message, breakdown")
    .eq("project_id", params.id)
    .order("created_at", { ascending: false });

  const quotes = (quoteRows ?? []).map(mapQuoteRow);
  const proIds = quotes.map((quote) => quote.proId);
  const { data: proRows } = proIds.length
    ? await supabase.from("pro_profiles").select("id, business_name").in("id", proIds)
    : { data: [] };

  const proNameMap = new Map((proRows ?? []).map((pro) => [pro.id, pro.business_name]));
  const quoteCards = quotes.map((quote) => ({ ...quote, proName: proNameMap.get(quote.proId) ?? "Professional" }));

  return (
    <div className="space-y-8">
      <TopBar title="Compare quotes" subtitle={`Transparent pricing for ${project.title}.`} />
      {quoteCards.length ? (
        <>
          {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
          <QuoteComparison quotes={quoteCards} />
          <div className="grid gap-4 lg:grid-cols-2">
            {quoteCards.map((quote) => (
              <Card key={quote.id} className="rounded-[28px]">
                <h3 className="font-serif text-3xl text-brown-800">{quote.proName}</h3>
                <p className="mt-2 text-brown-400">Accepting a quote locks the project and creates milestones.</p>
                <form action={acceptQuoteAction} className="mt-5">
                  <input name="project_id" type="hidden" value={params.id} />
                  <input name="quote_id" type="hidden" value={quote.id} />
                  <SubmitButton pendingLabel="Accepting...">Accept quote</SubmitButton>
                </form>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No quotes yet</h2>
          <p className="mt-3 text-brown-400">Pros will appear here as soon as matching and quoting begin.</p>
        </Card>
      )}
    </div>
  );
}
