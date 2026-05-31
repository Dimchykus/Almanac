"use client";

import { useQuery } from "@tanstack/react-query";
import { geoipQueryKey, fetchGeoIp } from "@/src/lib/geoip";

export function useGeo() {
  const { data: geo } = useQuery({
    queryKey: geoipQueryKey,
    queryFn: fetchGeoIp,
  });

  return {
    geo,
    lat: geo?.lat ?? 0,
    lon: geo?.lon ?? 0,
    location: geo ? `${geo.city}, ${geo.countryCode}` : "",
    ready: !!geo,
  };
}
