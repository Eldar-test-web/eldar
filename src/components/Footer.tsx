"use client";

import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dict";
import { SOCIALS } from "@/data/socials";

export function Footer({ lang, dict }: { lang: Lang; dict: Dict }) {
  void dict;
  return (
    <footer className="site-foot minimal">
      <div className="wrap foot-min">
        <div>
          <p className="foot-brand">ELDAR HƏMIDOV</p>
          <p className="foot-tag">Robotics • AI • Cybersecurity • Engineering</p>
        </div>
        <nav aria-label="Footer">
          <Link href={`/${lang}/projects`}>
            {lang === "az" ? "Seçilmiş layihələr" : "Selected Projects"}
          </Link>
          <Link href={`/${lang}/achievements`}>
            {lang === "az" ? "Nailiyyətlər" : "Achievements"}
          </Link>
          <Link href={`/${lang}/lab`}>
            {lang === "az" ? "3D Dizayn Laboratoriyası" : "3D Design Lab"}
          </Link>
          <Link href={`/${lang}/contact`}>
            {lang === "az" ? "Əlaqə" : "Contact"}
          </Link>
        </nav>
        <div className="foot-social">
          <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SOCIALS.youtube} target="_blank" rel="noopener noreferrer">
            YouTube
          </a>
          <a href={SOCIALS.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} Eldar Həmidov</span>
        <span className="mono">EH — 2020/2026</span>
      </div>
    </footer>
  );
}
