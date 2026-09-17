import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, langs } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { projects } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { DocPlaceholder } from "@/components/DocPlaceholder";

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

  return (
    <>
      <section className="wrap page-head" aria-labelledby="pr-t">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow-rule" aria-hidden="true" />
            {p.detailContext} — {pr.index}
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
          <p style={{ marginTop: 18 }}>
            <Link className="link-quiet" href={`/${raw}/projects`}>
              ← {p.back}
            </Link>
          </p>
        </Reveal>
      </section>

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
              <h3>{p.tech}</h3>
              <div className="tech-chips" aria-label="Technologies">
                {pr.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <h3>{p.result}</h3>
              <p>{pr.result[raw]}</p>
              <h3>{p.overview}</h3>
              <p>{pr.body[raw]}</p>
              <p className="notice">{p.docsPending}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <DocPlaceholder
              id={`DOC — ${pr.index}`}
              label={p.docsPending}
              caption={`${pr.title[raw]} — ${raw === "az" ? "real foto əlavə olunduqda göstəriləcək" : "real photography shown only when available"}`}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
