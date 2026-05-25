import type { GeoIpResult } from "@/app/api/geoip/route";

export async function fetchGeoIp(): Promise<GeoIpResult> {
  const res = await fetch("/api/geoip");
  if (!res.ok) throw new Error("geoip failed");
  return res.json();
}

export const geoipQueryKey = ["geoip"] as const;
