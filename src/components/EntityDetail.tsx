import { AlmIcon } from "./AlmIcon";

export function EntityDetail() {
  return (
    <div
      className="min-h-full bg-alm-bg text-alm-ink font-sans antialiased"
      style={{ fontFeatureSettings: '"ss01", "cv11", "tnum"' }}
    >
      {/* Top bar */}
      <header className="flex items-center gap-6 px-8 h-14 border-b border-[oklch(0.240_0.018_245)] bg-gradient-to-b from-[oklch(0.15_0.015_245)] to-transparent flex-shrink-0">
        <div className="font-display text-[22px] tracking-[0.12em] text-alm-ink flex items-center">
          ALMANAC
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-alm-accent mx-2 mb-0.5 align-middle" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-alm-ink-mute">
            OBS · 037
          </span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2 h-8 px-3 border border-[oklch(0.295_0.020_245)] rounded-md bg-[oklch(0.155_0.015_245/0.6)] font-mono text-xs text-alm-ink-mute min-w-[280px]">
          <AlmIcon name="search" size={14} />
          <span>Search dates, events, entities…</span>
          <span className="ml-auto text-[10px] px-1 py-0.5 border border-[oklch(0.295_0.020_245)] rounded text-alm-ink-faint">
            ⌘K
          </span>
        </div>
        <button className="w-8 h-8 inline-flex items-center justify-center border border-[oklch(0.295_0.020_245)] bg-transparent text-alm-ink-dim rounded-md cursor-pointer">
          <AlmIcon name="bookmark" />
        </button>
        <button className="w-8 h-8 inline-flex items-center justify-center border border-[oklch(0.295_0.020_245)] bg-transparent text-alm-ink-dim rounded-md cursor-pointer">
          <AlmIcon name="settings" />
        </button>
      </header>

      {/* Two-col detail layout */}
      <div className="grid min-h-[calc(100vh-56px)]" style={{ gridTemplateColumns: "1fr 1.2fr" }}>
        {/* Image / portrait panel */}
        <div
          className="relative overflow-hidden p-8 flex flex-col justify-between"
          style={{
            background: "linear-gradient(180deg, oklch(0.22 0.03 60) 0%, oklch(0.14 0.02 245) 100%)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 9px, oklch(0.95 0.01 80 / 0.04) 9px 10px)",
            }}
          />

          {/* Breadcrumb */}
          <div className="relative z-10 font-mono text-[10px] tracking-[0.16em] uppercase text-[oklch(0.92_0.01_80/0.7)] flex gap-3 items-center">
            <span className="text-alm-accent">←</span>
            <span>May 21, 2026</span>
            <span className="text-alm-ink-faint">/</span>
            <span>On This Day</span>
            <span className="text-alm-ink-faint">/</span>
            <span>1927 · Lindbergh</span>
          </div>

          {/* Silhouette */}
          <div
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
            style={{
              width: "60%",
              aspectRatio: "1 / 1.5",
              background: "oklch(0.10 0.015 245 / 0.85)",
              borderRadius: "50% 50% 8% 8% / 55% 55% 8% 8%",
            }}
          />

          <div className="relative z-10 font-mono text-[10px] tracking-[0.16em] uppercase text-[oklch(0.92_0.01_80/0.6)]">
            Plate 014 · Portrait Reference · Wikipedia Commons
          </div>
        </div>

        {/* Body panel */}
        <div className="px-16 py-14 bg-alm-bg flex flex-col gap-6 overflow-y-auto">
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-accent flex gap-3.5 items-center">
            ○ Featured Entity · Wikipedia · Pulled 12s ago
          </div>

          <h1 className="font-display text-[72px] leading-[0.98] m-0 font-normal tracking-[-0.02em] text-alm-ink">
            Charles
            <br />
            <em className="italic text-alm-accent">Lindbergh</em>
          </h1>

          <div className="font-display italic text-[22px] leading-[1.4] text-alm-ink-dim max-w-[32ch]">
            &ldquo;American aviator and the first to fly solo nonstop across the Atlantic Ocean.&rdquo;
          </div>

          {/* Vitals grid */}
          <div
            className="grid gap-px bg-[oklch(0.240_0.018_245)] border border-[oklch(0.240_0.018_245)]"
            style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {[
              { k: "Born", v: "Feb 4, 1902" },
              { k: "Died", v: "Aug 26, 1974" },
              { k: "Age", v: "72 yrs" },
              { k: "Nation", v: "United States" },
              { k: "Occupation", v: "Aviator · Officer" },
              { k: "Award", v: "Medal of Honor" },
            ].map(({ k, v }) => (
              <div key={k} className="bg-alm-bg px-[18px] py-3.5">
                <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-alm-ink-faint">
                  {k}
                </div>
                <div className="font-mono text-sm text-alm-ink mt-1">{v}</div>
              </div>
            ))}
          </div>

          {/* Prose */}
          <div className="flex flex-col gap-3.5">
            <p className="text-[15px] leading-[1.7] text-alm-ink-dim m-0 max-w-[62ch]">
              Charles Augustus Lindbergh (1902&nbsp;–&nbsp;1974) was a U.S. Air Mail pilot from
              Detroit who, at twenty-five, captured the Orteig Prize by flying the single-engine
              monoplane <em>Spirit of St. Louis</em> from Roosevelt Field, New York to Le Bourget
              Field outside Paris on May 20–21, 1927.
            </p>
            <p className="text-[15px] leading-[1.7] text-alm-ink-dim m-0 max-w-[62ch]">
              The thirty-three-and-a-half-hour solo crossing made him an instant global celebrity
              and accelerated the commercial development of transatlantic aviation. Lindbergh&apos;s
              later career spanned military service, aviation consulting, conservationism, and
              authorship — including the Pulitzer Prize–winning autobiography{" "}
              <em>The Spirit of St. Louis</em>.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2.5">
            <button className="font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-2.5 border rounded-md cursor-pointer inline-flex items-center gap-2 bg-alm-accent border-alm-accent text-[oklch(0.13_0.015_245)] font-semibold">
              <AlmIcon name="bookmark-fill" size={12} /> Save to Almanac
            </button>
            <button className="font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-2.5 bg-transparent border border-[oklch(0.295_0.020_245)] text-alm-ink-dim rounded-md cursor-pointer inline-flex items-center gap-2">
              <AlmIcon name="external" size={12} /> Read on Wikipedia
            </button>
            <button className="font-mono text-[11px] tracking-[0.14em] uppercase px-3.5 py-2.5 bg-transparent border border-[oklch(0.295_0.020_245)] text-alm-ink-dim rounded-md cursor-pointer inline-flex items-center gap-2">
              Related events · 4
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
