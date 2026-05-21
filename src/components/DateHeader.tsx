import { AlmIcon } from "./AlmIcon";
import type { AlmanacDate, AlmanacSun } from "./types";

interface DateHeaderProps {
  date: AlmanacDate;
  sun: AlmanacSun;
  onPickerOpen: () => void;
}

export function DateHeader({ date, sun, onPickerOpen }: DateHeaderProps) {
  return (
    <section className="px-8 pt-9 pb-6 border-b border-[oklch(0.240_0.018_245)]">
      {/* Eyebrow */}
      <div className="flex items-center gap-3.5 font-mono text-[11px] tracking-[0.14em] uppercase text-alm-ink-mute mb-3.5">
        <span className="w-1.5 h-1.5 rounded-full bg-alm-accent shadow-[0_0_0_4px_oklch(0.76_0.16_60/0.18)]" />
        <span>Today&apos;s Briefing</span>
        <span className="text-alm-ink-faint">·</span>
        <span>Compiled {date.iso} 06:00 UTC</span>
        <span className="text-alm-ink-faint">·</span>
        <span>5 sources synced</span>
      </div>

      {/* Date line */}
      <div className="flex items-end justify-between gap-8">
        <h1 className="font-display font-normal text-[clamp(56px,6.5vw,96px)] leading-[0.95] tracking-[-0.01em] text-alm-ink flex items-baseline gap-4">
          <span className="font-mono text-[13px] tracking-[0.16em] text-alm-ink-mute uppercase font-medium self-end pb-3.5">
            {date.weekdayLong}
          </span>
          <span>
            {date.month} <em className="italic text-alm-accent">{date.day}</em>,&nbsp;{date.year}
          </span>
        </h1>

        <div className="flex items-center gap-1.5">
          <button className="w-9 h-9 inline-flex items-center justify-center bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer">
            <AlmIcon name="arrow-l" />
          </button>
          <button
            onClick={onPickerOpen}
            className="h-9 px-3.5 inline-flex items-center gap-2 bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md font-mono text-[11px] tracking-[0.1em] uppercase text-alm-ink-dim cursor-pointer"
          >
            <AlmIcon name="cal" size={14} /> Jump to date
          </button>
          <button className="w-9 h-9 inline-flex items-center justify-content-center bg-transparent border border-[oklch(0.295_0.020_245)] rounded-md text-alm-ink-dim cursor-pointer justify-center">
            <AlmIcon name="arrow-r" />
          </button>
        </div>
      </div>

      {/* Telemetry strip */}
      <div
        className="mt-6 grid grid-cols-6 gap-px bg-[oklch(0.240_0.018_245)] border-t border-b border-[oklch(0.240_0.018_245)]"
      >
        {[
          { k: "Day", v: date.dayOfYear, small: "/365" },
          { k: "Remaining", v: date.daysRemaining, small: "days" },
          { k: "Sunrise", v: sun.rise },
          { k: "Sunset", v: sun.set },
          { k: "Daylight", v: sun.length },
          { k: "Moon", v: `${sun.moonPct}%`, small: sun.moon },
        ].map(({ k, v, small }) => (
          <div key={k} className="bg-alm-bg px-4 py-3.5">
            <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint mb-1.5">
              {k}
            </div>
            <div className="font-mono text-[15px] text-alm-ink tracking-[0.02em]">
              {v}
              {small && (
                <small className="text-[11px] text-alm-ink-mute ml-1">{small}</small>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
