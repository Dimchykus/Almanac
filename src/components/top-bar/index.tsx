"use client";

import { format, parseISO } from "date-fns";
import { AlmIcon } from "../alm-icon";
import { useBookmarks } from "../bookmarks-context";
import { useDate } from "@/src/contexts/date-context";

interface TopBarProps {
  bookmarksOpen: boolean;
  onToggleBookmarks: () => void;
  dateScrolled?: boolean;
}

export function TopBar({ bookmarksOpen, onToggleBookmarks, dateScrolled = false }: TopBarProps) {
  const { bookmarks } = useBookmarks();
  const iso = useDate();
  const date = parseISO(iso);

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 sm:gap-6 px-4 sm:px-8 h-14 border-b border-[oklch(0.240_0.018_245)] bg-gradient-to-b from-[oklch(0.15_0.015_245)] to-[oklch(0.13_0.015_245)] flex-shrink-0">
      <div className="font-display text-[20px] sm:text-[22px] tracking-[0.12em] text-alm-ink flex items-center">
        ALMANAC
      </div>

      <div className="flex-1" />

      {/* Scrolled date — hidden on mobile, animated on sm+ */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden sm:block transition-all duration-300"
        style={{
          opacity: dateScrolled ? 1 : 0,
          transform: `translateX(-50%) translateY(${dateScrolled ? "0px" : "6px"})`,
        }}
      >
        <span className="font-display text-[17px] tracking-[0.04em] text-alm-ink whitespace-nowrap">
          {format(date, "MMMM")}{" "}
          <em className="italic text-alm-accent">{format(date, "d")}</em>
          ,&nbsp;{format(date, "yyyy")}
        </span>
      </div>

      {/* Bookmark toggle */}
      <button
        onClick={onToggleBookmarks}
        className={`relative w-8 h-8 inline-flex items-center justify-center border rounded-md cursor-pointer transition-colors ${
          bookmarksOpen
            ? "border-alm-accent text-alm-accent bg-[oklch(0.76_0.16_60/0.08)]"
            : "border-[oklch(0.295_0.020_245)] text-alm-ink-dim bg-transparent"
        }`}
        title="Saved"
      >
        <AlmIcon name={bookmarksOpen ? "bookmark-fill" : "bookmark"} />
        {bookmarks.length > 0 && (
          <span className="absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-alm-accent text-[oklch(0.12_0.02_245)] font-mono text-[9px] font-bold leading-4 text-center tabular-nums">
            {bookmarks.length}
          </span>
        )}
      </button>


    </header>
  );
}
