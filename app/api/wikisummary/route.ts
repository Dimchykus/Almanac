import { type NextRequest, NextResponse } from "next/server";
import { fetchWikiSummaryServer } from "@/src/lib/wikiSummary";

export async function GET(request: NextRequest) {
  const title = request.nextUrl.searchParams.get("title");
  if (!title) return NextResponse.json({ error: "title required" }, { status: 400 });

  const data = await fetchWikiSummaryServer(title);
  return NextResponse.json(data, {
    headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
