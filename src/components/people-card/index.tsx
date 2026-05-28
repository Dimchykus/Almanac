"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useDate } from "@/src/contexts/date-context";
import { onThisDayQueryKey, fetchOnThisDayClient } from "@/src/lib/wikipedia";
import {
  wikiSummaryQueryKey,
  fetchWikiSummaryClient,
} from "@/src/lib/wikiSummary";
import type { AlmanacPerson } from "../types";

function PersonTile({
  person,
  label,
  selectedYear,
}: {
  person: AlmanacPerson;
  label: string;
  selectedYear: number;
}) {
  const age = selectedYear - parseInt(person.year);

  const { data: summary } = useQuery({
    queryKey: wikiSummaryQueryKey(person.wikiTitle),
    queryFn: () => fetchWikiSummaryClient(person.wikiTitle!),
    enabled: !!person.wikiTitle,
    staleTime: 86400_000,
  });

  const thumbSrc = summary?.thumbnail?.source;
  const description = summary?.description || person.role;

  return (
    <a
      href={summary?.contentUrl ?? ""}
      className="bg-alm-surface p-[18px] flex gap-3.5"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="w-14 h-14 rounded-full flex-shrink-0 border border-[oklch(0.295_0.020_245)] overflow-hidden relative"
        style={
          thumbSrc
            ? undefined
            : {
                background:
                  "linear-gradient(135deg, oklch(0.32 0.03 60), oklch(0.22 0.02 245))",
              }
        }
      >
        {thumbSrc ? (
          <Image
            src={thumbSrc}
            alt={person.name}
            fill
            sizes="56px"
            className="object-cover object-top"
            unoptimized
          />
        ) : (
          <div className="alm-hatch absolute inset-0 opacity-[0.05]" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-display text-[18px] leading-[1.15] text-alm-ink">
          {person.name}
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint my-1">
          {label} {person.year} · {age} yrs
        </div>
        <div className="text-xs text-alm-ink-dim leading-[1.5] line-clamp-2">
          {description}
        </div>
      </div>
    </a>
  );
}

export function PeopleCard() {
  const date = useDate();
  const selectedYear = parseInt(date.slice(0, 4));

  const { data } = useQuery({
    queryKey: onThisDayQueryKey(date),
    queryFn: () => fetchOnThisDayClient(date),
    enabled: !!date,
  });

  const born = data?.born ?? [];
  const died = data?.died ?? [];
  const all = [
    ...born.map((p) => ({ person: p, label: "Born" })),
    ...died.map((p) => ({ person: p, label: "Died" })),
  ];

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">06</span> Births &amp;
          Deaths
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Wikipedia · On This Day
        </div>
      </div>
      {all.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[oklch(0.240_0.018_245)]">
          {all.map(({ person, label }, i) => (
            <PersonTile
              key={i}
              person={person}
              label={label}
              selectedYear={selectedYear}
            />
          ))}
        </div>
      ) : (
        <div className="px-5 py-8 text-center font-mono text-[11px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Loading…
        </div>
      )}
    </article>
  );
}
