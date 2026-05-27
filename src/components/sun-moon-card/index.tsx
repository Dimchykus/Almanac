"use client";

import { useQuery } from "@tanstack/react-query";
import { sunQueryKey, fetchSunClient } from "@/src/lib/sun";
import { fetchGeoIp, geoipQueryKey } from "@/src/lib/geoip";
import { useDate, useDateNav } from "../date-context";

function toMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function calcMarker(rise: string, set: string) {
  const riseMin = toMinutes(rise);
  const setMin = toMinutes(set);
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  if (nowMin <= riseMin || nowMin >= setMin) return null;

  const p = (nowMin - riseMin) / (setMin - riseMin);
  const θ = Math.PI * (1 - p);
  return { cx: 50 + 50 * Math.cos(θ), cy: 80 - 80 * Math.sin(θ) };
}

export function SunMoonCard() {
  const date = useDate();
  const { isToday } = useDateNav();

  const { data: geo } = useQuery({
    queryKey: geoipQueryKey,
    queryFn: fetchGeoIp,
  });

  const { data: sun } = useQuery({
    queryKey: sunQueryKey(date, geo?.lat ?? 0, geo?.lon ?? 0),
    queryFn: () => fetchSunClient(date, geo!.lat, geo!.lon),
    enabled: !!geo && !!date,
  });

  if (!sun) return null;

  const marker = isToday ? calcMarker(sun.rise, sun.set) : null;

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">04</span> Sun &amp;
          Moon
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Open-Meteo · Forecast
        </div>
      </div>
      <div className="p-5 flex flex-col items-center">
        {/* Sun arc */}
        <div className="alm-sun-arc relative w-full max-w-[300px] mx-auto">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 80"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 0 80 A 50 80 0 0 1 100 80"
              fill="none"
              stroke="oklch(0.760 0.160 60)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              opacity="0.4"
            />
          </svg>

          {marker && (
            <span
              className="absolute w-[10px] h-[10px] bg-alm-accent rounded-full shadow-[0_0_0_4px_oklch(0.76_0.16_60_/_0.25)]"
              style={{
                left: `calc(${marker.cx.toFixed(2)}% - 5px)`,
                top: `${(marker.cy - 5).toFixed(2)}px`,
              }}
            />
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2 w-full">
          {[
            { k: "Sunrise", v: sun.rise },
            { k: "Sunset", v: sun.set },
            { k: "Daylight", v: sun.length },
            { k: "Solar Noon", v: sun.noon },
          ].map(({ k, v }) => (
            <div key={k} className="font-mono text-[11px] text-alm-ink-dim">
              <span className="block text-alm-ink-faint tracking-[0.1em] uppercase mb-0.5 text-[10px]">
                {k}
              </span>
              {v}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
