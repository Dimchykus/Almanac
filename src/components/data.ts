import type { AlmanacData } from "./types";

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
    moon: "Waxing Crescent",
    moonPct: 21,
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
  apod: {
    title: "M104: The Sombrero Galaxy",
    date: "2026 May 21",
    explanation:
      "One of the largest galaxies in the nearby Virgo Cluster, the Sombrero is a striking spiral seen nearly edge-on. A dark, thick dust lane traces the plane of its disk, silhouetted against a luminous central bulge of older yellow stars. The image was assembled from Hubble Space Telescope observations and resolved with infrared data, revealing structure within the dust ring and globular clusters in the halo.",
    copyright: "NASA · ESA · Hubble Heritage",
    ra: "12h 39m 59.4s",
    dec: "−11° 37′ 23″",
    distance: "31.1 Mly",
    type: "Spiral · Sa",
  },
  fact: {
    text: "May 21st is the day in 1927 that Charles Lindbergh lands in Paris after the first solo nonstop flight across the Atlantic Ocean.",
    source: "Numbers API · numbersapi.com",
  },
  events: [
    {
      y: "1881",
      body: "Clara Barton founds the American Red Cross in Washington, D.C., after years lobbying for U.S. ratification of the Geneva Convention.",
      ago: "145 yrs",
      saved: true,
    },
    {
      y: "1927",
      body: "Charles Lindbergh completes the first solo nonstop transatlantic flight, landing the Spirit of St. Louis at Le Bourget Field outside Paris after 33h 30m.",
      ago: "99 yrs",
      featured: true,
      saved: true,
    },
    {
      y: "1932",
      body: "Amelia Earhart becomes the first woman to fly solo across the Atlantic, landing in a pasture near Derry, Northern Ireland.",
      ago: "94 yrs",
    },
    {
      y: "1991",
      body: "Former Indian Prime Minister Rajiv Gandhi is assassinated by a suicide bomber at an election rally in Sriperumbudur, Tamil Nadu.",
      ago: "35 yrs",
    },
    {
      y: "2017",
      body: "Saudi Arabia and the United States sign a single-largest arms deal in American history, worth approximately US$110 billion.",
      ago: "9 yrs",
    },
  ],
  people: {
    born: [
      {
        name: "Albrecht Dürer",
        year: "1471",
        role: "German painter, printmaker, and theorist of the Northern Renaissance.",
      },
      {
        name: "Andrei Sakharov",
        year: "1921",
        role: "Soviet physicist and Nobel Peace laureate; designer of the RDS-37.",
      },
      {
        name: "Mr. T",
        year: "1952",
        role: "American actor and television personality, born Laurence Tureaud in Chicago.",
      },
    ],
    died: [
      {
        name: "Henri Rousseau",
        year: "1910",
        role: "French Post-Impressionist painter in the Naïve manner.",
      },
      {
        name: "Jane Addams",
        year: "1935",
        role: "American settlement activist and 1931 Nobel Peace laureate.",
      },
    ],
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
      swatch: "s-history",
    },
    {
      type: "apod",
      title: "M104: The Sombrero Galaxy",
      date: "May 21 · 2026",
      swatch: "s-apod",
    },
    {
      type: "person",
      title: "Albrecht Dürer",
      date: "Born May 21 · 1471",
      swatch: "s-person",
    },
    {
      type: "fact",
      title: "On Apr 12, the first reusable spacecraft Columbia is launched",
      date: "Apr 12 · 1981",
      swatch: "s-fact",
    },
    {
      type: "history",
      title: "Marie Curie and Pierre Curie announce the discovery of polonium",
      date: "Jul 18 · 1898",
      swatch: "s-history",
    },
    {
      type: "apod",
      title: "Cassiopeia A: A Supernova Remnant",
      date: "Mar 09 · 2026",
      swatch: "s-apod",
    },
    {
      type: "person",
      title: "Ada Lovelace",
      date: "Born Dec 10 · 1815",
      swatch: "s-person",
    },
  ],
};
