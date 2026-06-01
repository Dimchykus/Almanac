"use client";

import { useQuery } from "@tanstack/react-query";
import { format, parseISO } from "date-fns";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { useDate } from "@/src/contexts/date-context";
import { useBookmarks } from "../bookmarks-context";
import { onThisDayQueryKey, fetchOnThisDayClient } from "@/src/lib/wikipedia";
import { Skeleton, CardError } from "@/src/components/ui/skeleton";
import type { AlmanacEvent } from "../types";

const ROW = "grid gap-3 sm:gap-5 px-4 sm:px-5 py-4 sm:py-[18px] border-b border-[oklch(0.240_0.018_245)] last:border-b-0 items-baseline";

function EventsSkeleton() {
  return (
    <div>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={ROW} style={{ gridTemplateColumns: "64px 1fr auto" }}>
          <Skeleton className="h-7 w-12" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
          <Skeleton className="h-5 w-5" />
        </div>
      ))}
    </div>
  );
}

export function EventsCard() {
  const date = useDate();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: onThisDayQueryKey(date),
    queryFn: () => fetchOnThisDayClient(date),
    enabled: !!date,
  });

  const events = data?.events ?? [];
  const dateLabel = date ? format(parseISO(date), "MMM d") : "";

  function toggleSaved(event: AlmanacEvent) {
    if (isBookmarked(event.body)) {
      removeBookmark(event.body);
    } else {
      addBookmark({
        type: "history",
        title: event.body,
        date: `${dateLabel} · ${event.y}`,
      });
    }
  }

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">05</span> On This Day
          · Historical Events
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          {data
            ? `Wikipedia · ${events.length} of ${data.totalEvents}`
            : "Wikipedia"}
        </div>
      </div>

      {isPending ? (
        <EventsSkeleton />
      ) : isError ? (
        <CardError onRetry={refetch} />
      ) : (
        <div>
          {events.map((e, i) => {
            const saved = isBookmarked(e.body);
            return (
              <div
                key={i}
                className={ROW}
                style={{ gridTemplateColumns: "64px 1fr auto" }}
              >
                <div className="font-display text-[22px] sm:text-[28px] text-alm-accent italic tabular-nums">
                  {e.y}
                </div>
                <p className="text-sm leading-[1.55] text-alm-ink m-0">
                  {e.body}
                  <span className="font-mono text-[10px] text-alm-ink-faint tracking-[0.1em] uppercase ml-2">
                    {e.ago} ago
                  </span>
                </p>
                <button
                  onClick={() => toggleSaved(e)}
                  className={`w-6 h-6 inline-flex items-center justify-center rounded cursor-pointer transition-colors ${
                    saved
                      ? "text-alm-accent"
                      : "text-alm-ink-faint hover:bg-[oklch(0.240_0.018_245)] hover:text-alm-accent"
                  }`}
                >
                  {saved ? <IconBookmarkFilled size={14} /> : <IconBookmark size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </article>
  );
}
