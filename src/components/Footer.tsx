"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { useTheme } from "@/lib/theme";

export function Footer({ lang, dict }: { lang: Lang; dict: Dict }) {
  const pathname = usePathname() || `/${lang}`;
  const { theme, set } = useTheme();
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts[0] === "en" || parts[0] === "az" ? parts.slice(1).join("/") : parts.join("/");
  const enHref = "/en" + (rest ? `/${rest}` : "");
  const azHref = "/az" + (rest ? `/${rest}` : "");

  return (
    <footer className="site-foot">
      <div className="wrap foot-grid">
        <div>
          <p className="foot-brand">ELDAR HƏMİDOV</p>
          <p className="foot-tag">{dict.footer.tagline}</p>
          <p className="foot-note">{dict.footer.archiveNote}</p>
        </div>
        <nav aria-label="Footer">
          <p className="foot-h">{dict.footer.pages}</p>
          <Link href={`/${lang}`}>{dict.nav.home}</Link>
          <Link href={`/${lang}/about`}>{dict.nav.about}</Link>
          <Link href={`/${lang}/projects`}>{dict.nav.projects}</Link>
          <Link href={`/${lang}/competitions`}>{dict.nav.competitions}</Link>
          <Link href={`/${lang}/skills`}>{dict.nav.skills}</Link>
          <Link href={`/${lang}/media`}>{dict.nav.media}</Link>
          <Link href={`/${lang}/contact`}>{dict.nav.contact}</Link>
        </nav>
        <div>
          <p className="foot-h">{dict.footer.presence}</p>
          <a href="https://github.com/Eldar-005/eldar_hasc2025" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://www.youtube.com/@EldarBuildLab" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.instagram.com/eldar_hamidov09/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="mailto:eldarhamidov2009@gmail.com">eldarhamidov2009@gmail.com</a>
        </div>
        <div>
          <p className="foot-h">{dict.footer.settings}</p>
          <p className="foot-row">
            <Link href={enHref} aria-current={lang === "en" ? "true" : undefined} className={lang === "en" ? "is-on" : ""}>EN</Link>
            <span aria-hidden="true"> / </span>
            <Link href={azHref} aria-current={lang === "az" ? "true" : undefined} className={lang === "az" ? "is-on" : ""}>AZ</Link>
          </p>
          <p className="foot-row">
            <button type="button" onClick={() => set("dark")} className={theme === "dark" ? "is-on" : ""}>Dark</button>
            <span aria-hidden="true"> / </span>
            <button type="button" onClick={() => set("light")} className={theme === "light" ? "is-on" : ""}>Light</button>
          </p>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} {dict.footer.rights}</span>
        <span className="mono">EH — 2020/2026</span>
      </div>
    </footer>
  );
}
