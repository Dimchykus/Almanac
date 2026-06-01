"use client";

import { IconX } from "@tabler/icons-react";
import { useBookmarks } from "../bookmarks-context";
import { useLockScroll } from "@/src/hooks/use-lock-scroll";
import { Button } from "@/components/ui/button";

interface BookmarksPanelProps {
  onClose: () => void;
}

export function BookmarksPanel({ onClose }: BookmarksPanelProps) {
  const { bookmarks, removeBookmark } = useBookmarks();

  useLockScroll();

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      <aside
        className="fixed right-0 top-0 bottom-0 w-full sm:w-[420px] bg-alm-surface border-l border-[oklch(0.295_0.020_245)] flex flex-col z-50 animate-in slide-in-from-right duration-300 ease-out"
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
            <IconX size={16} />
          </button>
        </div>

      </div>

      {/* Bookmark list */}
      <div className="flex-1 overflow-y-auto">
        {bookmarks.map((b, i) => (
          <div
            key={i}
            className="px-6 py-[18px] border-b border-[oklch(0.240_0.018_245)] flex gap-3.5 group"
          >
            <div className="flex-1 min-w-0">
              <p className="font-display text-[17px] leading-[1.2] text-alm-ink mb-1 m-0">
                {b.title}
              </p>
              <p className="font-mono text-[10px] text-alm-ink-faint tracking-[0.08em] m-0 mt-1">
                {b.date}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => removeBookmark(b.title)}
              className="self-start opacity-100 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 text-alm-ink-faint hover:text-alm-ink shrink-0"
              title="Remove bookmark"
            >
              <IconX size={14} />
            </Button>
          </div>
        ))}
      </div>
    </aside>
    </>
  );
}
