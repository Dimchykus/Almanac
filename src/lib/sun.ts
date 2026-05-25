import type { AlmanacSun } from "@/src/components/types";

interface OpenMeteoForecastSunResponse {
  daily: {
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
}

export const sunQueryKey = (date: string, lat: number, lon: number) =>
  ["sun", date, lat, lon] as const;

export async function fetchSunServer(
  date: string,
  lat: number,
  lon: number,
): Promise<AlmanacSun> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    start_date: date,
    end_date: date,
    daily: "sunrise,sunset",
    timezone: "auto",
  });

  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok)
    throw new Error(`Open-Meteo forecast fetch failed: ${res.status}`);

  const data: OpenMeteoForecastSunResponse = await res.json();

  return parseSunData(data);
}

export async function fetchSunClient(
  date: string,
  lat: number,
  lon: number,
): Promise<AlmanacSun> {
  const params = new URLSearchParams({
    date,
    lat: String(lat),
    lon: String(lon),
  });
  const res = await fetch(`/api/sun?${params}`);
  if (!res.ok) throw new Error(`Sun proxy fetch failed: ${res.status}`);

  return res.json();
}

function parseTimeFromISO(isoStr: string): string {
  return isoStr.split("T")[1] ?? "—";
}

function computeDaylight(rise: string, set: string): string {
  const [rh, rm] = rise.split(":").map(Number);
  const [sh, sm] = set.split(":").map(Number);
  const diff = sh * 60 + sm - (rh * 60 + rm);
  const h = Math.floor(diff / 60);
  const m = diff % 60;

  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

function computeNoon(rise: string, set: string): string {
  const [rh, rm] = rise.split(":").map(Number);
  const [sh, sm] = set.split(":").map(Number);
  const midMin = Math.round((rh * 60 + rm + sh * 60 + sm) / 2);
  const h = Math.floor(midMin / 60);
  const m = midMin % 60;

  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

export function parseSunData(data: OpenMeteoForecastSunResponse): AlmanacSun {
  const rise = parseTimeFromISO(data.daily.sunrise[0]);
  const set = parseTimeFromISO(data.daily.sunset[0]);
  const length = computeDaylight(rise, set);
  const noon = computeNoon(rise, set);

  return { rise, set, length, noon };
}
