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
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] bg-brown-800 p-6 text-cream-100 shadow-sm shadow-brown-900/10">
          <p className="text-xs uppercase tracking-[0.18em] text-cream-300">Professional workspace</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-white">Stay on top of new leads without the noise.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-cream-200">
            Review open opportunities, keep quotes moving, and turn accepted work into active jobs.
          </p>
        </Card>
        <Card className="rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Profile</p>
          <div className="mt-4 space-y-3 text-sm text-brown-500">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <span>Business</span>
              <span className="font-medium text-brown-700">{proProfile.business_name}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <span>City</span>
              <span className="font-medium text-brown-700">{proProfile.location_city ?? "Not set yet"}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <span>Trades</span>
              <span className="font-medium text-brown-700">{proProfile.trades.slice(0, 2).join(", ") || "Not set yet"}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Open leads", String((leadRows ?? []).length)],
          ["Active jobs", String(acceptedQuotes.length)],
          ["Projected payout", `$${projectedPayout.toLocaleString()}`]
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-brown-400">{label}</p>
            <p className="mt-3 font-serif text-4xl text-brown-800">{value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
