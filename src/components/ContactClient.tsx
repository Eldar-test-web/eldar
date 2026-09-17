"use client";

import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { IconArrowUpRight, IconMail } from "@/components/icons";

const EMAIL = "eldarhamidov2009@gmail.com";

export function ContactClient({ lang, dict }: { lang: Lang; dict: Dict }) {
  const c = dict.contactPage;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  void lang;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Archive inquiry — ${name || "website"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <>
      <div className="wrap">
        <PageHeader eyebrow={c.eyebrow} title={c.title} lede={c.lede} meta={[EMAIL, "YouTube · Instagram · GitHub"]} />
      </div>
      <section className="wrap block" style={{ paddingTop: 8 }}>
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
                    <a href="https://github.com/Eldar-005/eldar_hasc2025" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      GitHub <IconArrowUpRight size={14} />
                    </a>
                    {" · "}
                    <a href="https://www.youtube.com/@EldarBuildLab" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      YouTube <IconArrowUpRight size={14} />
                    </a>
                    {" · "}
                    <a href="https://www.instagram.com/eldar_hamidov09/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", gap: 6 }}>
                      Instagram <IconArrowUpRight size={14} />
                    </a>
                  </span>
                </div>
              </div>
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
