import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProEarningsPage() {
  const { user } = await requireProAccount();
  const supabase = createClient();

  const { data: acceptedQuotes } = await supabase
    .from("quotes")
    .select("total_amount")
    .eq("pro_id", user.id)
    .eq("status", "accepted");

  const totalAccepted = (acceptedQuotes ?? []).reduce((sum, quote) => sum + Number(quote.total_amount ?? 0), 0);
  const pendingRelease = totalAccepted * 0.6;
  const fees = totalAccepted * 0.08;

  return (
    <div className="space-y-8">
      <TopBar title="Earnings" subtitle="Projected payouts, escrow releases, and platform fees." />
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Accepted value", `$${totalAccepted.toLocaleString()}`],
          ["Pending release", `$${Math.round(pendingRelease).toLocaleString()}`],
          ["Estimated fees", `$${Math.round(fees).toLocaleString()}`]
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
