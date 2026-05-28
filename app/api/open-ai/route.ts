import { type NextRequest, NextResponse } from "next/server";
import { fetchOpenAiServer } from "@/src/lib/open-ai";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date required" }, { status: 400 });

  const data = await fetchOpenAiServer(date);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
