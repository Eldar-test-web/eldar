"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { LAB_MODELS } from "@/data/models";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

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
  const [id, setId] = useState(
    LAB_MODELS.some((m) => m.id === initial) ? (initial as string) : LAB_MODELS[0].id
  );
  const model = LAB_MODELS.find((m) => m.id === id) ?? LAB_MODELS[0];
  const desc = lang === "az" ? model.descriptionAz : model.description;

  return (
    <>
      <div className="wrap">
        <PageHeader
          eyebrow={t.eyebrow}
          title={t.title}
          lede={t.lede}
          meta={[`${LAB_MODELS.length} studies`, "/public/models/*.glb"]}
        />
      </div>

      <section className="wrap block" style={{ paddingTop: 8 }} aria-label="Model index">
        <div className="lab-select" role="tablist" aria-label="Models">
          {LAB_MODELS.map((m) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={m.id === id}
              className={`lab-card${m.id === id ? " is-active" : ""}`}
              onClick={() => setId(m.id)}
            >
              <span className="lab-idx">{m.index}</span>
              <span className="lab-name">{m.title}</span>
              <span className="lab-sub">{m.subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="wrap block" style={{ paddingTop: 0 }} aria-label="Model viewer">
        <Reveal>
          <div className="lab-head">
            <p className="eyebrow" style={{ marginBottom: 12 }}>
              <span className="eyebrow-rule" aria-hidden="true" />
              {model.index} — {model.subtitle}
            </p>
            <h2 className="h2">{model.title}</h2>
            <p className="lede" style={{ marginTop: 14 }}>
              {desc}
            </p>
            {model.disclaimer ? (
              <p className="notice" style={{ marginTop: 14 }}>
                {t.disclaimerLabel}: {model.disclaimer}
              </p>
            ) : null}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <ModelViewer
            key={model.id}
            model={model}
            hint={t.hint}
            loadingLabel={t.loading}
            resetLabel={t.resetView}
            fullscreenLabel={t.fullscreen}
            wireframeLabel={t.wireframe}
            transparentLabel={t.transparent}
          />
        </Reveal>
        <div className="lab-specs">
          <h3>{t.specsTitle}</h3>
          <dl>
            {model.specs.map((s) => (
              <div key={s.k}>
                <dt>{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
            <div>
              <dt>GLB</dt>
              <dd className="mono">{model.modelPath}</dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
