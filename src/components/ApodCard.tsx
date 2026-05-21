import { AlmIcon } from "./AlmIcon";
import type { AlmanacApod } from "./types";

interface ApodCardProps {
  apod: AlmanacApod;
}

export function ApodCard({ apod }: ApodCardProps) {
  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      {/* Card head */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">01</span> Astronomy Picture of the Day
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          NASA · APOD
        </div>
      </div>

      {/* Two-col layout */}
      <div className="grid grid-cols-[1.1fr_1fr] min-h-[460px]">
        {/* Image panel */}
        <div
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.25 0.04 280) 0%, oklch(0.18 0.03 240) 40%, oklch(0.12 0.02 245) 100%)",
          }}
        >
          {/* Galaxy artwork */}
          <div className="alm-galaxy" />
          <div className="alm-galaxy-stars" />

          {/* Crosshair */}
          <div className="absolute inset-4 border border-[oklch(0.95_0.01_80/0.18)] pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[oklch(0.95_0.01_80/0.18)]" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[oklch(0.95_0.01_80/0.18)]" />
          </div>

          {/* Coords */}
          <div className="absolute bottom-4 left-5 font-mono text-[10px] tracking-[0.12em] text-[oklch(0.92_0.01_80/0.75)] uppercase">
            RA {apod.ra}
          </div>
          <div className="absolute bottom-4 right-5 font-mono text-[10px] tracking-[0.12em] text-[oklch(0.92_0.01_80/0.75)] uppercase">
            DEC {apod.dec}
          </div>
        </div>

        {/* Text panel */}
        <div className="p-7 flex flex-col gap-3.5">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-accent flex gap-2.5 items-center">
            ○ Image of the Day · {apod.date}
          </div>
          <h2 className="font-display text-[36px] leading-[1.05] font-normal text-alm-ink tracking-[-0.01em] m-0">
            {apod.title}
          </h2>
          <p className="text-sm leading-[1.65] text-alm-ink-dim m-0 max-w-[52ch]">
            {apod.explanation}
          </p>

          {/* Metadata grid */}
          <div className="mt-auto grid grid-cols-2 gap-3 gap-x-6 pt-4 border-t border-[oklch(0.240_0.018_245)]">
            {[
              { k: "Distance", v: apod.distance },
              { k: "Type", v: apod.type },
              { k: "Right Asc.", v: apod.ra },
              { k: "Declination", v: apod.dec },
            ].map(({ k, v }) => (
              <div key={k}>
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint">
                  {k}
                </div>
                <div className="font-mono text-xs text-alm-ink mt-1">{v}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-alm-accent cursor-pointer w-fit">
            View full plate <AlmIcon name="external" size={12} />
          </div>
        </div>
      </div>
    </article>
  );
}
