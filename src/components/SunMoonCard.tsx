"use client";

import { useQuery } from "@tanstack/react-query";
import { sunQueryKey, fetchSunClient } from "@/src/lib/sun";
import { fetchGeoIp, geoipQueryKey } from "@/src/lib/geoip";
import { useDate } from "./DateContext";

export function SunMoonCard() {
  const date = useDate();

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

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">04</span> Sun &amp; Moon
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Open-Meteo · Forecast
        </div>
      </div>
      <div className="p-5">
        {/* Sun arc */}
        <div className="alm-sun-arc" />

        {/* Grid */}
        <div className="grid grid-cols-2 gap-2">
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
