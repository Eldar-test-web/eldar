"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { Dict } from "@/lib/dict";

/* Sticky systems diagram with scrolling steps. Position sticky does the
   pinning (no scroll listeners); IntersectionObserver only tracks which
   step is centred so the diagram can reflect it. */
export function ArchSteps({ t }: { t: Dict["projectsPage"] }) {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = listRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.step);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <section className="wrap block" style={{ paddingTop: 0 }} aria-label={t.archTitle}>
      <div className="block-head">
        <h2 className="h2">{t.archTitle}</h2>
        <p className="block-side">{t.archText}</p>
      </div>
      <div className="arch-grid">
        <div className="arch-diagram" aria-hidden="true">
          {t.archSteps.map((s, i) => (
            <Fragment key={s.t}>
              <div className={`arch-node${i === active ? " is-active" : ""}`}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.t}</strong>
              </div>
              {i < t.archSteps.length - 1 ? <i className="arch-link" /> : null}
            </Fragment>
          ))}
        </div>
        <div className="arch-steps" ref={listRef}>
          {t.archSteps.map((s, i) => (
            <article
              key={s.t}
              data-step={i}
              className={`arch-card${i === active ? " is-active" : ""}`}
            >
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="notice" style={{ marginTop: 22 }}>
        {t.archNote}
      </p>
    </section>
  );
}
