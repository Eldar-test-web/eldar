import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, langs } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { projects } from "@/lib/content";
import { LAB_MODELS } from "@/data/models";
import { MEDIA } from "@/data/media";
import { assetUrl } from "@/lib/asset";
import { Reveal } from "@/components/Reveal";
import { ArchSteps } from "@/components/ArchSteps";
import { IconArrowUpRight, IconCube, IconDownload } from "@/components/icons";

export function generateStaticParams() {
  const out: { lang: string; slug: string }[] = [];
  for (const lang of langs) for (const p of projects) out.push({ lang, slug: p.slug });
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const pr = projects.find((x) => x.slug === slug);
  if (!pr) return {};
  return {
    title: pr.title[lang],
    description: pr.subtitle[lang],
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (!isLang(raw)) notFound();
  const pr = projects.find((x) => x.slug === slug);
  if (!pr) notFound();
  const d = getDict(raw);
  const p = d.projectsPage;
  const labModel = LAB_MODELS.find((m) => m.id === slug);
  const steps = [
    { n: "01", h: p.overview, body: pr.body[raw] },
    { n: "02", h: p.context, body: pr.context[raw] },
    { n: "03", h: p.role, body: pr.role[raw] },
    ...(pr.sections?.map((s, i) => ({
      n: `0${4 + i}`,
      h: s.h[raw],
      body: s.p[raw],
    })) ?? []),
  ];
  const resultNo = `0${4 + (pr.sections?.length ?? 0)}`;

  return (
    <>
      <section className="wrap page-head" aria-labelledby="pr-t">        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {p.detailContext} - {pr.index}
          </p>
        </Reveal>
        <Reveal delay={70}>
          <h1 id="pr-t" className="h-display" style={{ fontSize: "clamp(38px,6vw,76px)" }}>
            {pr.title[raw]}
          </h1>
        </Reveal>
        <Reveal delay={130}>
          <p className="lede" style={{ marginTop: 18 }}>
            {pr.subtitle[raw]}
          </p>
        </Reveal>
        <Reveal delay={170}>
          <p className="detail-actions">
            <Link className="link-quiet" href={`/${raw}/projects`}>
              ← {p.back}
            </Link>
            {pr.externalUrl ? (
              <a
                className="btn btn-solid"
                href={pr.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {pr.externalLabel ?? p.externalLink} <IconArrowUpRight />
              </a>
            ) : null}
          </p>
        </Reveal>
      </section>

      {pr.media && pr.media.length > 0 ? (
        <section className="wrap" aria-label="Project media" style={{ paddingBottom: 8 }}>
          <div className="two-col">
            {pr.media.map((key) => {
              const m = MEDIA[key];
              if (!m) return null;
              const alt = raw === "az" ? m.altAz : m.altEn;
              const caption = raw === "az" ? m.captionAz : m.captionEn;
              return (
                <figure className="media-frame" style={{ margin: 0 }} key={key}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetUrl(m.src)}
                    alt={alt}
                    width={m.width || undefined}
                    height={m.height || undefined}
                    loading="lazy"
                  />
                  <figcaption className="caption">
                    <span>{caption}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
          {pr.video && MEDIA[pr.video] ? (
            <div className="video-frame">
              <video
                controls
                preload="metadata"
                playsInline
                src={assetUrl(MEDIA[pr.video].src)}
                aria-label={raw === "az" ? MEDIA[pr.video].altAz : MEDIA[pr.video].altEn}
              />
              <p className="caption" style={{ paddingBottom: 0 }}>
                <span>{raw === "az" ? MEDIA[pr.video].captionAz : MEDIA[pr.video].captionEn}</span>
              </p>
            </div>
          ) : null}
        </section>
      ) : null}

      {slug === "kora" ? <ArchSteps t={p} /> : null}

      <section className="wrap" aria-label="Case meta">
        <div className="case-meta">
          <div>
            <small>{p.overview}</small>
            <strong>{pr.body[raw]}</strong>
          </div>
          <div>
            <small>{p.context}</small>
            <strong>{pr.context[raw]}</strong>
          </div>
          <div>
            <small>{p.role}</small>
            <strong>{pr.role[raw]}</strong>
          </div>
          <div>
            <small>{p.result}</small>
            <strong>{pr.result[raw]}</strong>
          </div>
        </div>
      </section>

      <section className="wrap block" aria-label="Case body">
        <div className="case-body">
          <Reveal>
            <div>
              {steps.map((s) => (
                <div key={s.n} className="case-step">
                  <span className="mono" aria-hidden="true">
                    {s.n}
                  </span>
                  <div>
                    <h3>{s.h}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
              <div className="case-step">
                <span className="mono" aria-hidden="true">
                  {resultNo}
                </span>
                <div>
                  <h3>{p.result}</h3>
                  <p>{pr.result[raw]}</p>
                </div>
              </div>
              <h3>{p.tech}</h3>
              <div className="tech-chips" aria-label="Technologies">
                {pr.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <aside className="case-files" aria-label={p.filesTitle}>
              <h3>{p.filesTitle}</h3>
              {labModel ? (
                <Link className="btn btn-solid" href={`/${raw}/lab/${labModel.id}`}>
                  <IconCube size={18} /> {p.openInLab}
                </Link>
              ) : null}
              {labModel ? (
                <div className="dl-grid" style={{ marginTop: 14 }}>
                  {labModel.parts.map((f) => (
                    <a
                      key={f.path}
                      className="dl-chip"
                      href={assetUrl(f.path)}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconDownload size={15} />
                      <span>{raw === "az" ? f.labelAz : f.label}</span>
                      <small>{f.size}</small>
                    </a>
                  ))}
                </div>
              ) : null}
              {pr.externalUrl ? (
                <p style={{ marginTop: 18 }}>
                  <a
                    className="link-quiet"
                    href={pr.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {pr.externalLabel ?? p.externalLink} <IconArrowUpRight size={14} />
                  </a>
                </p>
              ) : (
                <p className="notice">{p.docsPending}</p>
              )}
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
