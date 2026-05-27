import type { AlmanacData } from "../types";

export const ALMANAC_DATA: AlmanacData = {
  date: {
    iso: "2026-05-21",
    weekday: "THU",
    weekdayLong: "Thursday",
    month: "May",
    monthNum: "05",
    day: "21",
    year: "2026",
    dayOfYear: 141,
    daysRemaining: 224,
    weekOfYear: 21,
  },
  sun: {
    rise: "05:53",
    set: "20:23",
    length: "14h 30m",
    noon: "",
  },
  weather: {
    location: "San Francisco, CA",
    coord: "37.77°N · 122.42°W",
    hi: 18,
    lo: 11,
    now: 16,
    desc: "Marine layer, clearing",
    wind: "WSW 12 km/h",
    humidity: "78%",
    pressure: "1018 hPa",
    uv: "Moderate · 6",
  },
  fact: {
    text: "May 21st is the day in 1927 that Charles Lindbergh lands in Paris after the first solo nonstop flight across the Atlantic Ocean.",
    source: "Numbers API · numbersapi.com",
  },
  featured: {
    title: "Charles Lindbergh",
    lede: "American aviator, military officer, and the first to fly solo nonstop across the Atlantic Ocean.",
    body: "Charles Augustus Lindbergh (1902 – 1974) was a U.S. Air Mail pilot from Detroit who, at twenty-five, captured the Orteig Prize by flying the single-engine monoplane Spirit of St. Louis from Roosevelt Field, New York to Le Bourget, Paris on May 20–21, 1927. The thirty-three-and-a-half-hour solo crossing made him an instant global celebrity and accelerated the commercial development of transatlantic aviation.",
    tags: ["Aviator", "1902–1974", "Spirit of St. Louis", "Medal of Honor", "Orteig Prize"],
    src: "Wikipedia · en.wikipedia.org",
  },
  bookmarks: [
    {
      type: "history",
      title: "Charles Lindbergh completes the first solo nonstop transatlantic flight",
      date: "May 21 · 1927",
    },
    {
      type: "apod",
      title: "M104: The Sombrero Galaxy",
      date: "May 21 · 2026",
    },
    {
      type: "person",
      title: "Albrecht Dürer",
      date: "Born May 21 · 1471",
    },
    {
      type: "fact",
      title: "On Apr 12, the first reusable spacecraft Columbia is launched",
      date: "Apr 12 · 1981",
    },
    {
      type: "history",
      title: "Marie Curie and Pierre Curie announce the discovery of polonium",
      date: "Jul 18 · 1898",
    },
    {
      type: "apod",
      title: "Cassiopeia A: A Supernova Remnant",
      date: "Mar 09 · 2026",
    },
    {
      type: "person",
      title: "Ada Lovelace",
      date: "Born Dec 10 · 1815",
    },
  ],
};
