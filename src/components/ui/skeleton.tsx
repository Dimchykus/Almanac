export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-[oklch(0.240_0.018_245)] ${className ?? ""}`}
    />
  );
}

export function CardError({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="px-5 py-10 flex flex-col items-center gap-3">
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
        Failed to load
      </span>
      <button
        onClick={onRetry}
        className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-accent hover:underline cursor-pointer"
      >
        Retry
      </button>
    </div>
  );
}
