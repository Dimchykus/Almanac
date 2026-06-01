"use client";

import { useQuery } from "@tanstack/react-query";
import { weatherQueryKey, fetchWeatherClient } from "@/src/lib/weather";
import { useGeo } from "@/src/hooks/use-geo";
import { useDate } from "@/src/contexts/date-context";
import { IconMapPin } from "@tabler/icons-react";
import { Skeleton, CardError } from "@/src/components/ui/skeleton";

const SHELL = "bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden";
const HEADER = "flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]";

export function WeatherCard() {
  const date = useDate();
  const { lat, lon, location, ready } = useGeo();

  const { data: weather, isPending, isError, refetch } = useQuery({
    queryKey: weatherQueryKey(date, lat, lon),
    queryFn: () => fetchWeatherClient(date, lat, lon, location),
    enabled: ready && !!date,
  });

  const header = (
    <div className={HEADER}>
      <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
        <span className="text-alm-accent font-semibold">03</span> Weather
      </div>
      <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
        Open-Meteo · Archive
      </div>
    </div>
  );

  if (isPending) {
    return (
      <article className={SHELL}>
        {header}
        <div className="p-4 sm:p-5">
          <Skeleton className="h-3 w-40 mb-3.5" />
          <Skeleton className="h-14 w-28 mb-1" />
          <Skeleton className="h-5 w-36 mb-4" />
          <div className="grid grid-cols-2 gap-2 gap-x-3.5 pt-3.5 border-t border-[oklch(0.240_0.018_245)]">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (isError) {
    return (
      <article className={SHELL}>
        {header}
        <CardError onRetry={refetch} />
      </article>
    );
  }

  const rows = [
    { k: "High", v: `${weather!.hi}°` },
    { k: "Low", v: `${weather!.lo}°` },
    { k: "Wind", v: weather!.wind },
    { k: "Humidity", v: weather!.humidity },
    { k: "Pressure", v: weather!.pressure },
    { k: "UV", v: weather!.uv },
  ];

  return (
    <article className={SHELL}>
      {header}
      <div className="p-4 sm:p-5">
        <div className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em] uppercase text-alm-ink-mute mb-3 sm:mb-3.5 flex items-center gap-2">
          <IconMapPin size={11} />
          {weather!.location} · {weather!.coord}
        </div>
        <div className="font-display text-[48px] sm:text-[56px] leading-none tracking-[-0.02em] text-alm-ink flex items-start">
          {weather!.now}
          <sup className="text-[18px] sm:text-[20px] mt-3 text-alm-ink-mute">°C</sup>
        </div>
        <p className="font-display italic text-[18px] text-alm-ink-dim mt-1 m-0">
          {weather!.desc}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2 gap-x-3.5 pt-3.5 border-t border-[oklch(0.240_0.018_245)]">
          {rows.map(({ k, v }) => (
            <div
              key={k}
              className="flex justify-between font-mono text-[11px] text-alm-ink-dim"
            >
              <span className="text-alm-ink-faint tracking-[0.06em] uppercase">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
