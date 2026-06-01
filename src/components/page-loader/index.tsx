export function PageLoader() {
  return (
    <div className="min-h-screen w-full bg-alm-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-alm-accent animate-spin"
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-alm-ink-faint">
          Loading
        </span>
      </div>
    </div>
  );
}
