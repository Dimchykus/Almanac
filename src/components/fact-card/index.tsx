"use client";

import { useQuery } from "@tanstack/react-query";
import { openAiQueryKey, fetchOpenAiClient } from "@/src/lib/open-ai";
import { useDate } from "@/src/contexts/date-context";

export function FactCard() {
  const date = useDate();

  const { data: fact } = useQuery({
    queryKey: openAiQueryKey(date),
    queryFn: () => fetchOpenAiClient(date),
    enabled: !!date,
  });

  const day = date.split("-")[2];

  if (!fact) return null;

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">02</span> Date Fact
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          OpenAI · ChatGPT
        </div>
      </div>
      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <div className="font-display text-[52px] sm:text-[64px] leading-none text-alm-accent italic">
          {parseInt(day)}
        </div>
        <p className="font-display text-[18px] sm:text-[20px] leading-[1.3] text-alm-ink m-0">
          {fact.text}
        </p>
      </div>
    </article>
  );
}
