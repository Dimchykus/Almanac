"use client";

import { AlmIcon } from "../alm-icon";
import { useBookmarks } from "../bookmarks-context";

const TABS = ["All", "History", "Sky", "People", "Facts"];

interface BookmarksPanelProps {
  onClose: () => void;
}

export function BookmarksPanel({ onClose }: BookmarksPanelProps) {
  const { bookmarks } = useBookmarks();

  return (
    <aside
      className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-alm-surface border-l border-[oklch(0.295_0.020_245)] flex flex-col z-20"
      style={{ boxShadow: "-24px 0 60px oklch(0 0 0 / 0.5)" }}
    >
      {/* Header */}
      <div className="px-6 pt-[22px] pb-[18px] border-b border-[oklch(0.240_0.018_245)]">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-display text-[28px] font-normal text-alm-ink m-0">
              Saved
            </h3>
            <p className="font-mono text-[11px] text-alm-ink-mute tracking-[0.1em] uppercase mt-1.5 m-0">
              {bookmarks.length}{" "}
              {bookmarks.length === 1 ? "discovery" : "discoveries"}
            </p>
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
            <div className="flex-1 min-w-0">
              <p className="font-display text-[17px] leading-[1.2] text-alm-ink mb-1 m-0">
                {b.title}
              </p>
              <p className="font-mono text-[10px] text-alm-ink-faint tracking-[0.08em] m-0 mt-1">
                {b.date}
              </p>
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
