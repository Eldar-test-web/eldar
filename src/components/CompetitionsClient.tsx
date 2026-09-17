"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { achievements, isInstagramPlaceholder, type Achievement } from "@/lib/content";
import { assetUrl } from "@/lib/asset";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { IconArrowUpRight, IconDoc } from "@/components/icons";

function groupByYear(list: Achievement[], oldestFirst: boolean) {
  const map = new Map<number, Achievement[]>();
  for (const a of list) {
    const arr = map.get(a.yearNum) ?? [];
    arr.push(a);
    map.set(a.yearNum, arr);
  }
  const entries = [...map.entries()];
  entries.sort((x, y) => (oldestFirst ? x[0] - y[0] : y[0] - x[0]));
  return entries;
}

function CertThumb({ a, lang }: { a: Achievement; lang: Lang }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="cert-mini-fallback" aria-hidden="true">
        <IconDoc size={22} />
        <strong>{a.year}</strong>
        <small>
          {lang === "az" ? "Sertifikat gözləyir" : "Certificate pending"}
          <br />
          {a.certificateImage}
        </small>
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={assetUrl(a.certificateImage)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function AchievementCard({
  a,
  lang,
  dict,
  expanded,
  onToggle,
}: {
  a: Achievement;
  lang: Lang;
  dict: Dict;
  expanded: boolean;
  onToggle: () => void;
}) {
  const t = dict.competitionsPage;
  const hasLink = !isInstagramPlaceholder(a.instagramPostUrl);
  const Title = (
    <>
      <p className="ach-top">
        <span className="ach-year">{a.year}</span>
        <span className="ach-cat">{a.categoryLabel[lang]}</span>
      </p>
      <h3>{a.title[lang]}</h3>
      <p className="event">
        {a.event[lang]}
      </p>
      {a.note ? <p className="note">{a.note[lang]}</p> : null}
    </>
  );

  return (
    <article className="ach-card" aria-label={`${a.title[lang]} — ${a.result[lang]}`}>
      {/* Hover floating certificate preview — desktop only, never full-screen */}
      <div className="ach-hover" aria-hidden="true">
        <div className="ach-hover-win">
          <p className="ach-hover-cap">
            {t.previewLabel} · {a.year}
          </p>
          <div className="ach-hover-img">
            <CertThumb a={a} lang={lang} />
          </div>
          <p className="ach-hover-sub">{a.result[lang]}</p>
        </div>
      </div>

      <div className="ach-main">
        {hasLink ? (
          <a
            className="ach-link"
            href={a.instagramPostUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${a.title[lang]} — ${t.openPost}`}
          >
            {Title}
          </a>
        ) : (
          <div className="ach-link is-pending">{Title}</div>
        )}
        <div className="ach-foot">
          <div className="ach-result">
            <strong>{a.result[lang]}</strong>
            <span>{t.resultLabel}</span>
          </div>
          <div className="ach-actions">
            <button
              type="button"
              className="ach-cert-btn"
              aria-expanded={expanded}
              aria-label={expanded ? t.hideCert : `${t.showCert} — ${a.title[lang]}`}
              onClick={onToggle}
            >
              <IconDoc size={15} />
              <span>{t.previewLabel}</span>
            </button>
            {hasLink ? (
              <a
                className="ach-ig"
                href={a.instagramPostUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.openPost} <IconArrowUpRight size={13} />
              </a>
            ) : (
              <span className="ach-pending" title={t.linkPending}>
                IG · …
              </span>
            )}
          </div>
        </div>
        {expanded ? (
          <div className="ach-expanded">
            <div className="ach-expanded-img">
              <CertThumb a={a} lang={lang} />
            </div>
            <p className="ach-expanded-cap">
              {t.certPending} <span className="mono">{a.certificateImage}</span>
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function CompetitionsClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const [filter, setFilter] = useState<string>("ALL");
  const [year, setYear] = useState<string>("ALL");
  const [oldestFirst, setOldestFirst] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const t = dict.competitionsPage;

  const years = useMemo(
    () => [...new Set(achievements.map((a) => a.yearNum))].sort((x, y) => y - x),
    []
  );

  const filtered = useMemo(() => {
    let list =
      filter === "ALL" ? [...achievements] : achievements.filter((a) => a.filter === filter);
    if (year !== "ALL") list = list.filter((a) => String(a.yearNum) === year);
    list.sort((a, b) => (oldestFirst ? a.yearNum - b.yearNum : b.yearNum - a.yearNum));
    return list;
  }, [filter, year, oldestFirst]);

  const groups = useMemo(() => groupByYear(filtered, oldestFirst), [filtered, oldestFirst]);

  return (
    <>
      <div className="wrap">
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.title}
          lede={t.lede}
          meta={[`2020 — 2026`, `${achievements.length} ${t.countSuffix}`]}
        />
        <p className="notice" style={{ marginTop: 18 }}>
          {t.hoverHint}
          <br />
          <span style={{ color: "var(--ink-3)" }}>{t.tapHint}</span>
        </p>
      </div>

      <section className="wrap" aria-label="Filters" style={{ paddingBottom: 8 }}>
        <div className="filters" role="group" aria-label="Filter">
          {t.filters.map((f) => (
            <button
              key={f.key}
              type="button"
              className={`filter-btn${filter === f.key ? " is-active" : ""}`}
              aria-pressed={filter === f.key}
              onClick={() => {
                setFilter(f.key);
                setExpandedId(null);
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="filter-row">
          <label className="filter-select">
            <span>{t.yearLabel}</span>
            <select value={year} onChange={(e) => setYear(e.target.value)} aria-label={t.yearLabel}>
              <option value="ALL">{t.yearAll}</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <div className="filter-sort" role="group" aria-label={t.sortLabel}>
            <span aria-hidden="true">{t.sortLabel} ·</span>
            <button
              type="button"
              className={!oldestFirst ? "is-active" : ""}
              aria-pressed={!oldestFirst}
              onClick={() => setOldestFirst(false)}
            >
              {t.sortNewest}
            </button>
            <button
              type="button"
              className={oldestFirst ? "is-active" : ""}
              aria-pressed={oldestFirst}
              onClick={() => setOldestFirst(true)}
            >
              {t.sortOldest}
            </button>
          </div>
        </div>
        <p className="count-line" aria-live="polite">
          {filtered.length} {t.countSuffix} — {filter}
          {year !== "ALL" ? ` · ${year}` : ""}
        </p>
      </section>

      <section className="wrap block" style={{ paddingTop: 12 }} aria-label="Archive">
        {groups.length === 0 ? (
          <p className="notice">—</p>
        ) : (
          groups.map(([yearNum, items]) => (
            <div className="year-group" key={yearNum}>
              <div className="year-head">
                <h2>
                  {items[0]?.year === "—"
                    ? lang === "az"
                      ? "İli göstərilməyənlər"
                      : "Undated"
                    : String(yearNum)}
                </h2>
                <span>
                  {t.yearLabel} — {yearNum}
                </span>
                <span>
                  {items.length} {t.countSuffix}
                </span>
              </div>
              <div className="ach-grid">
                {items.map((a, i) => (
                  <Reveal key={a.id} delay={Math.min(i * 40, 160)}>
                    <AchievementCard
                      a={a}
                      lang={lang}
                      dict={dict}
                      expanded={expandedId === a.id}
                      onToggle={() => setExpandedId((v) => (v === a.id ? null : a.id))}
                    />
                  </Reveal>
                ))}
              </div>
            </div>
          ))
        )}
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
