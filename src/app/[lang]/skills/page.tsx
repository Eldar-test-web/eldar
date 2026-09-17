import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { PageHeader, SectionHeading } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Bacarıqlar" : "Skills",
    description: lang === "az" ? "Proqramlaşdırma və mühəndis proqramları — faizsiz, faktla." : "Programming and engineering software — no percentages, only evidence.",
  };
}

export default async function SkillsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);
  const s = d.skillsPage;

  return (
    <>
      <div className="wrap">
        <PageHeader eyebrow={s.eyebrow} title={s.title} lede={s.lede} meta={[raw === "az" ? "Faiz yoxdur" : "No percentages", "Python · C++ · CAD"]} />
      </div>
      <section className="wrap block" style={{ paddingTop: 8 }}>
        <Reveal>
          <p className="notice">{s.noLevels}</p>
        </Reveal>
        {s.groups.map((g, gi) => (
          <Reveal key={g.t} delay={gi * 60}>
            <section className="skill-group" aria-label={g.t}>
              <div className="skill-group-head">
                <h3>{g.t}</h3>
                <p>{g.d}</p>
              </div>
              <div className="skill-items">
                {g.items.map((it) => (
                  <div key={it.name}>
                    <strong>{it.name}</strong>
                    <p>{it.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        ))}
      </section>
      <section className="wrap block" style={{ paddingTop: 0 }} aria-labelledby="areas-t">
        <SectionHeading index="—" title={s.areasTitle} />
        <div className="areas-grid">
          {s.areas.map((a, i) => (
            <Reveal key={a.t} delay={Math.min(i * 60, 180)}>
              <article className="area-card">
                <h3>{a.t}</h3>
                <p>{a.d}</p>
                <p className="proof">{a.proof}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
