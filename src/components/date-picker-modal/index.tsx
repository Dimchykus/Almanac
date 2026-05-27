"use client";

import { useState } from "react";
import { AlmIcon } from "../alm-icon";

const DOWS = ["S", "M", "T", "W", "T", "F", "S"];
const LEADING = [27, 28, 29, 30]; // April, dimmed
const TRAILING = [1, 2, 3, 4, 5, 6]; // June, dimmed
const MARKS = new Set([5, 9, 14, 17, 20, 21, 25, 27, 31]);
const QUICK_PICKS = ["Today", "Yesterday", "One year ago", "Random", "Type a date…"];

interface DatePickerModalProps {
  selectedDay?: number;
  onClose: () => void;
}

export function DatePickerModal({ selectedDay = 21, onClose }: DatePickerModalProps) {
  const [selected, setSelected] = useState(selectedDay);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div
      className="absolute inset-0 flex items-start justify-center pt-[130px] z-30"
      style={{ background: "oklch(0.10 0.012 245 / 0.74)", backdropFilter: "blur(6px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="bg-alm-surface border border-[oklch(0.295_0.020_245)] rounded-xl p-7 w-[560px]"
        style={{ boxShadow: "0 30px 80px oklch(0 0 0 / 0.5)" }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <div className="font-display text-2xl text-alm-ink">
            May{" "}
            <em className="italic text-alm-accent">2026</em>
          </div>
          <div className="flex gap-1.5">
            <button className="w-8 h-8 bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer inline-flex items-center justify-center">
              <AlmIcon name="arrow-l" size={14} />
            </button>
            <button className="w-8 h-8 bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer inline-flex items-center justify-center">
              <AlmIcon name="cal" size={14} />
            </button>
            <button className="w-8 h-8 bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer inline-flex items-center justify-center">
              <AlmIcon name="arrow-r" size={14} />
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day-of-week headers */}
          {DOWS.map((d, i) => (
            <div
              key={`dow-${i}`}
              className="font-mono text-[10px] tracking-[0.12em] uppercase text-alm-ink-faint text-center py-1.5 pb-2.5"
            >
              {d}
            </div>
          ))}

          {/* Leading days (prev month) */}
          {LEADING.map((d) => (
            <div
              key={`l-${d}`}
              className="h-14 rounded-md flex flex-col items-center justify-center gap-0.5 font-mono text-sm text-alm-ink-faint opacity-50 cursor-pointer"
            >
              {d}
              <span className="w-1 h-1 rounded-full bg-alm-accent opacity-0" />
            </div>
          ))}

          {/* Current month days */}
          {days.map((d) => {
            const isSelected = d === selected;
            const isToday = d === 21;
            const hasMark = MARKS.has(d);
            return (
              <button
                key={`d-${d}`}
                onClick={() => setSelected(d)}
                className={`h-14 rounded-md flex flex-col items-center justify-center gap-0.5 font-mono text-sm cursor-pointer border transition-colors ${
                  isSelected
                    ? "bg-alm-accent text-[oklch(0.13_0.015_245)] font-semibold border-alm-accent"
                    : isToday
                    ? "border-alm-accent text-alm-accent"
                    : "border-transparent text-alm-ink-dim hover:bg-alm-surface-2"
                }`}
              >
                {d}
                <span
                  className={`w-1 h-1 rounded-full ${
                    isSelected ? "bg-[oklch(0.13_0.015_245)]" : "bg-alm-accent"
                  } ${hasMark ? "opacity-80" : "opacity-0"}`}
                />
              </button>
            );
          })}

          {/* Trailing days (next month) */}
          {TRAILING.map((d) => (
            <div
              key={`t-${d}`}
              className="h-14 rounded-md flex flex-col items-center justify-center gap-0.5 font-mono text-sm text-alm-ink-faint opacity-50 cursor-pointer"
            >
              {d}
              <span className="w-1 h-1 rounded-full bg-alm-accent opacity-0" />
            </div>
          ))}
        </div>

        {/* Quick picks */}
        <div className="mt-5 pt-[18px] border-t border-[oklch(0.240_0.018_245)] flex gap-2 flex-wrap">
          {QUICK_PICKS.map((q) => (
            <button
              key={q}
              className="font-mono text-[11px] tracking-[0.1em] uppercase px-3 py-1.5 bg-transparent border border-[oklch(0.295_0.020_245)] text-alm-ink-dim rounded-[3px] cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
