import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProDashboardPage() {
  const { user, proProfile } = await requireProAccount();
  const supabase = createClient();

  const { data: quoteRows } = await supabase.from("quotes").select("id, status, total_amount").eq("pro_id", user.id);
  const { data: leadRows } = await supabase
    .from("projects")
    .select("id")
    .in("status", ["open", "matching"]);

  const acceptedQuotes = (quoteRows ?? []).filter((quote) => quote.status === "accepted");
  const projectedPayout = acceptedQuotes.reduce((sum, quote) => sum + Number(quote.total_amount ?? 0), 0);

  return (
    <div className="space-y-8">
      <TopBar title={proProfile.business_name} subtitle="Track leads, active jobs, and submitted quotes." />
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Open leads", String((leadRows ?? []).length)],
          ["Active jobs", String(acceptedQuotes.length)],
          ["Projected payout", `$${projectedPayout.toLocaleString()}`]
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px]">
            <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{label}</p>
            <p className="mt-4 font-serif text-5xl text-brown-800">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
