import { NextResponse } from "next/server";

import { demoPros } from "@/lib/data";

export async function POST() {
  return NextResponse.json({
    matches: demoPros.slice(0, 3).map((pro) => ({
      id: pro.id,
      businessName: pro.businessName,
      trades: pro.trades
    }))
  });
}
