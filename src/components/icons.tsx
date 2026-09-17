type P = { size?: number; className?: string };

function base(size = 18) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function IconSun({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
export function IconMoon({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}
export function IconArrow({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}
export function IconArrowUpRight({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
export function IconMenu({ size = 20, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 7h18M3 12h18M3 17h12" />
    </svg>
  );
}
export function IconClose({ size = 20, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}
export function IconMail({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
export function IconDoc({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v4h4M9 12h6M9 16h6" />
    </svg>
  );
}
export function IconGlobe({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
    </svg>
  );
}
export function IconWhatsApp({ size = 18, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3a9 9 0 0 0-7.7 13.7L3 21l4.4-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9 8.6c.2-.5.6-.6 1-.4l1.2 1.2c.3.3.3.7 0 1l-.6.6c.5 1.2 1.4 2.1 2.6 2.6l.6-.6c.3-.3.7-.3 1 0l1.2 1.2c.2.4.1.8-.4 1l-.9.9c-.5.5-1.1.6-1.8.4-2.9-.9-5.2-3.2-6.1-6.1-.2-.7 0-1.3.4-1.8l.8-1Z" />
    </svg>
  );
}
