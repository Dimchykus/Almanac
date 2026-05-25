import { type NextRequest, NextResponse } from "next/server";
import { fetchSunServer } from "@/src/lib/sun";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get("date");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!date || !lat || !lon)
    return NextResponse.json({ error: "date, lat, and lon are required" }, { status: 400 });

  const data = await fetchSunServer(date, parseFloat(lat), parseFloat(lon));
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
