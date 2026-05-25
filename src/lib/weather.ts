import type { AlmanacWeather } from "@/src/components/types";

export interface OpenMeteoEra5Response {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    wind_speed_10m_max: number[];
    wind_direction_10m_dominant: number[];
    weather_code: number[];
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    surface_pressure: number[];
    uv_index: number[];
  };
}

export const weatherQueryKey = (date: string, lat: number, lon: number) =>
  ["weather", date, lat, lon] as const;

export async function fetchWeatherServer(
  date: string,
  lat: number,
  lon: number,
  location: string
): Promise<AlmanacWeather> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    start_date: date,
    end_date: date,
    daily:
      "temperature_2m_max,temperature_2m_min,wind_speed_10m_max,wind_direction_10m_dominant,weather_code",
    hourly: "temperature_2m,relative_humidity_2m,surface_pressure,uv_index",
    wind_speed_unit: "kmh",
    timezone: "auto",
  });

  const res = await fetch(
    `https://archive-api.open-meteo.com/v1/era5?${params}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`Open-Meteo ERA5 fetch failed: ${res.status}`);

  const data: OpenMeteoEra5Response = await res.json();
  const coord = formatCoord(lat, lon);
  return parseWeatherData(data, location, coord);
}

export async function fetchWeatherClient(
  date: string,
  lat: number,
  lon: number,
  location: string
): Promise<AlmanacWeather> {
  const params = new URLSearchParams({ date, lat: String(lat), lon: String(lon), location });
  const res = await fetch(`/api/weather?${params}`);
  if (!res.ok) throw new Error(`Weather proxy fetch failed: ${res.status}`);
  return res.json();
}

function formatCoord(lat: number, lon: number): string {
  const latStr = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}`;
  const lonStr = `${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
  return `${latStr} · ${lonStr}`;
}

function degreesToCompass(deg: number): string {
  const dirs = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW",
  ];
  return dirs[Math.round(deg / 22.5) % 16];
}

const WEATHER_CODE_DESC: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog", 48: "Fog",
  51: "Drizzle", 52: "Drizzle", 53: "Drizzle", 54: "Drizzle", 55: "Drizzle",
  61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
  66: "Freezing rain", 67: "Freezing rain",
  71: "Snow", 72: "Snow", 73: "Snow", 74: "Snow", 75: "Snow",
  77: "Snow grains",
  80: "Slight showers", 81: "Moderate showers", 82: "Heavy showers",
  85: "Snow showers", 86: "Snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm w/ hail", 99: "Thunderstorm w/ hail",
};

function weatherCodeToDesc(code: number): string {
  return WEATHER_CODE_DESC[code] ?? "Variable";
}

const UV_LABELS: [number, string][] = [
  [2, "Low"],
  [5, "Moderate"],
  [7, "High"],
  [10, "Very High"],
  [Infinity, "Extreme"],
];

function uvToLabel(uv: number): string {
  return UV_LABELS.find(([max]) => uv <= max)![1];
}

export function parseWeatherData(
  data: OpenMeteoEra5Response,
  location: string,
  coord: string
): AlmanacWeather {
  const { daily, hourly } = data;
  const noonIdx = 12;

  const hi = Math.round(daily.temperature_2m_max[0]);
  const lo = Math.round(daily.temperature_2m_min[0]);
  const now = Math.round(hourly.temperature_2m[noonIdx]);
  const humidity = `${Math.round(hourly.relative_humidity_2m[noonIdx])}%`;
  const pressure = `${Math.round(hourly.surface_pressure[noonIdx])} hPa`;

  const uvRaw = Math.round(hourly.uv_index[noonIdx] ?? 0);
  const uv = `${uvToLabel(uvRaw)} · ${uvRaw}`;

  const windSpeed = Math.round(daily.wind_speed_10m_max[0]);
  const windDir = degreesToCompass(daily.wind_direction_10m_dominant[0]);
  const wind = `${windDir} ${windSpeed} km/h`;

  const desc = weatherCodeToDesc(daily.weather_code[0]);

  return { location, coord, hi, lo, now, desc, wind, humidity, pressure, uv };
}
