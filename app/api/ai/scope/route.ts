import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "stub",
    scope: {
      summary: "AI scoping placeholder",
      estimateRange: [9000, 14000]
    }
  });
}
