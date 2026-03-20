import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "stub",
    message: "Create Stripe Connect account onboarding link here."
  });
}
