export type VisualVariant = "ai" | "backend" | "rpa" | "ops" | "product" | "scraper";

/**
 * Generated, on-brand abstract artwork for each project card. Every variant
 * is built from the same ink / paper / cream / accent-warm palette so it
 * reads as part of the site rather than a bolted-on stock photo.
 */
export function ProjectVisual({
  variant,
  className = "",
}: {
  variant: VisualVariant;
  className?: string;
}) {
  const uid = `v-${variant}`;

  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={`${uid}-bg`} cx="30%" cy="20%" r="90%">
          <stop offset="0%" stopColor="var(--cream)" />
          <stop offset="100%" stopColor="var(--paper)" />
        </radialGradient>
        <linearGradient id={`${uid}-accent`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-warm)" />
          <stop offset="100%" stopColor="var(--ink)" />
        </linearGradient>
      </defs>

      <rect width="600" height="400" fill={`url(#${uid}-bg)`} />

      {/* dotted grid, shared texture across all variants */}
      <g opacity="0.35">
        {Array.from({ length: 15 }).map((_, col) =>
          Array.from({ length: 10 }).map((_, row) => (
            <circle
              key={`${col}-${row}`}
              cx={20 + col * 40}
              cy={20 + row * 40}
              r={1.4}
              fill="var(--ink)"
            />
          )),
        )}
      </g>

      {variant === "ai" && (
        <g>
          <circle cx="300" cy="200" r="46" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity="0.5" />
          {[
            [140, 90],
            [460, 110],
            [120, 300],
            [470, 290],
            [300, 60],
            [300, 340],
          ].map(([x, y], i) => (
            <g key={i}>
              <line x1="300" y1="200" x2={x} y2={y} stroke="var(--ink)" strokeWidth="1" opacity="0.28" />
              <circle cx={x} cy={y} r={i % 2 === 0 ? 8 : 5} fill={`url(#${uid}-accent)`} />
            </g>
          ))}
          <circle cx="300" cy="200" r="16" fill="var(--ink)" />
          <circle cx="300" cy="200" r="16" fill="var(--accent-warm)" opacity="0.55" />
        </g>
      )}

      {variant === "backend" && (
        <g>
          <rect x="150" y="90" width="300" height="220" rx="14" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="150" y="90" width="300" height="34" rx="14" fill="var(--ink)" />
          <circle cx="172" cy="107" r="4" fill="var(--accent-warm)" />
          <circle cx="188" cy="107" r="4" fill="var(--paper)" opacity="0.6" />
          <circle cx="204" cy="107" r="4" fill="var(--paper)" opacity="0.6" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect
              key={i}
              x="172"
              y={150 + i * 28}
              width={i % 2 === 0 ? 220 : 150}
              height="10"
              rx="5"
              fill="var(--ink)"
              opacity={i === 2 ? 1 : 0.25}
            />
          ))}
          <rect x="172" y={150 + 2 * 28} width="220" height="10" rx="5" fill="var(--accent-warm)" opacity="0.85" />
        </g>
      )}

      {variant === "rpa" && (
        <g>
          <rect x="230" y="120" width="140" height="110" rx="18" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="270" cy="160" r="10" fill="var(--ink)" />
          <circle cx="330" cy="160" r="10" fill="var(--ink)" />
          <rect x="265" y="190" width="70" height="8" rx="4" fill="var(--accent-warm)" />
          <line x1="300" y1="120" x2="300" y2="95" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="300" cy="90" r="6" fill="var(--accent-warm)" />
          <rect x="205" y="230" width="190" height="14" rx="7" fill="var(--ink)" opacity="0.15" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx={140 + i * 65} cy="330" r="6" fill="var(--ink)" opacity="0.5" />
          ))}
          <path
            d="M140 330 L465 330"
            stroke="var(--ink)"
            strokeWidth="1.5"
            strokeDasharray="2 10"
            opacity="0.5"
          />
        </g>
      )}

      {variant === "ops" && (
        <g>
          <rect x="120" y="110" width="200" height="150" rx="8" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
          <path d="M120 118 L220 195 L320 118" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="340" y="150" width="140" height="180" rx="8" fill="var(--ink)" opacity="0.06" />
          <rect x="340" y="150" width="140" height="180" rx="8" fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="358" y={175 + i * 30} width="104" height="8" rx="4" fill="var(--ink)" opacity={i === 1 ? 0.9 : 0.25} />
          ))}
          <rect x="358" y={175 + 30} width="104" height="8" rx="4" fill="var(--accent-warm)" opacity="0.85" />
          <circle cx="205" cy="290" r="26" fill="var(--accent-warm)" opacity="0.85" />
          <path d="M195 290 l7 8 l16 -18" fill="none" stroke="var(--paper)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {variant === "product" && (
        <g>
          <rect x="130" y="100" width="340" height="200" rx="12" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.5" />
          <rect x="130" y="100" width="90" height="200" rx="12" fill="var(--ink)" opacity="0.9" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="150" y={130 + i * 34} width="50" height="8" rx="4" fill="var(--paper)" opacity={i === 1 ? 1 : 0.35} />
          ))}
          {[0, 1].map((r) =>
            [0, 1].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={245 + c * 110}
                y={130 + r * 80}
                width="95"
                height="60"
                rx="8"
                fill={r === 0 && c === 0 ? `url(#${uid}-accent)` : "var(--ink)"}
                opacity={r === 0 && c === 0 ? 0.9 : 0.1}
              />
            )),
          )}
        </g>
      )}

      {variant === "scraper" && (
        <g>
          <circle cx="220" cy="200" r="70" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity="0.4" />
          <circle cx="220" cy="200" r="30" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity="0.6" />
          <line x1="268" y1="248" x2="330" y2="310" stroke="var(--ink)" strokeWidth="10" strokeLinecap="round" />
          {[
            [400, 120],
            [440, 170],
            [400, 220],
            [440, 270],
          ].map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="80" height="14" rx="7" fill="var(--ink)" opacity={i === 1 ? 0.9 : 0.2} />
          ))}
          <rect x="400" y="170" width="80" height="14" rx="7" fill="var(--accent-warm)" opacity="0.85" />
        </g>
      )}
    </svg>
  );
}
