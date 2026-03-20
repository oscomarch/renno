import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";

export default function ProEarningsPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Earnings" subtitle="Stripe Connect payouts, platform fees, and milestone releases." />
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Available", "$6,280"],
          ["Pending release", "$8,100"],
          ["Fees this month", "$420"]
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
