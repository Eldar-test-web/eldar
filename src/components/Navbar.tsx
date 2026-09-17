"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { useTheme } from "@/lib/theme";
import { Wordmark } from "./Brand";
import { IconClose, IconMenu, IconMoon, IconSun } from "./icons";

// Master spec §2: Home · About · Achievements · Projects · 3D Design Lab · Contact
const routes = ["", "/about", "/achievements", "/projects", "/lab"] as const;
const CONTACT = "/contact";

function switchLangPath(pathname: string, next: Lang) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "en" || parts[0] === "az") parts[0] = next;
  else parts.unshift(next);
  // /competitions is a legacy alias of /achievements
  if (parts[1] === "competitions") parts[1] = "achievements";
  return "/" + parts.join("/");
}

function labelFor(route: string, dict: Dict) {
  switch (route) {
    case "":
      return dict.nav.home;
    case "/about":
      return dict.nav.about;
    case "/achievements":
      return dict.nav.achievements;
    case "/projects":
      return dict.nav.projects;
    case "/lab":
      return dict.nav.lab;
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
  const contactHref = `/${lang}${CONTACT}`;
  const contactActive =
    pathname === contactHref || pathname.startsWith(`${contactHref}/`);

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
              r === ""
                ? pathname === `/${lang}` || pathname === `/${lang}/`
                : pathname.startsWith(href) ||
                  (r === "/achievements" && pathname.startsWith(`/${lang}/competitions`));
            return (
              <Link key={r || "home"} href={href} aria-current={active ? "page" : undefined} className={active ? "is-active" : ""}>
                {labelFor(r, dict)}
              </Link>
            );
          })}
          <Link
            href={contactHref}
            aria-current={contactActive ? "page" : undefined}
            className={`nav-cta${contactActive ? " is-active" : ""}`}
          >
            {dict.nav.contact}
          </Link>
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
          {[...routes, CONTACT].map((r, i) => {
            const href = `/${lang}${r}`;
            return (
              <Link key={r || "home"} href={href} onClick={() => setOpen(false)}>
                <span className="m-idx">{String(i + 1).padStart(2, "0")}</span>
                {labelFor(r, dict)}
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
