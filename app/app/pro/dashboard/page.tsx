import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";

export default function ProDashboardPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Pro dashboard" subtitle="Track leads, active jobs, and payouts." />
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ["Open leads", "12"],
          ["Active jobs", "4"],
          ["Projected payout", "$18.4K"]
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
