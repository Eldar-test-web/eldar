"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import {
  buildKnowledge,
  detectLang,
  kindName,
  retrieve,
  type KBRecord,
} from "@/lib/knowledge";
import { IconClose, IconSend, IconSpark } from "@/components/icons";

interface Msg {
  role: "user" | "assistant";
  text: string;
  sources?: { title: string; route: string; kind: KBRecord["kind"] }[];
}

const STR = {
  en: {
    fab: "Ask Eldar",
    title: "Ask Eldar",
    sub: "On-device answers from portfolio data only.",
    hint: "Ask about projects, competitions, skills or models.",
    placeholder: "What has Eldar built?",
    empty: "No verified information on that yet — try projects, competitions, skills or 3D models.",
    answeredFrom: "Sources",
    clear: "Clear conversation",
    close: "Close",
    send: "Send",
    copy: "Copy response",
    copied: "Copied",
  },
  az: {
    fab: "Eldardan soruş",
    title: "Eldardan soruş",
    sub: "Yalnız portfel məlumatlarından cavablar.",
    hint: "Layihələr, müsabiqələr, bacarıqlar və ya modellər haqqında soruşun.",
    placeholder: "Eldar nə qurub?",
    empty: "Bu barədə hələ təsdiqlənmiş məlumat yoxdur — layihələr, müsabiqələr, bacarıqlar və ya 3D modelləri yoxlayın.",
    answeredFrom: "Mənbələr",
    clear: "Söhbəti təmizlə",
    close: "Bağla",
    send: "Göndər",
    copy: "Cavabı köçür",
    copied: "Köçürüldü",
  },
} as const;

function snippet(text: string, max = 170) {
  const t = text.trim().replace(/\s+/g, " ");
  return t.length > max ? `${t.slice(0, max).trimEnd()}…` : t;
}

export function AskEldar({ lang }: { lang: Lang }) {
  const kb = useMemo(() => buildKnowledge(), []);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  function answer(query: string) {
    const ql = detectLang(query);
    const s = STR[ql];
    const hits = retrieve(kb, query, ql, 3);
    if (hits.length === 0) {
      return { lang: ql, text: s.empty, sources: [] as Msg["sources"] };
    }
    const lines = hits.map((h) => `**${h.r.title[ql]}** — ${snippet(h.r.text[ql])}`);
    return {
      lang: ql,
      text: lines.join("\n\n"),
      sources: hits.map((h) => ({ title: h.r.title[ql], route: h.r.route, kind: h.r.kind })),
    };
  }

  function send(raw: string) {
    const q = raw.trim();
    if (!q || busy) return;
    setBusy(true);
    const a = answer(q);
    // Retrieval runs synchronously on local data; state updates on the next
    // frame so the loading indicator paints honestly for slow devices.
    requestAnimationFrame(() => {
      setMsgs((m) => [...m, { role: "user", text: q }, { role: "assistant", text: a.text, sources: a.sources }]);
      setBusy(false);
      setInput("");
      boxRef.current?.scrollTo({ top: boxRef.current.scrollHeight });
    });
  }

  function copy(text: string, i: number) {
    const done = () => {
      setCopied(i);
      setTimeout(() => setCopied(null), 1400);
    };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, done);
    else done();
  }

  const s = STR[lang];

  return (
    <>
      <button
        type="button"
        className="ask-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={s.fab}
      >
        <IconSpark size={20} />
        <span>{s.fab}</span>
      </button>

      {open ? (
        <section className="ask-panel" role="dialog" aria-label={s.title} aria-modal="false">
          <div className="ask-head">
            <div>
              <strong>{s.title}</strong>
              <small>{s.sub}</small>
            </div>
            <div className="ask-head-actions">
              <button type="button" className="ask-mini" onClick={() => setMsgs([])} aria-label={s.clear}>
                {s.clear}
              </button>
              <button
                type="button"
                className="theme-btn"
                onClick={() => setOpen(false)}
                aria-label={s.close}
              >
                <IconClose size={18} />
              </button>
            </div>
          </div>

          <div className="ask-msgs" ref={boxRef} aria-live="polite">
            {msgs.length === 0 ? (
              <p className="ask-hint">{s.hint}</p>
            ) : (
              msgs.map((m, i) =>
                m.role === "user" ? (
                  <p key={i} className="ask-msg is-user">
                    {m.text}
                  </p>
                ) : (
                  <div key={i} className="ask-msg is-ai">
                    {m.text.split("\n\n").map((para, j) => {
                      const bold = para.match(/^\*\*(.+?)\*\* — ([\s\S]*)$/);
                      return bold ? (
                        <p key={j}>
                          <strong>{bold[1]}</strong> — {bold[2]}
                        </p>
                      ) : (
                        <p key={j}>{para}</p>
                      );
                    })}
                    {m.sources && m.sources.length > 0 ? (
                      <div className="ask-sources">
                        <span className="mono">{lang === "az" ? "MƏNBƏLƏR" : "SOURCES"}</span>
                        {m.sources.map((src) => (
                          <Link key={src.route} href={`/${lang}${src.route}`}>
                            {src.title} · {kindName(src.kind, lang)}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                    <button
                      type="button"
                      className="ask-mini"
                      onClick={() => copy(m.text.replace(/\*\*/g, ""), i)}
                    >
                      {copied === i ? s.copied : s.copy}
                    </button>
                  </div>
                )
              )
            )}
            {busy ? (
              <p className="ask-msg is-ai is-loading" aria-label="Loading">
                <i />
                <i />
                <i />
              </p>
            ) : null}
          </div>

          <form
            className="ask-form"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label className="ask-label" htmlFor="ask-input">
              {s.fab}
            </label>
            <textarea
              id="ask-input"
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
                if (e.key === "Escape") setOpen(false);
              }}
              placeholder={s.placeholder}
              autoFocus
            />
            <button type="submit" className="btn btn-solid" disabled={busy || input.trim().length === 0} aria-label={s.send}>
              <IconSend size={18} />
            </button>
          </form>
        </section>
      ) : null}
    </>
  );
}
