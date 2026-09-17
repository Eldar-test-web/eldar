import Link from "next/link";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { achievements, projects } from "@/lib/content";
import { LAB_MODELS } from "@/data/models";
import { WHATSAPP_URL, EMAIL } from "@/data/socials";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/PageHeader";
import { Monogram } from "@/components/Brand";
import { HeroFigure } from "@/components/HeroFigure";
import { IconArrow, IconArrowUpRight } from "@/components/icons";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: "Eldar Həmidov | Robotics • AI • Engineering",
    description:
      lang === "az"
        ? "Eldar Həmidovun şəxsi mühəndis portfeli — robototexnika, Sİ, kibertəhlükəsizlik, mexaniki dizayn, müsabiqələr, layihələr və interaktiv 3D."
        : "Personal engineering portfolio of Eldar Həmidov featuring robotics, AI, cybersecurity, mechanical design, competitions, projects, and interactive 3D engineering work.",
  };
}

const selectedIds = ["robocross-2020", "saf-2023-rescue-bag", "njco-2025", "airo-2026"];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);
  const selected = selectedIds
    .map((id) => achievements.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const featured = projects.filter((x) => x.featured).slice(0, 3);

  return (
    <>
      <section className="wrap hero" aria-labelledby="home-title">
        <div>
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow-rule" aria-hidden="true" />
              {d.home.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={70}>
            <h1 id="home-title" className="h-display">
              {d.home.titleA}
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="h-display" style={{ fontSize: "clamp(22px,3vw,34px)", marginTop: 14 }} aria-label={d.home.titleB}>
              <em>{d.home.titleB}</em>
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="hero-fields">{d.home.fields}</p>
          </Reveal>
          <Reveal delay={220}>
            <p className="lede" style={{ marginTop: 22 }}>
              {raw === "az"
                ? "Ağıllı sistemlər qurur, mühəndisliyi araşdırır və ideyaları real prototiplərə çevirir."
                : "Building intelligent systems, exploring engineering, and turning ideas into real-world prototypes."}
            </p>
          </Reveal>
          <Reveal delay={260}>
            <p className="prose" style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: "62ch" }}>
              {d.home.note}
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="hero-actions">
              <Link className="btn btn-solid" href={`/${raw}/projects`}>
                {d.home.viewProjects} <IconArrow />
              </Link>
              <Link className="btn" href={`/${raw}/achievements`}>
                {d.home.viewAchievements} <IconArrow />
              </Link>
              <Link className="btn" href={`/${raw}/lab`}>
                {d.labPage.title} <IconArrow />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <div className="fact-grid" aria-label="Facts">
              <div>
                <small>{d.home.locationLabel}</small>
                <strong>{d.home.location}</strong>
              </div>
              <div>
                <small>{d.home.focusLabel}</small>
                <strong>{d.home.focus}</strong>
              </div>
              <div>
                <small>{d.home.educationLabel}</small>
                <strong>{d.home.education}</strong>
              </div>
              <div>
                <small>{d.home.statusLabel}</small>
                <strong>{d.home.status}</strong>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <aside className="portrait-card" aria-label="Identity card">
            <div className="portrait-top">
              <span>EH — ID / 01</span>
              <span>2020 — 2026</span>
            </div>
            <div className="portrait-body">
              <div className="portrait-mono">
                <Monogram size={92} />
              </div>
              <p className="portrait-name">Eldar Həmidov</p>
              <p className="portrait-role">{d.home.fields}</p>
              <ul className="portrait-list">
                <li>
                  <span>01</span>
                  <span>{d.home.location}</span>
                </li>
                <li>
                  <span>02</span>
                  <span>{d.home.education}</span>
                </li>
                <li>
                  <span>03</span>
                  <span>{d.common.documented} — 2020/2026</span>
                </li>
              </ul>
              <p className="caption">
                <span>
                  <b>FIG.01</b> — {raw === "az" ? "Şəxsi nişan, mühəndis dəqiqliyi" : "Personal mark, engineering precision"}
                </span>
                <span>EH</span>
              </p>
            </div>
          </aside>
        </Reveal>
      </section>

      {/* Stats — counted from the archive, never invented */}
      <section className="wrap" aria-label="Figure">
        <HeroFigure lang={raw} />
      </section>
      <section className="wrap block" aria-labelledby="stats-t">
        <SectionHeading index={d.home.statsEyebrow} title={d.home.statsTitle} text={d.home.statsText} />
        <div className="stats-grid">
          <div>
            <strong>{achievements.length}</strong>
            <span>{raw === "az" ? "sənədli qeyd" : "documented entries"}</span>
          </div>
          <div>
            <strong>Robotics</strong>
            <span>AIRO 2nd · RoboCross World 2nd · WRO</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>ISAO Honor Roll · K.O.R.A</span>
          </div>
          <div>
            <strong>Cybersecurity</strong>
            <span>NJCO 2nd · AKTA Summer School</span>
          </div>
          <div>
            <strong>Design</strong>
            <span>Fusion 360 · SolidWorks · FreeCAD</span>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap block" aria-labelledby="selected-t">
        <SectionHeading index={d.home.selectedEyebrow} title={d.home.selectedTitle} text={d.home.selectedText} />
        <div className="selected-grid">
          {selected.map((a, i) => (
            <Reveal key={a.id} delay={i * 70} as="article">
              <article style={{ padding: 0, border: 0 }}>
                <p className="yr" style={{ margin: 0 }}>{a.year}</p>
                <h3>{a.title[raw]}</h3>
                <p>
                  {a.event[raw]} — {a.result[raw]}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <p style={{ marginTop: 20 }}>
            <Link className="link-quiet" href={`/${raw}/achievements`}>
              {d.common.viewAll} <IconArrowUpRight />
            </Link>
          </p>
        </Reveal>
      </section>

      {/* Featured projects */}
      <section className="wrap block" aria-labelledby="feat-t" style={{ paddingTop: 0 }}>
        <SectionHeading index={d.home.featuredEyebrow} title={d.home.featuredTitle} text={d.home.featuredText} />
        <div className="project-index">
          {featured.map((pr) => (
            <Reveal key={pr.slug}>
              <Link className="project-row is-featured" href={`/${raw}/projects/${pr.slug}`}>
                <span className="num">{pr.index}</span>
                <span>
                  <h3>{pr.title[raw]}</h3>
                  <p className="sub">{pr.subtitle[raw]}</p>
                </span>
                <span className="meta">{pr.result[raw]}</span>
                <span className="go" aria-hidden="true">
                  <IconArrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 3D Lab preview */}
      <section className="wrap block" aria-labelledby="lab-t" style={{ paddingTop: 0 }}>
        <SectionHeading index={d.home.labEyebrow} title={d.home.labTitle} text={d.home.labText} />
        <div className="lab-preview-grid">
          {LAB_MODELS.map((m, i) => (
            <Reveal key={m.id} delay={i * 70}>
              <Link className="lab-preview-card" href={`/${raw}/lab/${m.id}`}>
                <span className="lab-idx">{m.index}</span>
                <strong>{m.title}</strong>
                <small>{m.subtitle}</small>
                <span className="link-quiet" style={{ marginTop: 12 }}>
                  {d.home.labCta} <IconArrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap block" aria-labelledby="method-t">
        <SectionHeading index={d.home.archiveEyebrow} title={d.home.principlesTitle} />
        <div className="principle-grid">
          {d.home.principles.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <div style={{ padding: 0, border: 0 }}>
                <span className="big">0{i + 1}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="wrap block" aria-labelledby="cta-t" style={{ paddingTop: 0 }}>
        <div className="cta-box">
          <Reveal>
            <div>
              <p className="eyebrow" style={{ marginBottom: 12 }}>
                <span className="eyebrow-rule" aria-hidden="true" />
                {d.home.contactEyebrow}
              </p>
              <h2 className="h2" id="cta-t">{d.home.contactTitle}</h2>
              <p className="lede" style={{ marginTop: 12 }}>{d.home.contactText}</p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="cta-actions">
              <a className="btn btn-solid" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                {d.home.contactCta} <IconArrowUpRight />
              </a>
              <a className="btn" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <Link className="link-quiet" href={`/${raw}/contact`}>
                {d.nav.contact} <IconArrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="wrap block" aria-labelledby="index-t" style={{ paddingTop: 0 }}>
        <SectionHeading index="05 — Index" title={d.home.indexTitle} text={d.home.indexText} />
        <nav className="index-list" aria-label="Site index">
          {[
            { h: `/${raw}/about`, t: d.nav.about, s: raw === "az" ? "Kimdir, necə formalaşıb" : "Who he is, how he formed" },
            { h: `/${raw}/achievements`, t: d.nav.achievements, s: `2020–2026 · ${achievements.length} entries` },
            { h: `/${raw}/projects`, t: d.nav.projects, s: raw === "az" ? "WakeWell · Aqua Fly · K.O.R.A" : "WakeWell · Aqua Fly · K.O.R.A" },
            { h: `/${raw}/lab`, t: d.nav.lab, s: "3 studies · interactive" },
            { h: `/${raw}/contact`, t: d.nav.contact, s: EMAIL },
          ].map((l, i) => (
            <Reveal key={l.h} delay={Math.min(i * 50, 200)}>
              <Link href={l.h}>
                <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <strong>{l.t}</strong>
                  <small>{l.s}</small>
                </span>
                <span className="go" aria-hidden="true">
                  <IconArrow />
                </span>
              </Link>
            </Reveal>
          ))}
        </nav>
      </section>
    </>
  );
}
