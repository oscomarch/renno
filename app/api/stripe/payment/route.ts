import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "stub",
    message: "Create milestone PaymentIntent with manual capture here."
  });
}
