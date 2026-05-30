# Almanac

A date-driven discovery app that assembles a rich daily briefing — astronomy, weather, history, notable people — for any date you choose.

---

## Running the project

### Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)

### Local development

```bash
# 1. Install dependencies
pnpm install

# 2. Copy the env file and fill in your keys (see below)
cp .env.example .env

# 3. Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Where to get it |
|---|---|---|
| `NASA_API_KEY` | No | [api.nasa.gov](https://api.nasa.gov) — falls back to `DEMO_KEY` |
| `GEO_API_KEY` | Yes | [getgeoapi.com](https://getgeoapi.com) |
| `OPENAI_API_KEY` | No | [platform.openai.com](https://platform.openai.com) — used for the Fact card |

### Docker

```bash
docker build -t almanac .
docker run -p 3000:3000 --env-file .env almanac
```

### Other commands

```bash
pnpm build       # production build
pnpm lint        # ESLint
pnpm test:run    # Vitest (single run)
pnpm test        # Vitest (watch)
pnpm test:ui     # Vitest browser UI
```

---

## Architecture decisions

### Framework: Next.js (App Router)

I chose Next.js primarily for its server/client split, which maps naturally to this problem. Several of the API calls are expensive or subject to rate limits (NASA, Wikipedia). Running them server-side lets me use Next.js ISR — a single server fetch is cached and reused across all visitors for a given date, rather than every browser tab hitting the external API independently.

The App Router's `async` server components also let me prefetch on first load without any client-side loading flicker. TanStack Query's `prefetchQuery` + `HydrationBoundary` pattern means the page lands with data already in cache; subsequent date changes trigger client fetches through local API proxy routes that enforce the same ISR caching.

### Data fetching: TanStack Query

Each external API has two entry points in `src/lib/`: a `fetch*Server()` function (used in server components and API routes, with `next: { revalidate }` caching) and a `fetch*Client()` function (used from client components, hitting `/api/*` proxy routes). This keeps external API keys server-side and gives ISR caching to both the initial load and subsequent navigations.

TanStack Query provides deduplication for free — `EventsCard` and `PeopleCard` share the same `onThisDayQueryKey`, so they make exactly one Wikipedia request between them regardless of render order.

### APIs integrated

| Card | Source |
|---|---|
| **01 — APOD** | NASA Astronomy Picture of the Day |
| **02 — Fact** | OpenAI (generates a curated fact about the date) |
| **03 — Weather** | Open-Meteo ERA5 archive + Forecast endpoints |
| **04 — Sun & Moon** | Open-Meteo Forecast (sunrise/sunset) |
| **05 — On This Day** | Wikipedia REST API |
| **06 — Births & Deaths** | Wikipedia REST API (same request as #05, deduplicated) |

GeoIP (getgeoapi.com) runs client-side on page load to resolve the user's latitude/longitude. Weather and Sun cards both depend on it — their TanStack queries are gated with `enabled: !!geo` so they stay idle until coordinates are available.

### Styling: Tailwind CSS v4 + shadcn/ui

Tailwind v4 lets me define the entire design token set — colors, fonts, radii — as CSS custom properties in `globals.css` using OKLCH, which gives perceptually uniform color scales. The custom `alm-*` tokens (`alm-bg`, `alm-ink`, `alm-accent`, etc.) mean component code never references raw hex values.

shadcn/ui provides a set of accessible, unstyled-by-default primitives (modals, popovers) that slot into the same token system without fighting Tailwind.

## Known tradeoffs

**Fact card uses OpenAI.** The assignment lists Numbers API as an option for date facts. I used OpenAI instead because it can produce richer, more contextually relevant facts. The tradeoff is that it requires an API key and has latency — Numbers API would be faster and key-free. The card degrades gracefully if `OPENAI_API_KEY` is not set.

### Bookmarks persistence

Bookmarks are stored in `localStorage` and survive page reloads. The `BookmarksProvider` starts with an empty array on both the server render and the first client render to avoid hydration mismatches, then reads `localStorage` in a `useEffect` after mount. A second effect writes back on every change, but only after that initial hydration flag is set — so the empty server state is never written over the stored data.

---

## What I'd do with more time

- **Wire the Featured card** to the Wikipedia "featured article" endpoint so it reflects the actual selected date
- **Date picker UX** — the current modal works but a calendar popover would feel more natural
- **Better mobile layout** — the card grid is responsive but the card ordering on small screens is driven by DOM order, which isn't always the right reading priority
