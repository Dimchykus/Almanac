import type { AlmanacFeatured } from "./types";

interface FeaturedCardProps {
  featured: AlmanacFeatured;
}

export function FeaturedCard({ featured }: FeaturedCardProps) {
  return (
    <article
      className="grid border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden bg-alm-surface"
      style={{ gridTemplateColumns: "1fr 1.4fr" }}
    >
      {/* Portrait panel */}
      <div
        className="relative min-h-[320px]"
        style={{
          background: "linear-gradient(135deg, oklch(0.30 0.03 60), oklch(0.18 0.02 245))",
        }}
      >
        {/* Silhouette */}
        <div
          className="absolute left-1/2 bottom-0 -translate-x-1/2 opacity-60"
          style={{
            width: "56%",
            aspectRatio: "1 / 1.6",
            background: "oklch(0.13 0.015 245)",
            borderRadius: "50% 50% 12% 12% / 60% 60% 12% 12%",
          }}
        />
        <div className="absolute bottom-3.5 left-4 font-mono text-[10px] tracking-[0.16em] text-[oklch(0.92_0.01_80/0.7)] uppercase">
          PLATE 014 · PORTRAIT REFERENCE
        </div>
      </div>

      {/* Text panel */}
      <div className="p-7 flex flex-col gap-3.5">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-accent">
          ○ Featured Entity · Wikipedia
        </div>
        <h3 className="font-display text-[40px] leading-none font-normal text-alm-ink tracking-[-0.01em] m-0">
          {featured.title}
        </h3>
        <div className="font-display italic text-[18px] leading-[1.4] text-alm-ink-dim">
          &ldquo;{featured.lede}&rdquo;
        </div>
        <p className="text-sm leading-[1.7] text-alm-ink-dim max-w-[60ch] alm-dropcap">
          {featured.body}
        </p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mt-auto pt-4 border-t border-[oklch(0.240_0.018_245)]">
          {featured.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-mute px-2 py-1 border border-[oklch(0.295_0.020_245)] rounded-[3px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
