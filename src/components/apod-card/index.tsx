"use client";

import { useQuery } from "@tanstack/react-query";
import { apodQueryKey, fetchApodClient } from "@/src/lib/apod";
import { useDate } from "@/src/contexts/date-context";

export function ApodCard() {
  const date = useDate();

  const { data: nasaApod } = useQuery({
    queryKey: apodQueryKey(date),
    queryFn: () => fetchApodClient(date),
    enabled: !!date,
  });

  if (!nasaApod) return null;

  const apod = {
    title: nasaApod.title,
    date: nasaApod.date,
    explanation: nasaApod.explanation,
    url: nasaApod.url,
    media_type: nasaApod.media_type,
  };

  const hasImage = apod.url && apod.media_type === "image";

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">01</span> Astronomy
          Picture of the Day
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          NASA · APOD
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr] min-h-[220px] sm:min-h-[460px]">
        <div className="relative overflow-hidden min-h-[220px] sm:min-h-0">
          {hasImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={apod.url}
              alt={apod.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : apod.url && apod.media_type === "video" ? (
            <iframe
              src={apod.url}
              title={apod.title}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.25 0.04 280) 0%, oklch(0.18 0.03 240) 40%, oklch(0.12 0.02 245) 100%)",
              }}
            >
              <div className="alm-galaxy" />
              <div className="alm-galaxy-stars" />
            </div>
          )}

          <div className="absolute inset-4 border border-[oklch(0.95_0.01_80/0.18)] pointer-events-none">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[oklch(0.95_0.01_80/0.18)]" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[oklch(0.95_0.01_80/0.18)]" />
          </div>
        </div>

        <div className="p-5 sm:p-7 flex flex-col gap-3 sm:gap-3.5">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-accent flex gap-2.5 items-center">
            ○ Image of the Day · {apod.date}
          </div>
          <h2 className="font-display text-[26px] sm:text-[36px] leading-[1.05] font-normal text-alm-ink tracking-[-0.01em] m-0">
            {apod.title}
          </h2>
          <p className="text-sm leading-[1.65] text-alm-ink-dim m-0 max-w-[52ch]">
            {apod.explanation}
          </p>

          <div className="mt-auto inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.14em] uppercase text-alm-accent cursor-pointer w-fit">
            <span className="text-alm-ink-faint mr-2">© NASA</span>
          </div>
        </div>
      </div>
    </article>
  );
}
