import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    status: "stub",
    message: "Release escrowed funds and deduct Renno platform fee here."
  });
}
