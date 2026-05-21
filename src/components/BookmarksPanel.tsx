"use client";

import { AlmIcon } from "./AlmIcon";
import type { AlmanacBookmark } from "./types";

const SWATCH_STYLES: Record<string, string> = {
  "s-history": "linear-gradient(135deg, oklch(0.32 0.04 60), oklch(0.18 0.02 30))",
  "s-apod": "linear-gradient(135deg, oklch(0.25 0.04 280), oklch(0.12 0.02 245))",
  "s-person": "linear-gradient(135deg, oklch(0.28 0.03 90), oklch(0.18 0.02 50))",
  "s-fact": "linear-gradient(135deg, oklch(0.30 0.05 200), oklch(0.18 0.02 220))",
};

const TABS = ["All", "History", "Sky", "People", "Facts"];

interface BookmarksPanelProps {
  bookmarks: AlmanacBookmark[];
  onClose: () => void;
}

export function BookmarksPanel({ bookmarks, onClose }: BookmarksPanelProps) {
  return (
    <aside
      className="absolute right-0 top-0 bottom-0 w-[420px] bg-alm-surface border-l border-[oklch(0.295_0.020_245)] flex flex-col z-20"
      style={{ boxShadow: "-24px 0 60px oklch(0 0 0 / 0.5)" }}
    >
      {/* Header */}
      <div className="px-6 pt-[22px] pb-[18px] border-b border-[oklch(0.240_0.018_245)]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-display text-[28px] font-normal text-alm-ink m-0">Saved</h3>
            <div className="font-mono text-[11px] text-alm-ink-mute tracking-[0.1em] uppercase mt-1.5">
              {bookmarks.length} discoveries · since Feb 2026
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 inline-flex items-center justify-center border border-[oklch(0.295_0.020_245)] bg-transparent text-alm-ink-dim rounded-md cursor-pointer"
          >
            <AlmIcon name="x" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-[18px]">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              className={`font-mono text-[10px] tracking-[0.14em] uppercase px-2.5 py-1.5 border rounded-[3px] cursor-pointer ${
                i === 0
                  ? "border-alm-accent text-alm-accent bg-[oklch(0.76_0.16_60/0.08)]"
                  : "border-[oklch(0.295_0.020_245)] text-alm-ink-mute bg-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bookmark list */}
      <div className="flex-1 overflow-y-auto">
        {bookmarks.map((b, i) => (
          <div
            key={i}
            className="px-6 py-[18px] border-b border-[oklch(0.240_0.018_245)] flex gap-3.5"
          >
            {/* Swatch */}
            <div
              className="w-11 h-14 flex-shrink-0 rounded-[3px] border border-[oklch(0.295_0.020_245)] relative overflow-hidden"
              style={{ background: SWATCH_STYLES[b.swatch] || SWATCH_STYLES["s-history"] }}
            >
              <div className="alm-hatch absolute inset-0" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-mono text-[9px] tracking-[0.16em] uppercase text-alm-accent mb-1">
                {b.type}
              </div>
              <div className="font-display text-[17px] leading-[1.2] text-alm-ink mb-1">
                {b.title}
              </div>
              <div className="font-mono text-[10px] text-alm-ink-faint tracking-[0.08em]">
                {b.date}
              </div>
            </div>

            <div className="text-alm-accent self-start pt-1">
              <AlmIcon name="bookmark-fill" size={14} />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
