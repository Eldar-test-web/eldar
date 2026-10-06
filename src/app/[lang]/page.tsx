import Link from "next/link";
import type { Metadata } from "next";
import { isLang, type Lang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { projects } from "@/lib/content";
import { MEDIA } from "@/data/media";
import { WHATSAPP_URL, EMAIL } from "@/data/socials";
import { assetUrl } from "@/lib/asset";
import { FadeIn, Magnetic } from "@/components/motion";
import { FilmMoment } from "@/components/FilmMoment";
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
    title: "Robotics, AI, Mechanical Engineering",
    description:
      lang === "az"
        ? "Eldar H\u0259midovun \u015f\u0259xsi m\u00fch\u0259ndis portfeli: robototexnika, AI, kibert\u0259hl\u00fck\u0259sizlik, CAD, m\u00fcsabiq\u0259l\u0259r v\u0259 real prototipl\u0259r."
        : "Personal engineering portfolio of Eldar Hamidov: robotics, AI, cybersecurity, CAD, competitions and working prototypes.",
  };
};



function Shot({ k, lang, eager }: { k: keyof typeof MEDIA; lang: Lang; eager?: boolean }) {
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
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
      />
      <figcaption className="caption">
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);

  const wakewell = projects.find((p) => p.slug === "wakewell");
  const aquafly = projects.find((p) => p.slug === "aqua-fly");
  const kora = projects.find((p) => p.slug === "kora");

  return (
    <>
      {/* 1 - Hero: identity, headline, one image */}
      <section className="wrap lab-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <FadeIn>
            <p className="kicker">{d.home.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h1 id="home-title" className="h-display">
              {d.home.title}
            </h1>
          </FadeIn>
          <FadeIn delay={0.12}>
            <p className="lede" style={{ marginTop: 18 }}>
              {d.home.lede}
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="hero-actions">
              <Magnetic>
                <Link className="btn btn-solid" href={`/${raw}/projects`}>
                  {d.home.viewProjects} <IconArrow size={18} />
                </Link>
              </Magnetic>
              <Link className="btn" href={`/${raw}/about`}>
                {d.home.aboutEldar} <IconArrow size={18} />
              </Link>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.1}>
          <Shot k="droneAssembly" lang={raw} eager />
        </FadeIn>
      </section>

      {/* 2 - Selected work: three builds, three disciplines */}
      <section className="wrap block" aria-labelledby="work-t">
        <div className="block-head">
          <h2 className="h2" id="work-t">
            {d.home.workTitle}
          </h2>
          <p className="block-side">{d.home.workText}</p>
        </div>

        {wakewell ? (
          <article className="feature" aria-label={wakewell.title[raw]}>
            <FadeIn className="feature-copy">
              <div>
                <p className="f-index">
                  {wakewell.index} - {wakewell.subtitle[raw]}
                </p>
                <h3>{wakewell.title[raw]}</h3>
                <p className="f-sub">{wakewell.body[raw]}</p>
                <p className="f-result">{wakewell.result[raw]}</p>
                <ul className="feature-tags" aria-label="Technologies">
                  {wakewell.tech.slice(0, 4).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link className="link-quiet" href={`/${raw}/projects/${wakewell.slug}`}>
                  {d.home.workCta} <IconArrow size={16} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Shot k="wakewellRender" lang={raw} />
            </FadeIn>
          </article>
        ) : null}

        {aquafly ? (
          <article className="feature" aria-label={aquafly.title[raw]}>
            <FadeIn className="feature-copy">
              <div>
                <p className="f-index">
                  {aquafly.index} - {aquafly.subtitle[raw]}
                </p>
                <h3>{aquafly.title[raw]}</h3>
                <p className="f-sub">{aquafly.body[raw]}</p>
                <p className="f-result">{aquafly.result[raw]}</p>
                <ul className="feature-tags" aria-label="Technologies">
                  {aquafly.tech.slice(0, 4).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link className="link-quiet" href={`/${raw}/projects/${aquafly.slug}`}>
                  {d.home.workCta} <IconArrow size={16} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Shot k="aquaFlyPoster" lang={raw} />
            </FadeIn>
          </article>
        ) : null}

        {kora ? (
          <article className="feature" aria-label={kora.title[raw]}>
            <FadeIn className="feature-copy">
              <div>
                <p className="f-index">
                  {kora.index} - {kora.subtitle[raw]}
                </p>
                <h3>{kora.title[raw]}</h3>
                <p className="f-sub">{kora.body[raw]}</p>
                <p className="f-result">{kora.result[raw]}</p>
                <ul className="feature-tags" aria-label="Technologies">
                  {kora.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link className="link-quiet" href={`/${raw}/projects/${kora.slug}`}>
                  {d.home.workCta} <IconArrow size={16} />
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <div className="repo-card">
                <p className="mono">GitHub</p>
                <h4>K.O.R.A.</h4>
                <p>{kora.subtitle[raw]}</p>
                {kora.externalUrl ? (
                  <a
                    className="btn"
                    href={kora.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {kora.externalLabel ?? "Open GitHub repository"} <IconArrowUpRight size={16} />
                  </a>
                ) : null}
              </div>
            </FadeIn>
          </article>
        ) : null}
      </section>

      {/* 3 - Film moment: the concept, full-bleed */}
      <section aria-labelledby="film-t" className="film-block">
        <div className="wrap">
          <FadeIn>
            <h2 className="h2" id="film-t">
              {d.home.filmTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <p className="lede" style={{ marginTop: 12 }}>
              {d.home.filmText}
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.1}>
          <div className="film-full">
            <FilmMoment lang={raw} />
          </div>
        </FadeIn>
      </section>

      {/* 4 - 3D Design Lab teaser */}
      <section className="wrap block" style={{ paddingTop: 0 }} aria-labelledby="lab-t">
        <div className="shot">
          <FadeIn>
            <figure className="media-frame" style={{ margin: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetUrl("/models/drone/poster.jpg")}
                alt="SolidWorks render of the Aqua Fly quadcopter drone"
                width={1921}
                height={906}
                loading="lazy"
              />
              <figcaption className="caption">
                <span>{d.home.labText}</span>
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div>
              <h2 className="h2" id="lab-t">
                {d.home.labTitle}
              </h2>
              <p className="lede" style={{ marginTop: 12 }}>
                {d.home.labText}
              </p>
              <p style={{ marginTop: 22 }}>
                <Link className="btn btn-solid" href={`/${raw}/lab`}>
                  {d.home.labCta} <IconArrow size={18} />
                </Link>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4 - Method: five verbs, no enumeration */}
      <section className="wrap block" style={{ paddingTop: 0 }} aria-labelledby="method-t">
        <div className="block-head">
          <h2 className="h2" id="method-t">
            {d.home.methodTitle}
          </h2>
          <p className="block-side">{d.home.methodText}</p>
        </div>
        <div className="process-strip">
          {d.home.methodSteps.map((s, i) => (
            <FadeIn key={s.t} delay={Math.min(i * 0.05, 0.2)}>
              <div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5 - Research note: text only, no unrelated visual */}
      <section className="wrap block" style={{ paddingTop: 0 }} aria-labelledby="res-t">
        <div className="cert-box">
          <FadeIn>
            <h2 className="h2" id="res-t" style={{ fontSize: "clamp(24px,3vw,34px)" }}>
              {d.home.researchTitle}
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p style={{ color: "var(--ink-2)", maxWidth: "70ch" }}>{d.home.researchText}</p>
            <p style={{ marginTop: 18 }}>
              <Link className="link-quiet" href={`/${raw}/about#research`}>
                {d.home.researchCta} <IconArrow size={16} />
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 6 - Contact, single intent */}
      <section className="wrap block" style={{ paddingTop: 0 }} aria-labelledby="cta-t">
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
              <a className="link-quiet" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
