import type { AlmanacEvent, AlmanacPerson } from "@/src/components/types";

interface WikiPage {
  title: string;
}

interface WikiEntry {
  year: number;
  text: string;
  pages: WikiPage[];
}

interface WikiRawResponse {
  events: WikiEntry[];
  births: WikiEntry[];
  deaths: WikiEntry[];
}

export interface WikiOnThisDayData {
  events: AlmanacEvent[];
  born: AlmanacPerson[];
  died: AlmanacPerson[];
  totalEvents: number;
}

export const onThisDayQueryKey = (date: string) => ["onthisday", date] as const;

function toEvent(entry: WikiEntry, selectedYear: number): AlmanacEvent {
  return {
    y: String(entry.year),
    body: entry.text,
    ago: `${selectedYear - entry.year} yrs`,
  };
}

function toPerson(entry: WikiEntry): AlmanacPerson {
  const comma = entry.text.indexOf(",");
  return {
    name: comma > 0 ? entry.text.slice(0, comma).trim() : entry.text,
    year: String(entry.year),
    role: comma > 0 ? entry.text.slice(comma + 1).trim() : "",
  };
}

export async function fetchOnThisDayServer(date: string): Promise<WikiOnThisDayData> {
  const [yearStr, month, day] = date.split("-");
  const selectedYear = parseInt(yearStr);
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/feed/onthisday/all/${month}/${day}`,
    {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 },
    }
  );
  if (!res.ok) throw new Error(`Wikipedia fetch failed: ${res.status}`);
  const raw: WikiRawResponse = await res.json();

  return {
    events: raw.events.slice(0, 10).map((e) => toEvent(e, selectedYear)),
    born: raw.births.slice(0, 3).map(toPerson),
    died: raw.deaths.slice(0, 3).map(toPerson),
    totalEvents: raw.events.length,
  };
}

export async function fetchOnThisDayClient(date: string): Promise<WikiOnThisDayData> {
  const res = await fetch(`/api/onthisday?date=${date}`);
  if (!res.ok) throw new Error(`Wikipedia proxy fetch failed: ${res.status}`);
  return res.json();
}
