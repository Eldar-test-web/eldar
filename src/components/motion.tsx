"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/* Entry + scroll reveal. Transform + opacity only, honors reduced motion. */
export function FadeIn({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Magnetic hover for primary CTAs. Pointer physics outside React state. */
export function Magnetic({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16 });
  const sy = useSpring(y, { stiffness: 180, damping: 16 });

  if (reduce) return <span style={{ display: "inline-flex" }}>{children}</span>;

  function onMove(e: MouseEvent<HTMLSpanElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.22);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }
  return (
    <motion.span
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy, display: "inline-flex" }}
    >
      {children}
    </motion.span>
  );
}

/* Single marquee per page. Pauses under reduced motion. */
export function Marquee({ items }: { items: string[] }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-hidden={false}>
      <div className={`marquee-track${reduce ? " is-static" : ""}`}>
        {row.map((t, i) => (
          <span key={i} className="marquee-item">
            <i aria-hidden="true" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Subtle 3D tilt for photo cards. Transform only. */
export function Tilt({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);

  if (reduce) return <div className={className}>{children}</div>;

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 7);
    rx.set(py * -7);
  }
  function onLeave() {
    rx.set(0);
    ry.set(0);
  }
  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
    >
      {children}
    </motion.div>
  );
}
