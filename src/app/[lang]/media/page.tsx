import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n";
import { getDict } from "@/lib/dict";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { IconArrowUpRight } from "@/components/icons";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  return {
    title: lang === "az" ? "Media" : "Media",
    description: lang === "az" ? "YouTube, Instagram, GitHub — təsdiqlənmiş kanallar." : "YouTube, Instagram, GitHub — confirmed channels only.",
  };
}

export default async function MediaPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const d = getDict(raw);
  const m = d.mediaPage;

  return (
    <>
      <div className="wrap">
        <PageHeader eyebrow={m.eyebrow} title={m.title} lede={m.lede} meta={["YouTube", "Instagram", "GitHub"]} />
      </div>
      <section className="wrap block" style={{ paddingTop: 8 }} aria-label="Channels">
        <div className="channel-list">
          {m.channels.map((c, i) => (
            <Reveal key={c.url} delay={Math.min(i * 60, 180)}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.name} — ${c.handle}`}>
                <span>
                  <p className="c-name">{c.name}</p>
                  <h3>{c.handle}</h3>
                  <p className="c-desc">{c.desc}</p>
                  <p className="c-meta">{c.meta} ↗</p>
                </span>
                <span className="c-go" aria-hidden="true">
                  <IconArrowUpRight />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal delay={100}>
          <div className="cert-box" style={{ marginTop: 32 }}>
            <h2 className="h2" style={{ fontSize: "clamp(22px,3vw,30px)" }}>{m.noteTitle}</h2>
            <p style={{ color: "var(--ink-2)", marginBottom: 0 }}>{m.noteText}</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
