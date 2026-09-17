import type { MetadataRoute } from "next";
import { langs } from "@/lib/i18n";
import { projects } from "@/lib/content";

const base = "https://eldar-hamidov.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/projects", "/competitions", "/skills", "/media", "/contact"];
  const entries: MetadataRoute.Sitemap = [];
  for (const lang of langs) {
    for (const p of pages) {
      entries.push({
        url: `${base}/${lang}${p}`,
        lastModified: new Date("2026-09-17"),
        changeFrequency: "monthly",
        priority: p === "" ? 1 : 0.8,
      });
    }
    for (const pr of projects) {
      entries.push({
        url: `${base}/${lang}/projects/${pr.slug}`,
        lastModified: new Date("2026-09-17"),
        changeFrequency: "yearly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
