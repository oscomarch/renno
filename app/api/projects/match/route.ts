import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createClient();
  const { data: pros } = await supabase
    .from("pro_profiles")
    .select("id, business_name, trades")
    .limit(3);

  return NextResponse.json({
    matches: (pros ?? []).map((pro) => ({
      id: pro.id,
      businessName: pro.business_name,
      trades: pro.trades ?? []
    }))
  });
}
