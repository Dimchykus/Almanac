import type { AlmanacPerson } from "./types";

interface PeopleCardProps {
  born: AlmanacPerson[];
  died: AlmanacPerson[];
}

function PersonTile({ person, label }: { person: AlmanacPerson; label: string }) {
  const age = 2026 - parseInt(person.year);
  return (
    <div className="bg-alm-surface p-[18px] flex gap-3.5">
      {/* Avatar */}
      <div
        className="w-14 h-14 rounded-full flex-shrink-0 border border-[oklch(0.295_0.020_245)] overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, oklch(0.32 0.03 60), oklch(0.22 0.02 245))",
        }}
      >
        <div className="alm-hatch absolute inset-0 opacity-[0.05]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display text-[18px] leading-[1.15] text-alm-ink">
          {person.name}
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint my-1">
          {label} {person.year} · {age} yrs
        </div>
        <div className="text-xs text-alm-ink-dim leading-[1.5]">{person.role}</div>
      </div>
    </div>
  );
}

export function PeopleCard({ born, died }: PeopleCardProps) {
  const all = [
    ...born.map((p) => ({ person: p, label: "Born" })),
    ...died.map((p) => ({ person: p, label: "Died" })),
  ];

  return (
    <article className="bg-alm-surface border border-[oklch(0.240_0.018_245)] rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[oklch(0.240_0.018_245)]">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-alm-ink-mute flex items-center gap-2.5">
          <span className="text-alm-accent font-semibold">06</span> Births &amp; Deaths
        </div>
        <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-alm-ink-faint">
          Wikipedia · On This Day
        </div>
      </div>
      <div
        className="grid gap-px bg-[oklch(0.240_0.018_245)]"
        style={{ gridTemplateColumns: `repeat(${Math.min(all.length, 3)}, 1fr)` }}
      >
        {all.map(({ person, label }, i) => (
          <PersonTile key={i} person={person} label={label} />
        ))}
      </div>
    </article>
  );
}
