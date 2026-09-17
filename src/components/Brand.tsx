export function Monogram({ size = 40 }: { size?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        flex: "none",
      }}
    >
      <svg viewBox="0 0 48 48" width={size} height={size} role="img" aria-label="EH monogram">
        <rect x="1" y="1" width="46" height="46" fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* E */}
        <path d="M14 12v24M14 12h11M14 24h9M14 36h11" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        {/* H */}
        <path d="M29 12v24M38 12v24M29 24h9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
        {/* precision baseline */}
        <rect x="14" y="39.5" width="24" height="1.5" fill="var(--accent)" />
        {/* registration ticks */}
        <circle cx="29" cy="12" r="1.2" fill="var(--accent)" />
        <circle cx="38" cy="36" r="1.2" fill="var(--accent)" />
      </svg>
    </span>
  );
}

export function Wordmark({ sub }: { sub: string }) {
  return (
    <span className="wordmark">
      <Monogram size={34} />
      <span className="wordmark-text">
        <strong>ELDAR HƏMİDOV</strong>
        <small>{sub}</small>
      </span>
    </span>
  );
}
