"use client";

import { useQuery } from "@tanstack/react-query";
import { weatherQueryKey, fetchWeatherClient } from "@/src/lib/weather";
import type { GeoIpResult } from "@/app/api/geoip/route";
import { useDate } from "./DateContext";
import { AlmIcon } from "./AlmIcon";

async function fetchGeoIp(): Promise<GeoIpResult> {
  const res = await fetch("/api/geoip");
  if (!res.ok) throw new Error("geoip failed");
  return res.json();
}

export function WeatherCard() {
  const date = useDate();

  const { data: geo } = useQuery({
    queryKey: ["geoip"],
    queryFn: fetchGeoIp,
  });

  const location = geo ? `${geo.city}, ${geo.countryCode}` : "";

  const { data: weather } = useQuery({
    queryKey: weatherQueryKey(date, geo?.lat ?? 0, geo?.lon ?? 0),
    queryFn: () => fetchWeatherClient(date, geo!.lat, geo!.lon, location),
    enabled: !!geo && !!date,
  });

  if (!weather) return null;

  const rows = [
    { k: "High", v: `${weather.hi}°` },
    { k: "Low", v: `${weather.lo}°` },
    { k: "Wind", v: weather.wind },
    { k: "Humidity", v: weather.humidity },
    { k: "Pressure", v: weather.pressure },
    { k: "UV", v: weather.uv },
  ];

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">03</span> Weather
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Open-Meteo · Archive
        </div>
      </div>
      <div className="p-5">
        <div className="font-mono text-[11px] tracking-[0.1em] uppercase text-alm-ink-mute mb-3.5 flex items-center gap-2">
          <AlmIcon name="pin" size={11} />
          {weather.location} · {weather.coord}
        </div>
        <div className="font-display text-[56px] leading-none tracking-[-0.02em] text-alm-ink flex items-start">
          {weather.now}
          <sup className="text-[20px] mt-1.5 text-alm-ink-mute">°C</sup>
        </div>
        <div className="font-display italic text-[18px] text-alm-ink-dim mt-1">
          {weather.desc}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 gap-x-3.5 pt-3.5 border-t border-[oklch(0.240_0.018_245)]">
          {rows.map(({ k, v }) => (
            <div
              key={k}
              className="flex justify-between font-mono text-[11px] text-alm-ink-dim"
            >
              <span className="text-alm-ink-faint tracking-[0.06em] uppercase">
                {k}
              </span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
