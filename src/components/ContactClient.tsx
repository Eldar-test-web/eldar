"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { EMAIL, WHATSAPP_URL, SOCIALS, PROJECT_LINKS } from "@/data/socials";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { IconArrowUpRight, IconMail, IconWhatsApp } from "@/components/icons";

export function ContactClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const c = dict.contactPage;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  void lang;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry — ${name || "website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <div className="wrap">
        <PageHeader
          eyebrow={c.eyebrow}
          title="Let's connect."
          lede={c.lede}
          meta={[EMAIL, "YouTube · Instagram · GitHub"]}
        />
      </div>

      <section className="wrap block" style={{ paddingTop: 8 }}>
        <Reveal>
          <div className="wa-banner">
            <div>
              <p className="eyebrow" style={{ marginBottom: 10 }}>
                <span className="eyebrow-rule" aria-hidden="true" />
                {c.whatsappTitle}
              </p>
              <p style={{ margin: 0, color: "var(--ink-2)", maxWidth: "60ch" }}>{c.whatsappText}</p>
            </div>
            <a className="btn btn-solid" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> {c.whatsappCta}
            </a>
          </div>
        </Reveal>
      </section>

      <section className="wrap block" style={{ paddingTop: 0 }}>
        <div className="contact-grid">
          <Reveal>
            <div>
              <h2 className="h2" style={{ fontSize: "clamp(24px,3vw,34px)" }}>{c.emailLabel}</h2>
              <div className="contact-lines">
                <a href={`mailto:${EMAIL}`}>
                  <small>Email</small>
                  <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                    <IconMail /> {EMAIL}
                  </span>
                </a>
                <div>
                  <small>{c.socialLabel}</small>
                  <span>
                    <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      GitHub <IconArrowUpRight size={14} />
                    </a>
                    {" · "}
                    <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      YouTube <IconArrowUpRight size={14} />
                    </a>
                    {" · "}
                    <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      Instagram <IconArrowUpRight size={14} />
                    </a>
                  </span>
                </div>
                <div>
                  <small>{c.projectsTitle}</small>
                  <span>
                    <a href={PROJECT_LINKS.wakewell} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      WakeWell <IconArrowUpRight size={14} />
                    </a>
                    {" · "}
                    <a href={PROJECT_LINKS.aquaFly} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      Aqua Fly <IconArrowUpRight size={14} />
                    </a>
                  </span>
                </div>
              </div>
              <p style={{ color: "var(--ink-2)", fontSize: 14.5, marginTop: 16 }}>{c.projectsText}</p>
              <p className="notice" style={{ marginTop: 20 }}>
                {c.viaEmail} <a className="link-quiet" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                <br />
                {c.privacy}
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <form className="form" onSubmit={onSubmit} aria-label={c.formTitle}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, margin: "0 0 8px" }}>{c.formTitle}</h2>
              <p style={{ color: "var(--ink-2)", fontSize: 14, margin: "0 0 18px" }}>{c.formText}</p>
              <div className="field">
                <label htmlFor="ct-name">{c.name}</label>
                <input id="ct-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="ct-email">{c.email}</label>
                <input id="ct-email" name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="field">
                <label htmlFor="ct-msg">{c.message}</label>
                <textarea id="ct-msg" name="message" required value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>
              <button className="btn btn-solid" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                {c.send}
              </button>
              {sent ? (
                <p role="status" style={{ fontSize: 13.5, color: "var(--ink-2)", marginTop: 12 }}>
                  {c.success}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
