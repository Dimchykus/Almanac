export interface AlmanacDate {
  iso: string;
  weekday: string;
  weekdayLong: string;
  month: string;
  monthNum: string;
  day: string;
  year: string;
  dayOfYear: number;
  daysRemaining: number;
  weekOfYear: number;
}

export interface AlmanacSun {
  rise: string;
  set: string;
  length: string;
  noon: string;
}

export interface AlmanacWeather {
  location: string;
  coord: string;
  hi: number;
  lo: number;
  now: number;
  desc: string;
  wind: string;
  humidity: string;
  pressure: string;
  uv: string;
}

export interface AlmanacFact {
  text: string;
}

export interface AlmanacEvent {
  y: string;
  body: string;
  ago: string;
  wikiTitle?: string;
}

export interface AlmanacPerson {
  name: string;
  year: string;
  role: string;
  wikiTitle?: string;
}

export interface WikiSummary {
  title: string;
  description: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
  contentUrl: string;
}

export interface AlmanacFeatured {
  title: string;
  lede: string;
  body: string;
  tags: string[];
  src: string;
}

export interface AlmanacBookmark {
  type: string;
  title: string;
  date: string;
}

export interface AlmanacData {
  date: AlmanacDate;
  sun: AlmanacSun;
  weather: AlmanacWeather;
  fact: AlmanacFact;
  featured: AlmanacFeatured;
  bookmarks: AlmanacBookmark[];
}
