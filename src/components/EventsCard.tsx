"use client";

import { useState } from "react";
import { AlmIcon } from "./AlmIcon";
import type { AlmanacEvent } from "./types";

interface EventsCardProps {
  events: AlmanacEvent[];
}

export function EventsCard({ events: initialEvents }: EventsCardProps) {
  const [events, setEvents] = useState(initialEvents);

  function toggleSaved(index: number) {
    setEvents((prev) =>
      prev.map((e, i) => (i === index ? { ...e, saved: !e.saved } : e))
    );
  }

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">05</span> On This Day · Historical Events
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Wikipedia · 5 of 142
        </div>
      </div>
      <div>
        {events.map((e, i) => (
          <div
            key={i}
            className={`grid gap-5 px-5 py-[18px] border-b border-[oklch(0.240_0.018_245)] last:border-b-0 items-baseline ${
              e.featured
                ? "bg-gradient-to-r from-[oklch(0.76_0.16_60/0.06)] to-transparent"
                : ""
            }`}
            style={{ gridTemplateColumns: "88px 1fr auto" }}
          >
            <div className="font-display text-[28px] text-alm-accent italic tabular-nums">
              {e.y}
            </div>
            <div className="text-sm leading-[1.55] text-alm-ink">
              {e.body}
              <span className="font-mono text-[10px] text-alm-ink-faint tracking-[0.1em] uppercase ml-2">
                {e.ago} ago
              </span>
            </div>
            <button
              onClick={() => toggleSaved(i)}
              className={`w-6 h-6 inline-flex items-center justify-center rounded cursor-pointer transition-colors ${
                e.saved
                  ? "text-alm-accent"
                  : "text-alm-ink-faint hover:bg-[oklch(0.240_0.018_245)] hover:text-alm-accent"
              }`}
            >
              <AlmIcon name={e.saved ? "bookmark-fill" : "bookmark"} size={14} />
            </button>
          </div>
        ))}
      </div>
    </article>
  );
}
