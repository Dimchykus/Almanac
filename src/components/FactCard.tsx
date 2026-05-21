import type { AlmanacDate, AlmanacFact } from "./types";

interface FactCardProps {
  date: AlmanacDate;
  fact: AlmanacFact;
}

export function FactCard({ date, fact }: FactCardProps) {
  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">02</span> Date Fact
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Numbers API
        </div>
      </div>
      <div className="p-5 flex flex-col gap-3">
        <div className="font-display text-[64px] leading-none text-alm-accent italic">
          {date.day}
        </div>
        <div className="font-display text-[20px] leading-[1.3] text-alm-ink">
          {fact.text}
        </div>
        <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint">
          {fact.source}
        </div>
      </div>
    </article>
  );
}
