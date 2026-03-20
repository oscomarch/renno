import { ProCard } from "@/components/app/ProCard";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapProProfileRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function FindProsPage() {
  await requireClientAccount();
  const supabase = createClient();

  const { data: proRows } = await supabase
    .from("pro_profiles")
    .select(
      "id, business_name, bio, trades, years_experience, location_city, hourly_rate, rating_avg, rating_count, portfolio_images, license_verified, insurance_verified, background_check_passed, is_featured, subscription_tier"
    )
    .order("rating_avg", { ascending: false });

  const pros = (proRows ?? []).map(mapProProfileRow);

  return (
    <div className="space-y-8">
      <TopBar title="Find pros" subtitle="Browse verified tradespeople by trade, city, rating, and fit." />
      {pros.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {pros.map((pro) => (
            <ProCard key={pro.id} pro={pro} />
          ))}
        </div>
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No professionals yet</h2>
          <p className="mt-3 max-w-2xl text-brown-400">
            As soon as tradespeople create their Renno pro profiles, they&apos;ll appear here for clients to browse and invite.
          </p>
        </Card>
      )}
    </div>
  );
}
