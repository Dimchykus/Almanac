export interface NasaApodResponse {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
}

export const apodQueryKey = (date: string) => ["apod", date] as const;

export async function fetchApodServer(date: string): Promise<NasaApodResponse> {
  const apiKey = process.env.NASA_API_KEY ?? "DEMO_KEY";
  const res = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`NASA APOD fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchApodClient(date: string): Promise<NasaApodResponse> {
  const res = await fetch(`/api/apod?date=${date}`);
  if (!res.ok) throw new Error(`APOD proxy fetch failed: ${res.status}`);
  return res.json();
}
