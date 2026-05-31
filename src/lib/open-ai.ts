import type { AlmanacFact } from "@/src/components/types";

const MONTH_NAMES = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] ?? s[v] ?? s[0]);
}

export const openAiQueryKey = (date: string) => ["numbers", date] as const;

export async function fetchOpenAiServer(date: string): Promise<AlmanacFact> {
  const [, monthStr, dayStr] = date.split("-");
  const month = parseInt(monthStr);
  const day = parseInt(dayStr);
  const monthName = MONTH_NAMES[month];
  const dayOrdinal = ordinal(day);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 120,
      messages: [
        {
          role: "system",
          content:
            "You are a historical almanac. Respond with exactly one sentence — a notable historical fact about the given date. Format: '{Month} {Nth} is the day in {year} that {event}.' Use present tense for the event. No extra text, no quotes.",
        },
        {
          role: "user",
          content: `Give me a historical fact about ${monthName} ${dayOrdinal}.`,
        },
      ],
    }),
    next: { revalidate: 86400 },
  });

  if (!res.ok) throw new Error(`OpenAI API fetch failed: ${res.status}`);
  const json = await res.json();
  const text: string = json.choices?.[0]?.message?.content?.trim() ?? "";
  return { text };
}

export async function fetchOpenAiClient(date: string): Promise<AlmanacFact> {
  const res = await fetch(`/api/open-ai?date=${date}`);
  if (!res.ok) throw new Error(`Numbers proxy fetch failed: ${res.status}`);
  return res.json();
}
