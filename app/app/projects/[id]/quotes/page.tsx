import { notFound } from "next/navigation";

import { QuoteComparison } from "@/components/app/QuoteComparison";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapQuoteRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectQuotesPage({ params }: { params: { id: string } }) {
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

  return (
    <div className="space-y-8">
      <TopBar title="Compare quotes" subtitle={`Transparent pricing for ${project.title}.`} />
      {quotes.length ? (
        <QuoteComparison quotes={quotes} />
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No quotes yet</h2>
          <p className="mt-3 text-brown-400">Pros will appear here as soon as matching and quoting begin.</p>
        </Card>
      )}
    </div>
  );
}
