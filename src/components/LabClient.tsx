"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { LAB_MODELS } from "@/data/models";
import { assetUrl } from "@/lib/asset";
import { PageHeader } from "@/components/PageHeader";
import { FadeIn } from "@/components/motion";
import {
  IconClose,
  IconCube,
  IconDownload,
  IconExpand,
  IconLeft,
  IconRight,
} from "@/components/icons";

const ModelViewer = dynamic(
  () => import("@/components/ModelViewer").then((m) => m.ModelViewer),
  { ssr: false, loading: () => <p className="mono">LOADING MODEL...</p> }
);

export function LabClient({
  lang,
  dict,
  initial,
}: {
  lang: Lang;
  dict: Dict;
  initial?: string;
}) {
  const t = dict.labPage;
  const az = lang === "az";
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(() => {
    const i = LAB_MODELS.findIndex((m) => m.id === initial);
    return i >= 0 ? i : 0;
  });
  const [openId, setOpenId] = useState<string | null>(null);
  const openModel = LAB_MODELS.find((m) => m.id === openId) ?? null;

  // Track the visible slide with IntersectionObserver (no scroll listeners).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll<HTMLElement>("[data-slide]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.slide);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { root: track, threshold: 0.6 }
    );
    slides.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Jump to the deep-linked model once.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || !initial) return;
    const i = LAB_MODELS.findIndex((m) => m.id === initial);
    if (i < 0) return;
    const el = track.querySelector<HTMLElement>(`[data-slide="${i}"]`);
    el?.scrollIntoView({ behavior: "auto", inline: "start", block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = (i + LAB_MODELS.length) % LAB_MODELS.length;
      const el = track.querySelector<HTMLElement>(`[data-slide="${clamped}"]`);
      el?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        inline: "start",
        block: "nearest",
      });
    },
    [reduce]
  );

  // Lightbox: lock body scroll, close on Escape.
  useEffect(() => {
    if (!openModel) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openModel]);

  return (
    <>
      <div className="wrap">
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.title}
          lede={t.lede}
          meta={[
            `${LAB_MODELS.length} ${az ? "real CAD yığımı" : "real CAD assemblies"}`,
            `${LAB_MODELS.reduce((n, m) => n + m.parts.length, 0)} STL ${t.partsLabel}`,
          ]}
        />
      </div>

      <section className="wrap block" style={{ paddingTop: 8 }} aria-label="Model slider">
        <div className="slider-bar">
          <div className="slider-dots" role="tablist" aria-label="Models">
            {LAB_MODELS.map((m, i) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`slider-dot${i === active ? " is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`${m.index} — ${m.title}`}
              >
                <span>{m.index}</span>
              </button>
            ))}
          </div>
          <div className="slider-arrows">
            <button
              type="button"
              className="slider-arrow"
              onClick={() => goTo(active - 1)}
              aria-label={t.prevSlide}
            >
              <IconLeft size={18} />
            </button>
            <button
              type="button"
              className="slider-arrow"
              onClick={() => goTo(active + 1)}
              aria-label={t.nextSlide}
            >
              <IconRight size={18} />
            </button>
          </div>
        </div>

        <div className="lab-track" ref={trackRef}>
          {LAB_MODELS.map((m, i) => {
            const desc = az ? m.descriptionAz : m.description;
            return (
              <article key={m.id} data-slide={i} className="lab-slide" aria-label={m.title}>
                <FadeIn>
                  <button
                    type="button"
                    className="slide-preview"
                    onClick={() => setOpenId(m.id)}
                    aria-label={`${t.openModel}: ${m.title}`}
                  >
                    <ModelViewer
                      key={`preview-${m.id}`}
                      model={m}
                      hint={t.spinHint}
                      loadingLabel={t.loading}
                      resetLabel={t.resetView}
                      fullscreenLabel={t.fullscreen}
                      wireframeLabel={t.wireframe}
                      transparentLabel={t.transparent}
                      preview
                    />
                    <span className="slide-open">
                      <IconExpand size={16} /> {t.openModel}
                    </span>
                    <span className="slide-spin">{t.spinHint}</span>
                  </button>
                </FadeIn>
                <div className="slide-info">
                  <p className="kicker">
                    {m.index} — {m.subtitle}
                  </p>
                  <h2 className="h2">{m.title}</h2>
                  <p className="lede" style={{ marginTop: 12 }}>
                    {desc}
                  </p>
                  {m.disclaimer ? (
                    <p className="notice" style={{ marginTop: 14 }}>
                      {t.disclaimerLabel}: {m.disclaimer}
                    </p>
                  ) : null}
                  <div className="tech-chips" aria-label={t.specsTitle}>
                    {m.specs.map((s) => (
                      <span key={s.k}>
                        {s.k}: {s.v}
                      </span>
                    ))}
                    <span>
                      <IconCube size={14} /> {m.parts.length} STL {t.partsLabel}
                    </span>
                  </div>
                  <div className="slide-actions">
                    <button type="button" className="btn btn-solid" onClick={() => setOpenId(m.id)}>
                      <IconExpand size={18} /> {t.openModel}
                    </button>
                  </div>
                  <details className="dl-details">
                    <summary>
                      <IconDownload size={16} /> {t.downloadsTitle} ({m.parts.length})
                    </summary>
                    <div className="dl-grid">
                      {m.parts.map((p) => (
                        <a
                          key={p.path}
                          className="dl-chip"
                          href={assetUrl(p.path)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconDownload size={15} />
                          <span>{az ? p.labelAz : p.label}</span>
                          <small>{p.size}</small>
                        </a>
                      ))}
                    </div>
                  </details>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {openModel ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={openModel.title}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenId(null);
          }}
        >
          <div className="lightbox-box">
            <div className="lightbox-head">
              <div>
                <p className="kicker" style={{ marginBottom: 8 }}>
                  {openModel.index} — {openModel.subtitle}
                </p>
                <h2 className="h2">{openModel.title}</h2>
              </div>
              <button
                type="button"
                className="theme-btn"
                onClick={() => setOpenId(null)}
                aria-label={t.closeViewer}
                autoFocus
              >
                <IconClose size={18} />
              </button>
            </div>
            <ModelViewer
              key={`full-${openModel.id}`}
              model={openModel}
              hint={t.hint}
              loadingLabel={t.loading}
              resetLabel={t.resetView}
              fullscreenLabel={t.fullscreen}
              wireframeLabel={t.wireframe}
              transparentLabel={t.transparent}
              hideFullscreen
            />
            <h3 className="mono" style={{ margin: "22px 0 12px", fontSize: 12, letterSpacing: "0.16em" }}>
              {t.downloadsTitle.toUpperCase()}
            </h3>
            <div className="dl-grid">
              {openModel.parts.map((p) => (
                <a
                  key={p.path}
                  className="dl-chip"
                  href={assetUrl(p.path)}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconDownload size={15} />
                  <span>{az ? p.labelAz : p.label}</span>
                  <small>{p.size}</small>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
