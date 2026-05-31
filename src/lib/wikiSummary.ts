import type { WikiSummary } from "@/src/components/types";

interface WikiSummaryRaw {
  title: string;
  description?: string;
  extract?: string;
  thumbnail?: { source: string; width: number; height: number };
  originalimage?: { source: string; width: number; height: number };
  content_urls?: { desktop?: { page?: string } };
  type?: string;
}

export const wikiSummaryQueryKey = (title: string = "") =>
  ["wikisummary", title] as const;

function toSummary(raw: WikiSummaryRaw): WikiSummary {
  return {
    title: raw.title,
    description: raw.description ?? "",
    extract: raw.extract ?? "",
    thumbnail: raw.thumbnail ?? raw.originalimage,
    contentUrl:
      raw.content_urls?.desktop?.page ??
      `https://en.wikipedia.org/wiki/${encodeURIComponent(raw.title)}`,
  };
}

/** Called from Server Components or API routes — uses ISR revalidation. */
export async function fetchWikiSummaryServer(
  title: string,
): Promise<WikiSummary> {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    next: { revalidate: 86400 },
  });
  if (!res.ok)
    throw new Error(`Wiki summary fetch failed for "${title}": ${res.status}`);
  const raw: WikiSummaryRaw = await res.json();
  return toSummary(raw);
}

/** Called from Client Components — hits the local API proxy. */
export async function fetchWikiSummaryClient(
  title: string,
): Promise<WikiSummary> {
  const res = await fetch(
    `/api/wikisummary?title=${encodeURIComponent(title)}`,
  );
  if (!res.ok)
    throw new Error(`Wiki summary proxy failed for "${title}": ${res.status}`);
  return res.json();
}
