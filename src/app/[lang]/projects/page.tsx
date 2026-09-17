import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { projects } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Layihələr" : "Projects",
    description:
      lang === "az"
        ? "Sənədli layihələr və müsabiqə işləri — uydurmasız."
        : "Documented projects and competition entries — nothing invented.",
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);
  const p = d.projectsPage;

  return (
    <>
      <div className="wrap">
        <PageHeader
          eyebrow={p.eyebrow}
          title={p.title}
          lede={p.lede}
          meta={[`${projects.length} ${p.countLabel}`, p.ruleLabel]}
        />
      </div>
      <section className="wrap block" style={{ paddingTop: 8 }} aria-label="Project index">
        <div className="project-index">
          {projects.map((pr, i) => (
            <Reveal key={pr.slug} delay={Math.min(i * 50, 200)}>
              <Link className="project-row" href={`/${raw}/projects/${pr.slug}`} aria-label={`${pr.index} — ${pr.title[raw]}`}>
                <span className="num">{pr.index}</span>
                <span>
                  <h3>{pr.title[raw]}</h3>
                  <p className="sub">{pr.subtitle[raw]}</p>
                </span>
                <span className="meta">
                  {pr.context[raw]}
                  <br />
                  {pr.result[raw]}
                </span>
                <span className="go" aria-hidden="true">
                  <IconArrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p className="notice" style={{ marginTop: 26 }}>
            {p.docsPending}
          </p>
        </Reveal>
      </section>
    </>
  );
}
