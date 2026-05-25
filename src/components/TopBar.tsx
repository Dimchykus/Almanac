"use client";

import { AlmIcon } from "./AlmIcon";
import { useBookmarks } from "./BookmarksContext";

interface TopBarProps {
  bookmarksOpen: boolean;
  onToggleBookmarks: () => void;
}

export function TopBar({ bookmarksOpen, onToggleBookmarks }: TopBarProps) {
  const { bookmarks } = useBookmarks();

  return (
    <header className="flex items-center gap-6 px-8 h-14 border-b border-[oklch(0.240_0.018_245)] bg-gradient-to-b from-[oklch(0.15_0.015_245)] to-transparent flex-shrink-0">
      {/* Wordmark */}
      <div className="font-display text-[22px] tracking-[0.12em] text-alm-ink flex items-center">
        ALMANAC
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-alm-accent mx-2 mb-0.5 align-middle" />
        <span className="font-mono text-[11px] tracking-[0.18em] text-alm-ink-mute">
          OBS · 037
        </span>
      </div>

      <div className="flex-1" />

      {/* Search */}
      <div className="flex items-center gap-2 h-8 px-3 border border-[oklch(0.295_0.020_245)] rounded-md bg-[oklch(0.155_0.015_245/0.6)] font-mono text-xs text-alm-ink-mute min-w-[280px]">
        <AlmIcon name="search" size={14} />
        <span>Search dates, events, entities…</span>
        <span className="ml-auto text-[10px] px-1 py-0.5 border border-[oklch(0.295_0.020_245)] rounded text-alm-ink-faint">
          ⌘K
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

      {/* Settings */}
      <button
        className="w-8 h-8 inline-flex items-center justify-center border border-[oklch(0.295_0.020_245)] bg-transparent text-alm-ink-dim rounded-md cursor-pointer"
        title="Settings"
      >
        <AlmIcon name="settings" />
      </button>
    </header>
  );
}
