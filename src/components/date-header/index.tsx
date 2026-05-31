"use client";

import { format, getDayOfYear, getDaysInYear, parseISO } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { AlmIcon } from "../alm-icon";
import { sunQueryKey, fetchSunClient } from "@/src/lib/sun";
import { useGeo } from "@/src/hooks/use-geo";
import { useDate, useDisplayDate, useDateNav } from "@/src/contexts/date-context";
import { useSyncedSources } from "@/src/hooks/use-synced-sources";

interface DateHeaderProps {
  onPickerOpen: () => void;
}

export function DateHeader({ onPickerOpen }: DateHeaderProps) {
  const iso = useDisplayDate();
  const debouncedIso = useDate();
  const { prevDay, nextDay, isToday } = useDateNav();

  const { lat, lon, ready } = useGeo();
  const { data: sun } = useQuery({
    queryKey: sunQueryKey(debouncedIso, lat, lon),
    queryFn: () => fetchSunClient(debouncedIso, lat, lon),
    enabled: ready && !!debouncedIso,
  });

  const { syncedCount, total } = useSyncedSources();

  const date = parseISO(iso);
  const dayOfYear = getDayOfYear(date);
  const daysRemaining = getDaysInYear(date) - dayOfYear;

  return (
    <section className="px-4 sm:px-8 pt-6 sm:pt-9 pb-5 sm:pb-6 border-b border-[oklch(0.240_0.018_245)]">
      {/* Eyebrow */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-alm-ink-mute mb-3 sm:mb-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-alm-accent shadow-[0_0_0_4px_oklch(0.76_0.16_60/0.18)]" />
        <span>{isToday ? "Today's Briefing" : "Past Briefing"}</span>
        <span className="text-alm-ink-faint hidden sm:inline">·</span>
        <span className="hidden sm:inline">Compiled {iso} 06:00 UTC</span>
        <span className="text-alm-ink-faint">·</span>
        <span>{syncedCount} of {total} sources synced</span>
      </div>

      {/* Date line */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-8">
        <h1 className="font-display font-normal text-[clamp(36px,6.5vw,96px)] leading-[0.95] tracking-[-0.01em] text-alm-ink flex items-baseline gap-2 sm:gap-4">
          <span className="font-mono text-[11px] sm:text-[13px] tracking-[0.16em] text-alm-ink-mute uppercase font-medium self-end pb-2 sm:pb-3.5">
            {format(date, "EEEE")}
          </span>
          <span>
            {format(date, "MMMM")}{" "}
            <em className="italic text-alm-accent">{format(date, "d")}</em>
            ,&nbsp;{format(date, "yyyy")}
          </span>
        </h1>

        <div className="flex items-center gap-1.5">
          <button
            onClick={prevDay}
            className="w-9 h-9 inline-flex items-center justify-center bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer hover:text-alm-ink hover:border-[oklch(0.4_0.020_245)] transition-colors"
          >
            <AlmIcon name="arrow-l" />
          </button>
          <button
            onClick={onPickerOpen}
            className="h-9 px-3 sm:px-3.5 inline-flex items-center gap-2 bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md font-mono text-[11px] tracking-[0.1em] uppercase text-alm-ink-dim cursor-pointer hover:text-alm-ink hover:border-[oklch(0.4_0.020_245)] transition-colors"
          >
            <AlmIcon name="cal" size={14} />
            <span className="hidden sm:inline">Jump to date</span>
          </button>
          <button
            onClick={nextDay}
            disabled={isToday}
            className="w-9 h-9 inline-flex items-center justify-center bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer hover:text-alm-ink hover:border-[oklch(0.4_0.020_245)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <AlmIcon name="arrow-r" />
          </button>
        </div>
      </div>

      {/* Telemetry strip */}
      <div className="mt-4 sm:mt-6 grid grid-cols-3 sm:grid-cols-6 gap-px bg-[oklch(0.240_0.018_245)] border-t border-b border-[oklch(0.240_0.018_245)]">
        {[
          { k: "Day", v: dayOfYear, small: `/${getDaysInYear(date)}` },
          { k: "Remaining", v: daysRemaining, small: "days" },
          { k: "Sunrise", v: sun?.rise ?? "—" },
          { k: "Sunset", v: sun?.set ?? "—" },
          { k: "Daylight", v: sun?.length ?? "—" },
          { k: "Solar Noon", v: sun?.noon ?? "—" },
        ].map(({ k, v, small }) => (
          <div key={k} className="bg-alm-bg px-3 sm:px-4 py-3">
            <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint mb-1 sm:mb-1.5">
              {k}
            </div>
            <div className="font-mono text-[13px] sm:text-[15px] text-alm-ink tracking-[0.02em]">
              {v}
              {small && (
                <small className="text-[10px] sm:text-[11px] text-alm-ink-mute ml-1">
                  {small}
                </small>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
