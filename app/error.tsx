"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-faint">
        Something went wrong
      </span>
      <button
        onClick={reset}
        className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-accent hover:underline cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
}
