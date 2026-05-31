import { type NextRequest, NextResponse } from "next/server";
import { fetchOnThisDayServer } from "@/src/lib/wikipedia";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });

  const data = await fetchOnThisDayServer(date);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
