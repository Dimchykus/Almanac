"use client";

import { useQuery } from "@tanstack/react-query";
import { apodQueryKey, fetchApodClient } from "@/src/lib/apod";
import { onThisDayQueryKey, fetchOnThisDayClient } from "@/src/lib/wikipedia";
import { openAiQueryKey, fetchOpenAiClient } from "@/src/lib/open-ai";
import { weatherQueryKey, fetchWeatherClient } from "@/src/lib/weather";
import { sunQueryKey, fetchSunClient } from "@/src/lib/sun";
import { geoipQueryKey, fetchGeoIp } from "@/src/lib/geoip";
import { useDate } from "@/src/components/date-context";

export interface SourceStatus {
  name: string;
  synced: boolean;
}

export function useSyncedSources() {
  const date = useDate();

  const { data: geo } = useQuery({ queryKey: geoipQueryKey, queryFn: fetchGeoIp });
  const { data: apod } = useQuery({ queryKey: apodQueryKey(date), queryFn: () => fetchApodClient(date) });
  const { data: onThisDay } = useQuery({ queryKey: onThisDayQueryKey(date), queryFn: () => fetchOnThisDayClient(date) });
  const { data: fact } = useQuery({ queryKey: openAiQueryKey(date), queryFn: () => fetchOpenAiClient(date) });
  const { data: weather } = useQuery({
    queryKey: weatherQueryKey(date, geo?.lat ?? 0, geo?.lon ?? 0),
    queryFn: () => fetchWeatherClient(date, geo!.lat, geo!.lon, geo?.city ?? ""),
    enabled: !!geo,
  });
  const { data: sun } = useQuery({
    queryKey: sunQueryKey(date, geo?.lat ?? 0, geo?.lon ?? 0),
    queryFn: () => fetchSunClient(date, geo!.lat, geo!.lon),
    enabled: !!geo,
  });

  const sources: SourceStatus[] = [
    { name: "NASA APOD",   synced: !!apod },
    { name: "OpenAI",      synced: !!fact },
    { name: "Wikipedia",   synced: !!onThisDay },
    { name: "Open-Meteo",  synced: !!weather && !!sun },
  ];

  return {
    sources,
    syncedCount: sources.filter((s) => s.synced).length,
    total: sources.length,
  };
}
