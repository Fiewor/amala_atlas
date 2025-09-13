import { NextRequest, NextResponse } from "next/server";

const NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const input = searchParams.get("input");
  if (!input || !NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return NextResponse.json({ status: "error", message: "Missing input or API key" }, { status: 400 });
  }

  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&types=establishment&components=country:NG`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json(data);
}
