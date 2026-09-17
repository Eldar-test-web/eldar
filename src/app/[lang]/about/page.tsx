import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { DocPlaceholder } from "@/components/DocPlaceholder";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Haqqında" : "About",
    description: lang === "az" ? "Eldar Həmidov — tərcümeyi-hal, təhsil, təcrübə istiqamətləri." : "Eldar Həmidov — biography, education, practice areas.",
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
        <PageHeader eyebrow={a.eyebrow} title={a.title} lede={a.lede} meta={["2020 — 2026", raw === "az" ? "Yalnız sənədli məlumat" : "Documented material only"]} />
      </div>

      <section className="wrap block" aria-label="Timeline" style={{ paddingTop: 8 }}>
        <ol className="timeline">
          {a.stages.map((s, i) => (
            <Reveal as="li" key={s.k} delay={Math.min(i * 60, 240)}>
                <span className="yr">{String(i + 1).padStart(2, "0")} — {s.k}</span>
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
        <SectionHeading index={a.eduEyebrow} title={a.eduTitle} text={a.eduText} />
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
        <SectionHeading index={raw === "az" ? "Təcrübə" : "Practice"} title={a.practiceTitle} text={a.practiceText} />
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
                id="DOC — EDU/01"
                label={raw === "az" ? "Təhsil sənədləri sorğu ilə paylaşılır" : "Education documents shared on request"}
                caption={raw === "az" ? "Şəxsi məlumat dərc olunmur" : "No private personal data is published"}
              />
            </div>
          </Reveal>
        </div>
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
