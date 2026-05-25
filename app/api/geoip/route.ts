import { type NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEO_API_KEY;

export interface GeoIpResult {
  lat: number;
  lon: number;
  city: string;
  countryCode: string;
}

export async function GET(request: NextRequest) {
  if (!apiKey)
    return NextResponse.json(
      { error: "GEO_API_KEY not configured" },
      { status: 500 },
    );

  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  const ip = (forwarded?.split(",")[0] ?? realIp ?? "").trim();

  // check if ip is valid and matches the regex pattern
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;

  const url = ipRegex.test(ip)
    ? `https://api.getgeoapi.com/v2/ip/${ip}?api_key=${apiKey}&format=json`
    : `https://api.getgeoapi.com/v2/ip/check?api_key=${apiKey}&format=json`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  if (!res.ok)
    return NextResponse.json(
      { error: "geoip upstream failed" },
      { status: 502 },
    );

  const data = await res.json();

  if (data.status !== "success")
    return NextResponse.json(
      { error: data.status_message ?? "geoip failed" },
      { status: 400 },
    );

  const result: GeoIpResult = {
    lat: parseFloat(data.location.latitude),
    lon: parseFloat(data.location.longitude),
    city: data.city?.name ?? "Unknown",
    countryCode: data.country?.code ?? "",
  };
  return NextResponse.json(result);
}
