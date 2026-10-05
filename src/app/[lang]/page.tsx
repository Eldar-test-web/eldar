import Link from "next/link";
import type { Metadata } from "next";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { achievements, projects } from "@/lib/content";
import { WHATSAPP_URL, EMAIL } from "@/data/socials";
import { SectionHeading } from "@/components/PageHeader";
import { FadeIn, Magnetic, Marquee, Tilt } from "@/components/motion";
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
    title: "Eldar Hamidov | Robotics • AI • Cybersecurity",
    description:
      lang === "az"
        ? "Eldar Hamidovun şəxsi mühəndis portfeli — robototexnika, AI, kibertəhlükəsizlik, CAD, müsabiqələr və real prototiplər."
        : "Personal engineering portfolio of Eldar Hamidov: robotics, AI, cybersecurity, CAD, competitions and working prototypes.",
  };
}

const PHOTOS = {
  heroRobot:
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  circuit:
    "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  code: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  drone:
    "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop",
  cyber:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
  bench:
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
};

const selectedIds = ["robocross-2020", "saf-2023-rescue-bag", "njco-2025", "airo-2026"];

const TIMELINE = [
  { year: "2020", img: PHOTOS.heroRobot },
  { year: "2022", img: PHOTOS.bench },
  { year: "2023", img: PHOTOS.circuit },
  { year: "2025", img: PHOTOS.cyber },
  { year: "2026", img: PHOTOS.drone },
];

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);
  const az = raw === "az";
  const selected = selectedIds
    .map((id) => achievements.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const featured = projects.filter((x) => x.featured).slice(0, 3);
  const projectThumb = [PHOTOS.circuit, PHOTOS.drone, PHOTOS.code];

  const heroSub = az
    ? "Robotlar, AI prototipləri və təhlükəsiz sistemlər qurur, ideyaları işlək qurğulara çevirir."
    : "I build robots, AI prototypes and secure systems, and turn ideas into working hardware.";

  const marqueeItems = selected.map((a) => `${a.year} — ${a.title[raw]} · ${a.result[raw]}`);

  return (
    <>
      {/* 1 — Split hero: copy left, real photos right */}
      <section className="wrap lab-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <FadeIn>
            <p className="kicker">{d.home.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 id="home-title" className="h-display">
              {d.home.titleA} <span className="hot">{d.home.titleB}</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="lede" style={{ marginTop: 18 }}>
              {heroSub}
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="hero-actions">
              <Magnetic>
                <Link className="btn btn-solid" href={`/${raw}/projects`}>
                  {d.home.viewProjects} <IconArrow size={18} />
                </Link>
              </Magnetic>
              <Link className="btn" href={`/${raw}/achievements`}>
                {d.home.viewAchievements} <IconArrow size={18} />
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="hero-proof" aria-label="Facts">
              <span>
                <b>{achievements.length}</b> {az ? "sənədli nəticə" : "documented results"}
              </span>
              <span>
                <b>2020–2026</b> {az ? "müsabiqə arxivi" : "competition archive"}
              </span>
              <span>
                <b>Sumgait</b> {az ? "Azərbaycan" : "Azerbaijan"}
              </span>
            </div>
          </FadeIn>
        </div>

        <div className="photo-stack">
          <FadeIn delay={0.1}>
            <Tilt className="photo-main float-a">
              <img
                src={PHOTOS.heroRobot}
                alt={az ? "Robototexnika laboratoriyasında robot" : "Robot in a robotics lab"}
                width={1200}
                height={800}
                fetchPriority="high"
              />
              <span className="photo-tag">
                <span className="live-dot" aria-hidden="true" />
                {az ? "Sexdə • Robototexnika" : "In the lab • Robotics"} <b>EH/01</b>
              </span>
            </Tilt>
          </FadeIn>
          <div className="photo-row">
            <FadeIn delay={0.18}>
              <Tilt className="photo-card float-b">
                <img
                  src={PHOTOS.circuit}
                  alt={az ? "Çap lövhəsi və elektronika" : "Printed circuit board and electronics"}
                  width={800}
                  height={500}
                  loading="lazy"
                />
                <span className="photo-tag">{az ? "Elektronika" : "Electronics"}</span>
              </Tilt>
            </FadeIn>
            <FadeIn delay={0.24}>
              <Tilt className="photo-card float-a">
                <img
                  src={PHOTOS.code}
                  alt={az ? "Kod redaktorunda Python" : "Python code in an editor"}
                  width={800}
                  height={500}
                  loading="lazy"
                />
                <span className="photo-tag">Python · C++</span>
              </Tilt>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 2 — ONE marquee: wins ticker */}
      <Marquee items={marqueeItems.length > 0 ? marqueeItems : ["2020–2026", "Robotics", "AI", "Cybersecurity"]} />

      {/* 3 — Stats band, real counts only */}
      <section className="wrap block" aria-labelledby="stats-t">
        <div className="stats-grid" id="stats-t">
          <FadeIn>
            <div>
              <strong>{achievements.length}</strong>
              <span>{az ? "sənədli qeyd" : "documented entries"}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <div>
              <strong>Robotics</strong>
              <span>AIRO 2nd · RoboCross World 2nd · WRO</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <strong>AI</strong>
              <span>ISAO Honor Roll · K.O.R.A</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div>
              <strong>Cyber</strong>
              <span>NJCO 2nd · AKTA Summer School</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div>
              <strong>CAD</strong>
              <span>Fusion 360 · SolidWorks · FreeCAD</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4 — Bento with real photos, exactly 5 cells */}
      <section className="wrap block" aria-labelledby="bento-t" style={{ paddingTop: 0 }}>
        <SectionHeading index={d.home.statsEyebrow} title={d.home.statsTitle} text={d.home.statsText} />
        <div className="bento" id="bento-t">
          <FadeIn className="bento-card wide">
            <img src={PHOTOS.drone} alt={az ? "Səmada dron" : "Drone flying in the sky"} width={1000} height={500} loading="lazy" />
            <div className="bento-body">
              <p className="bento-tag">Aqua Fly · {az ? "Dron" : "Drone"}</p>
              <h3>{az ? "Xilasetmə dronu konsepti" : "Rescue drone concept"}</h3>
              <p>{az ? "Altıbucaqlı gövdə, su üzərində sürətli reaksiya." : "Hexagonal airframe, fast response over water."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.06} className="bento-card">
            <img src={PHOTOS.cyber} alt={az ? "Kibertəhlükəsizlik" : "Cybersecurity hardware"} width={800} height={500} loading="lazy" />
            <div className="bento-body">
              <p className="bento-tag">NJCO · 2nd</p>
              <h3>{az ? "Kibertəhlükəsizlik" : "Cybersecurity"}</h3>
              <p>{az ? "Milli olimpiada, yay məktəbi təcrübəsi." : "National olympiad plus summer school practice."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="bento-card">
            <img src={PHOTOS.bench} alt={az ? "Mühəndis dəzgahı" : "Engineering workbench"} width={800} height={500} loading="lazy" />
            <div className="bento-body">
              <p className="bento-tag">CAD · Fusion 360</p>
              <h3>{az ? "Mexaniki dizayn" : "Mechanical design"}</h3>
              <p>{az ? "CAD-dən prototipə qədər tam dövr." : "Full cycle from CAD to prototype."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.14} className="bento-card">
            <div className="bento-body">
              <p className="bento-tag">WakeWell · 2026</p>
              <h3>{az ? "Yuxu analizi qurğusu" : "Sleep-analysis wearable"}</h3>
              <p>{az ? "Bilək qurğusu, PPG + hərəkət sensoru." : "Wrist unit with PPG plus motion sensing."}</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.18} className="bento-card">
            <div className="bento-body">
              <p className="bento-tag">K.O.R.A · Python</p>
              <h3>{az ? "Tətbiqi AI layihəsi" : "Applied AI project"}</h3>
              <p>{az ? "Açıq repozitoriya, oxunaqlı kod." : "Open repository with readable code."}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 5 — Featured projects as photo index rows */}
      <section className="wrap block" aria-labelledby="feat-t" style={{ paddingTop: 0 }}>
        <SectionHeading index={d.home.featuredEyebrow} title={d.home.featuredTitle} text={d.home.featuredText} />
        <div className="project-index" id="feat-t">
          {featured.map((pr, i) => (
            <FadeIn key={pr.slug} delay={Math.min(i * 0.05, 0.15)}>
              <Link className="project-row is-featured" href={`/${raw}/projects/${pr.slug}`}>
                <span className="num">{pr.index}</span>
                <img src={projectThumb[i % projectThumb.length]} alt="" width={168} height={128} loading="lazy" aria-hidden="true" />
                <span>
                  <h3>{pr.title[raw]}</h3>
                  <p className="sub">{pr.subtitle[raw]}</p>
                </span>
                <span className="meta">{pr.result[raw]}</span>
                <span className="go" aria-hidden="true">
                  <IconArrow size={18} />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 6 — Horizontal snap journey, no scroll hijack */}
      <section className="wrap block" aria-labelledby="journey-t" style={{ paddingTop: 0 }}>
        <h2 className="h2" id="journey-t">
          {az ? "2020-dən 2026-ya yol" : "The road from 2020 to 2026"}
        </h2>
        <p className="lede" style={{ marginTop: 12 }}>
          {az ? "Sürüşdür və hər ilə bax: robotlar, AI və təhlükəsizlik." : "Swipe through the years: robots, AI and security."}
        </p>
        <div className="snap-row" style={{ marginTop: 22 }}>
          {TIMELINE.map((t, i) => {
            const a = selected[i];
            return (
              <article key={t.year}>
                <img src={t.img} alt="" width={680} height={320} loading="lazy" aria-hidden="true" />
                <div className="snap-body">
                  <p className="yr">{t.year}</p>
                  <h3>{a ? a.title[raw] : t.year}</h3>
                  <p>{a ? `${a.event[raw]} — ${a.result[raw]}` : ""}</p>
                </div>
              </article>
            );
          })}
        </div>
        <p style={{ marginTop: 18 }}>
          <Link className="link-quiet" href={`/${raw}/achievements`}>
            {d.common.viewAll} <IconArrowUpRight size={16} />
          </Link>
        </p>
      </section>

      {/* 7 — Contact, single intent */}
      <section className="wrap block" aria-labelledby="cta-t" style={{ paddingTop: 0 }}>
        <div className="cta-box">
          <FadeIn>
            <div>
              <h2 className="h2" id="cta-t">
                {d.home.contactTitle}
              </h2>
              <p className="lede" style={{ marginTop: 12 }}>
                {d.home.contactText}
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="cta-actions">
              <Magnetic>
                <a className="btn btn-solid" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  {d.home.contactCta} <IconArrow size={18} />
                </a>
              </Magnetic>
              <a className="btn" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
