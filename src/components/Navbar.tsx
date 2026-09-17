"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { useTheme } from "@/lib/theme";
import { Wordmark } from "./Brand";
import { IconClose, IconMenu, IconMoon, IconSun } from "./icons";

const routes = ["", "/about", "/projects", "/competitions", "/skills", "/media", "/contact"] as const;

function switchLangPath(pathname: string, next: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "az") parts[0] = next;
  else parts.unshift(next);
  return "/" + parts.join("/");
}

function labelFor(route: string, dict: Dict, lang: Lang) {
  void lang;
  switch (route) {
    case "":
      return dict.nav.home;
    case "/about":
      return dict.nav.about;
    case "/projects":
      return dict.nav.projects;
    case "/competitions":
      return dict.nav.competitions;
    case "/skills":
      return dict.nav.skills;
    case "/media":
      return dict.nav.media;
    default:
      return dict.nav.contact;
  }
}

export function Navbar({ lang, dict }: { lang: Lang; dict: Dict }) {
  const pathname = usePathname() || `/${lang}`;
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  const other: Lang = lang === "en" ? "az" : "en";

  return (
    <header className={`site-head${compact ? " is-compact" : ""}`}>
      <div className="head-in">
        <Link className="brand-link" href={`/${lang}`} aria-label="Eldar Həmidov — home">
          <Wordmark sub={dict.brandSub} />
        </Link>

        <nav className="desk-nav" aria-label="Primary">
          {routes.map((r) => {
            const href = `/${lang}${r}`;
            const active =
              r === "" ? pathname === `/${lang}` || pathname === `/${lang}/` : pathname.startsWith(href);
            return (
              <Link key={r || "home"} href={href} aria-current={active ? "page" : undefined} className={active ? "is-active" : ""}>
                {labelFor(r, dict, lang)}
              </Link>
            );
          })}
        </nav>

        <div className="head-actions">
          <Link
            className="lang-switch"
            href={switchLangPath(pathname, other)}
            aria-label={other === "en" ? "Switch to English" : "Azərbaycancaya keç"}
            hrefLang={other}
          >
            <span className={lang === "en" ? "is-on" : ""}>EN</span>
            <i aria-hidden="true">/</i>
            <span className={lang === "az" ? "is-on" : ""}>AZ</span>
          </Link>
          <button type="button" className="theme-btn" onClick={toggle} aria-label={theme === "dark" ? dict.themeLight : dict.themeDark}>
            {theme === "dark" ? <IconSun /> : <IconMoon />}
          </button>
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.close : dict.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav aria-label="Mobile">
          {routes.map((r, i) => {
            const href = `/${lang}${r}`;
            return (
              <Link key={r || "home"} href={href} onClick={() => setOpen(false)}>
                <span className="m-idx">{String(i + 1).padStart(2, "0")}</span>
                {labelFor(r, dict, lang)}
              </Link>
            );
          })}
        </nav>
        <div className="mobile-foot">
          <Link href={switchLangPath(pathname, other)} onClick={() => setOpen(false)}>
            {other === "en" ? "English →" : "Azərbaycanca →"}
          </Link>
          <span>EH — 2020 / 2026</span>
        </div>
      </div>
    </header>
  );
}
