"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { achievements, type Achievement } from "@/lib/content";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

function groupByYear(list: Achievement[]) {
  const map = new Map<number, Achievement[]>();
  for (const a of list) {
    const arr = map.get(a.yearNum) ?? [];
    arr.push(a);
    map.set(a.yearNum, arr);
  }
  return [...map.entries()].sort((x, y) => y[0] - x[0]);
}

export function CompetitionsClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [filter, setFilter] = useState<string>("ALL");
  const t = dict.competitionsPage;

  const filtered = useMemo(
    () => (filter === "ALL" ? achievements : achievements.filter((a) => a.filter === filter)),
    [filter]
  );
  const groups = useMemo(() => groupByYear(filtered), [filtered]);

  return (
    <>
      <div className="wrap">
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.title}
          lede={t.lede}
          meta={[`2020 — 2026`, `${achievements.length} ${t.countSuffix}`]}
        />
      </div>

      <section className="wrap" aria-label="Filters" style={{ paddingBottom: 8 }}>
        <div className="filters" role="group" aria-label="Filter">
          {t.filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn${filter === f.key ? " is-active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="count-line" aria-live="polite">
          {filtered.length} {t.countSuffix} — {filter}
        </p>
      </section>

      <section className="wrap block" style={{ paddingTop: 12 }} aria-label="Archive">
        {groups.map(([year, items]) => (
          <div className="year-group" key={year}>
            <div className="year-head">
              <h2>{year === 2025 && items.some((i) => i.year === "—") ? "2025 / —" : items[0]?.year ?? String(year)}</h2>
              <span>
                {t.yearLabel} — {year}
              </span>
              <span>
                {items.length} {t.countSuffix}
              </span>
            </div>
            <ul className="ach-list">
              {items.map((a) => (
                <li key={a.id}>
                  <div>
                    <h3>{a.title[lang]}</h3>
                    <p className="event">
                      {a.event[lang]} · {a.year}
                    </p>
                    <span className="cat">{a.categoryLabel[lang]}</span>
                    {a.note ? <p className="note">{a.note[lang]}</p> : null}
                  </div>
                  <div className="ach-result">
                    <strong>{a.result[lang]}</strong>
                    <span>{t.resultLabel}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="wrap block" style={{ paddingTop: 0 }} aria-label="Certificates">
        <div className="cert-box">
          <SectionHeading index="—" title={t.certificatesTitle} text={t.certificatesText} />
          <ul>
            {t.certificates.map((c) => (
              <Reveal key={c} as="li">
                {c}
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={80}>
          <p className="notice" style={{ marginTop: 22 }}>
            {t.methodTitle} — {t.methodText}
          </p>
        </Reveal>
      </section>
    </>
  );
}
