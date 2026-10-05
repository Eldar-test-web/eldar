// Eldar icon system — drawn for this project, one visual language.
// 24px grid, 1.5px stroke, round caps and joins. No external icon library.
type P = { size?: number };

function Svg({
  size = 18,
  children,
  label,
}: P & { children: React.ReactNode; label: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

export function IconArrow({ size }: P) {
  return (
    <Svg size={size} label="Arrow">
      <path d="M4 12h15" />
      <path d="M13.5 6.5 19 12l-5.5 5.5" />
    </Svg>
  );
}

export function IconArrowUpRight({ size }: P) {
  return (
    <Svg size={size} label="Open">
      <path d="M7 17 17 7" />
      <path d="M8.5 7H17v8.5" />
    </Svg>
  );
}

export function IconLeft({ size }: P) {
  return (
    <Svg size={size} label="Previous">
      <path d="M20 12H5" />
      <path d="M10.5 6.5 5 12l5.5 5.5" />
    </Svg>
  );
}

export function IconRight({ size }: P) {
  return (
    <Svg size={size} label="Next">
      <path d="M4 12h15" />
      <path d="M13.5 6.5 19 12l-5.5 5.5" />
    </Svg>
  );
}

export function IconMenu({ size }: P) {
  return (
    <Svg size={size} label="Menu">
      <path d="M4 7.5h16" />
      <path d="M4 12h16" />
      <path d="M4 16.5h10" />
    </Svg>
  );
}

export function IconClose({ size }: P) {
  return (
    <Svg size={size} label="Close">
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Svg>
  );
}

export function IconSun({ size }: P) {
  return (
    <Svg size={size} label="Light mode">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3.5v2M12 18.5v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M3.5 12h2M18.5 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4" />
    </Svg>
  );
}

export function IconMoon({ size }: P) {
  return (
    <Svg size={size} label="Dark mode">
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </Svg>
  );
}

export function IconMail({ size }: P) {
  return (
    <Svg size={size} label="Email">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 8 7.5 5.5L19.5 8" />
    </Svg>
  );
}

export function IconDoc({ size }: P) {
  return (
    <Svg size={size} label="Document">
      <path d="M6.5 3.5h7l4 4v13h-11Z" />
      <path d="M13.5 3.5v4h4" />
      <path d="M9.5 12.5h5M9.5 16h5" />
    </Svg>
  );
}

export function IconGlobe({ size }: P) {
  return (
    <Svg size={size} label="Website">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" />
      <path d="M12 3.5c2.8 3.2 2.8 13.8 0 17M12 3.5c-2.8 3.2-2.8 13.8 0 17" />
    </Svg>
  );
}

export function IconWhatsApp({ size }: P) {
  return (
    <Svg size={size} label="WhatsApp">
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z" />
      <path d="M9.2 8.8c.3-.6 1-.7 1.4-.3l.9.9c.3.3.3.7 0 1l-.5.5c.5 1.1 1.3 1.9 2.4 2.4l.5-.5c.3-.3.7-.3 1 0l.9.9c.4.4.3 1.1-.3 1.4l-.7.7c-.5.5-1.1.6-1.8.4-2.7-.9-4.9-3-5.8-5.8-.2-.7 0-1.3.4-1.7l.6-.9Z" />
    </Svg>
  );
}

export function IconDownload({ size }: P) {
  return (
    <Svg size={size} label="Download">
      <path d="M12 4v11" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4.5 19.5h15" />
    </Svg>
  );
}

export function IconCube({ size }: P) {
  return (
    <Svg size={size} label="3D part">
      <path d="M12 3.5 20 8v8l-8 4.5L4 16V8Z" />
      <path d="M4 8l8 4.5L20 8" />
      <path d="M12 12.5V20" />
    </Svg>
  );
}

export function IconExpand({ size }: P) {
  return (
    <Svg size={size} label="Expand">
      <path d="M9 4.5H4.5V9" />
      <path d="M15 4.5h4.5V9" />
      <path d="M9 19.5H4.5V15" />
      <path d="M15 19.5h4.5V15" />
    </Svg>
  );
}

export function IconRotate({ size }: P) {
  return (
    <Svg size={size} label="Rotate">
      <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
      <path d="M19.5 3.5v4h-4" />
    </Svg>
  );
}

export function IconLayers({ size }: P) {
  return (
    <Svg size={size} label="Assembly layers">
      <path d="m12 4 8 3.5-8 3.5-8-3.5Z" />
      <path d="m4.5 12 7.5 3.2L19.5 12" />
      <path d="m4.5 15.5 7.5 3.2 7.5-3.2" />
    </Svg>
  );
}

export function IconSpark({ size }: P) {
  return (
    <Svg size={size} label="Ask Eldar">
      <path d="M12 3.5c.6 4.8 2.7 6.9 7.5 7.5-4.8.6-6.9 2.7-7.5 7.5-.6-4.8-2.7-6.9-7.5-7.5 4.8-.6 6.9-2.7 7.5-7.5Z" />
      <path d="M18.5 3.5c.2 1.6.9 2.3 2.5 2.5-1.6.2-2.3.9-2.5 2.5-.2-1.6-.9-2.3-2.5-2.5 1.6-.2 2.3-.9 2.5-2.5Z" />
    </Svg>
  );
}

export function IconSend({ size }: P) {
  return (
    <Svg size={size} label="Send">
      <path d="M20.5 3.5 10 14" />
      <path d="M20.5 3.5 14 20.5l-4-6.5-6.5-4Z" />
    </Svg>
  );
}
