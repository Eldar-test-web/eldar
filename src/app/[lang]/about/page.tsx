import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { DocPlaceholder } from "@/components/DocPlaceholder";
import { IconArrowUpRight } from "@/components/icons";
import { MEDIA } from "@/data/media";
import { assetUrl } from "@/lib/asset";
import type { Lang } from "@/lib/i18n";

function Figure({ k, lang }: { k: keyof typeof MEDIA; lang: Lang }) {
  const m = MEDIA[k];
  const alt = lang === "az" ? m.altAz : m.altEn;
  const caption = lang === "az" ? m.captionAz : m.captionEn;
  return (
    <figure className="media-frame" style={{ margin: 0 }}>
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
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Haqq\u0131nda" : "About",
    description: lang === "az" ? "Eldar H\u0259midov: t\u0259rc\u00fcmeyi-hal, t\u0259hsil, t\u0259cr\u00fcb\u0259 istiqam\u0259tl\u0259ri." : "Eldar Hamidov: biography, education, practice areas.",
  };
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);
  const a = d.about;

  return (
    <>
      <div className="wrap">
        <PageHeader eyebrow={a.eyebrow} title={a.title} lede={a.lede} meta={["2020-2026", raw === "az" ? "Yaln\u0131z s\u0259n\u0259dli m\u0259lumat" : "Documented material only"]} />
      </div>

      <section className="wrap block" aria-label="Profile" style={{ paddingTop: 8 }}>
        <div className="shot">
          <Reveal>
            <Figure k="portrait" lang={raw} />
          </Reveal>
          <Reveal delay={80}>
            <div>
              <ul className="doc-meta">
                <li>{d.home.locationLabel}: {d.home.location}</li>
                <li>{d.home.focusLabel}: {d.home.focus}</li>
                <li>{d.home.educationLabel}: {d.home.education}</li>
                <li>{d.home.statusLabel}: {d.home.status}</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap block" aria-label="Timeline" style={{ paddingTop: 8 }}>
        <ol className="timeline">
          {a.stages.map((s, i) => (
            <Reveal as="li" key={s.k} delay={Math.min(i * 60, 240)}>
              <span className="yr">{s.k}</span>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      <hr className="rule" />

      <section className="wrap block" aria-labelledby="edu-t">
        <div className="block-head">
          <h2 className="h2" id="edu-t">{a.eduTitle}</h2>
          <p className="block-side">{a.eduText}</p>
        </div>
        <div className="edu-grid">
          {a.schools.map((s, i) => (
            <Reveal key={s.name} delay={i * 80}>
              <article className="edu-card">
                <span className="years">{s.years}</span>
                <h3>{s.name}</h3>
                <p>{s.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="distinction">{a.distinction}</p>
        </Reveal>
      </section>

      <section className="wrap block" aria-labelledby="practice-t" style={{ paddingTop: 0 }}>
        <div className="block-head">
          <h2 className="h2" id="practice-t">{a.practiceTitle}</h2>
          <p className="block-side">{a.practiceText}</p>
        </div>
        <div className="two-col">
          <Reveal>
            <div className="prose">
              {a.practiceItems.slice(0, 2).map((p) => (
                <div key={p.t} style={{ marginBottom: 22 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "0 0 8px" }}>{p.t}</h3>
                  <p style={{ margin: 0 }}>{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="prose">
              {a.practiceItems.slice(2).map((p) => (
                <div key={p.t} style={{ marginBottom: 22 }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "0 0 8px" }}>{p.t}</h3>
                  <p style={{ margin: 0 }}>{p.d}</p>
                </div>
              ))}
              <DocPlaceholder
                id="DOC-EDU-01"
                label={raw === "az" ? "T\u0259hsil s\u0259n\u0259dl\u0259ri sor\u011fu il\u0259 payla\u015f\u0131l\u0131r" : "Education documents shared on request"}
                caption={raw === "az" ? "\u015e\u0259xsi m\u0259lumat d\u0259rc olunmur" : "No private personal data is published"}
              />
            </div>
          </Reveal>
        </div>
        <div className="work-strip">
          <Reveal delay={0.05}>
            <Figure k="cadWork" lang={raw} />
          </Reveal>
          <Reveal delay={0.1}>
            <Figure k="soldering" lang={raw} />
          </Reveal>
          <Reveal delay={0.15}>
            <Figure k="motorAssembly" lang={raw} />
          </Reveal>
        </div>
      </section>

      <section className="wrap block" aria-labelledby="research-t" style={{ paddingTop: 0 }} id="research">
        <div className="doc-card">
          <Reveal>
            <div>
              <h2 className="h2" id="research-t" style={{ fontSize: "clamp(24px,3vw,34px)" }}>{a.researchTitle}</h2>
              <p style={{ color: "var(--ink-2)", marginTop: 12 }}>{a.researchLede}</p>
              <h3 style={{ fontSize: "clamp(20px,2.4vw,28px)", lineHeight: 1.35, margin: "18px 0 0" }}>{a.researchName}</h3>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              <ul className="doc-meta">
                {a.researchMeta.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
              <p style={{ color: "var(--ink-2)", fontSize: 15 }}>{a.researchSummary}</p>
              <p className="notice" style={{ marginTop: 16 }}>{a.researchDoc}</p>
              <p style={{ marginTop: 16 }}>
                <a className="btn" href={a.researchDoi} target="_blank" rel="noopener noreferrer">
                  {a.researchDoiLabel} <IconArrowUpRight size={16} />
                </a>
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <figure className="media-frame" style={{ margin: "22px auto 0", maxWidth: 720 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetUrl("/certificates/jgeor-2026.jpg")}
              alt={raw === "az" ? "Tədqiqat Nəşri Sertifikatı" : "Certificate of Research Publication"}
              loading="lazy"
            />
            <figcaption className="caption">
              <span>{a.researchCertCaption}</span>
            </figcaption>
          </figure>
        </Reveal>
      </section>

      

      <section className="wrap block" aria-labelledby="vol-t" style={{ paddingTop: 0 }}>
        <div className="cert-box">
          <Reveal>
            <h2 className="h2" id="vol-t" style={{ fontSize: "clamp(24px,3vw,34px)" }}>{a.volunteeringTitle}</h2>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ color: "var(--ink-2)", maxWidth: "70ch" }}>{a.volunteeringText}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
