"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { SOCIALS } from "@/data/socials";

export function Footer({ lang, dict }: { lang: Lang; dict: Dict }) {
  const f = dict.footer;
  const projectsLabel = lang === "az" ? "Se\u00e7ilmi\u015f layih\u0259l\u0259r" : "Selected Projects";
  const achievementsLabel = lang === "az" ? "Nailiyy\u0259tl\u0259r" : "Achievements";
  const labLabel = lang === "az" ? "3D Dizayn Laboratoriyas\u0131" : "3D Design Lab";
  const contactLabel = lang === "az" ? "\u018flaq\u0259" : "Contact";

  return (
    <footer className="site-foot minimal">
      <div className="wrap foot-min">
        <div>
          <p className="foot-brand">ELDAR H\u018fMIDOV</p>
          <p className="foot-tag">{f.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <Link href={`/${lang}/projects`}>{projectsLabel}</Link>
          <Link href={`/${lang}/achievements`}>{achievementsLabel}</Link>
          <Link href={`/${lang}/lab`}>{labLabel}</Link>
          <Link href={`/${lang}/contact`}>{contactLabel}</Link>
        </nav>
        <div className="foot-social">
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>{f.rights}</span>
        <span className="mono">EH - 2020-2026</span>
      </div>
    </footer>
  );
}
