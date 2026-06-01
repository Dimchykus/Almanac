# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
pnpm dev          # start dev server
pnpm build        # production build
pnpm lint         # ESLint
pnpm test         # vitest watch mode
pnpm test:run     # vitest single run (CI)
pnpm test:ui      # vitest browser UI
```

Run a single test file: `pnpm test:run src/lib/weather.test.ts`

## Architecture

**Almanac** is a "daily briefing" dashboard — an observatory-aesthetic page showing astronomy, weather, on-this-day history, and facts for a chosen date.

### Data flow

The root server component (`app/page.tsx`) prefetches APOD and Wikipedia data via TanStack Query's `prefetchQuery`, then passes the dehydrated cache to `<HydrationBoundary>`. All subsequent per-date fetches triggered by client-side date navigation hit the Next.js API proxy routes (`app/api/*/route.ts`) rather than calling external APIs directly from the browser.

Each external API has a pair of functions in `src/lib/`:
- `fetch*Server()` — called from Server Components or API routes; uses `next: { revalidate }` for ISR caching
- `fetch*Client()` — called from Client Components; hits the local API proxy

**GeoIP dependency chain**: `WeatherCard` and `SunMoonCard` both first fetch from `/api/geoip` (via `geoipQueryKey`) to get lat/lon, then use those coordinates as part of their own query keys. Their TanStack queries use `enabled: !!geo` and won't fire until GeoIP resolves. GeoIP has no server-side variant — it always fetches client-side.

**Shared Wikipedia fetch**: `EventsCard` and `PeopleCard` both use the same `onThisDayQueryKey(date)` — TanStack deduplicates into a single network request.

### Contexts

- **`DateContext`** (`src/components/DateContext.tsx`) — holds the currently selected ISO date string (`yyyy-MM-dd`). `useDate()` and `useDateNav()` are the consumer hooks. All data-fetching cards subscribe to the date and re-query when it changes. Navigation is capped: `nextDay()` is a no-op when already on today's date.
- **`BookmarksContext`** (`src/components/BookmarksContext.tsx`) — in-memory list of `AlmanacBookmark` items (not persisted to localStorage). `EventsCard` auto-adds the top 3 events on data load.

Both contexts are mounted inside `app/providers.tsx` alongside `QueryClientProvider`.

### External APIs & env vars

| API | Purpose | Env var |
|-----|---------|---------|
| NASA APOD | Astronomy picture | `NASA_API_KEY` (falls back to `DEMO_KEY`) |
| Wikipedia REST | On This Day events/births/deaths + wiki summaries | none |
| Open-Meteo ERA5 | Historical weather | none |
| Open-Meteo Forecast | Sunrise/sunset | none |
| getgeoapi.com | IP geolocation → lat/lon | `GEO_API_KEY` |

### UI / styling

- Tailwind CSS v4 with custom `alm-*` OKLCH color tokens defined in `app/globals.css` (e.g. `bg-alm-bg`, `text-alm-ink`, `text-alm-ink-mute`, `text-alm-accent`).
- Fonts: `--font-sans` = IBM Plex Sans, `--font-mono` = IBM Plex Mono, `--font-display` = Instrument Serif (set on `<html>` via CSS variables).
- shadcn/ui components are available.
- **Icons**: Use `@tabler/icons-react` directly (e.g. `import { IconLink } from "@tabler/icons-react"`). Do not use `AlmIcon` — it is unused and can be deleted.
- Cards follow a numbered header pattern (`01` APOD, `02` Fact, `03` Weather, `04` Sun & Moon, `05` On This Day, `06` Births & Deaths). Continue the sequence for new cards.

### Types

All shared domain types live in `src/components/types.ts` (`AlmanacDate`, `AlmanacWeather`, `AlmanacSun`, `AlmanacEvent`, `AlmanacPerson`, `AlmanacFeatured`, `AlmanacBookmark`, `AlmanacData`, `WikiSummary`). The `GeoIpResult` type is co-located with its API route in `app/api/geoip/route.ts`.

### Path alias

`@` resolves to the project root (configured in `vitest.config.ts` and `tsconfig.json`). Imports from `src/` use `@/src/...`, not `@/...`.

### Testing

Vitest with jsdom + React Testing Library. Config in `vitest.config.ts`; setup in `vitest.setup.ts`. Tests live alongside source files or in `__tests__` directories under `src/`. Only pure utility functions in `src/lib/` (e.g. `parseWeatherData`, `parseSunData`) have been tested so far — no component tests exist yet.

### Static prototype pages

`app/entity/lindbergh/page.tsx` renders `EntityDetail`, a fully hardcoded design prototype for a future dynamic entity-detail route. It is not connected to live data or a dynamic `[slug]` segment.
