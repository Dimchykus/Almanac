"use client";

import { useQuery } from "@tanstack/react-query";
import { apodQueryKey, fetchApodClient } from "@/src/lib/apod";
import { onThisDayQueryKey, fetchOnThisDayClient } from "@/src/lib/wikipedia";
import { openAiQueryKey, fetchOpenAiClient } from "@/src/lib/open-ai";
import { weatherQueryKey, fetchWeatherClient } from "@/src/lib/weather";
import { sunQueryKey, fetchSunClient } from "@/src/lib/sun";
import { useGeo } from "@/src/hooks/use-geo";
import { useDate } from "@/src/contexts/date-context";

export interface SourceStatus {
  name: string;
  synced: boolean;
}

export function useSyncedSources() {
  const date = useDate();
  const { lat, lon, location, ready } = useGeo();

  const { data: apod } = useQuery({ queryKey: apodQueryKey(date), queryFn: () => fetchApodClient(date) });
  const { data: onThisDay } = useQuery({ queryKey: onThisDayQueryKey(date), queryFn: () => fetchOnThisDayClient(date) });
  const { data: fact } = useQuery({ queryKey: openAiQueryKey(date), queryFn: () => fetchOpenAiClient(date) });
  const { data: weather } = useQuery({
    queryKey: weatherQueryKey(date, lat, lon),
    queryFn: () => fetchWeatherClient(date, lat, lon, location),
    enabled: ready,
  });
  const { data: sun } = useQuery({
    queryKey: sunQueryKey(date, lat, lon),
    queryFn: () => fetchSunClient(date, lat, lon),
    enabled: ready,
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
