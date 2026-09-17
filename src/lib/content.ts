import type { Lang } from "./i18n";
import { ACHIEVEMENTS } from "@/data/achievements";
import { FEATURED_PROJECTS, type ProjectFull } from "@/data/projects";

// ---- Achievements (canonical shape for components) ----
export type FilterKey =
  | "ALL"
  | "ROBOTICS"
  | "AI"
  | "CYBERSECURITY"
  | "PROGRAMMING"
  | "SCIENCE"
  | "OTHER";

export interface Achievement {
  id: string;
  year: string;
  yearNum: number;
  title: Record<Lang, string>;
  event: Record<Lang, string>;
  result: Record<Lang, string>;
  categoryLabel: Record<Lang, string>;
  filter: Exclude<FilterKey, "ALL">;
  note?: Record<Lang, string>;
  // Editable asset/link fields (§5): never invented, "PASTE_INSTAGRAM_LINK_HERE" until real.
  certificateImage: string;
  instagramPostUrl: string;
}

export const achievements: Achievement[] = ACHIEVEMENTS.map((a) => ({
  id: a.id,
  year: a.year,
  yearNum: a.yearNum,
  title: { en: a.titleEn, az: a.titleAz },
  event: { en: a.eventEn, az: a.eventAz },
  result: { en: a.resultEn, az: a.resultAz },
  categoryLabel: { en: a.categoryEn, az: a.categoryAz },
  filter: a.filter,
  note:
    a.noteEn && a.noteAz ? { en: a.noteEn, az: a.noteAz } : undefined,
  certificateImage: a.certificateImage,
  instagramPostUrl: a.instagramPostUrl,
}));

export function isInstagramPlaceholder(url: string): boolean {
  return !url || url.includes("PASTE_INSTAGRAM_LINK_HERE");
}

// ---- Projects ----
export interface Project {
  slug: string;
  index: string;
  featured?: boolean;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  context: Record<Lang, string>;
  role: Record<Lang, string>;
  tech: string[];
  result: Record<Lang, string>;
  body: Record<Lang, string>;
  externalUrl?: string;
  externalLabel?: string;
  sections?: { h: Record<Lang, string>; p: Record<Lang, string> }[];
}

const featured: Project[] = FEATURED_PROJECTS.map((p: ProjectFull) => ({
  slug: p.slug,
  index: p.index,
  featured: true,
  title: { en: p.titleEn, az: p.titleAz },
  subtitle: { en: p.subtitleEn, az: p.subtitleAz },
  context: { en: p.contextEn, az: p.contextAz },
  role: { en: p.roleEn, az: p.roleAz },
  tech: p.tech,
  result: { en: p.resultEn, az: p.resultAz },
  body: { en: p.bodyEn, az: p.bodyAz },
  externalUrl: p.externalUrl,
  externalLabel: p.externalLabel,
  sections: p.sections?.map((s) => ({
    h: { en: s.hEn, az: s.hAz },
    p: { en: s.pEn, az: s.pAz },
  })),
}));

const archive: Project[] = [
  {
    slug: "rescue-bag-saf-2023",
    index: "05",
    title: {
      en: "Earthquake rescue bag",
      az: "Zəlzələ zamanı xilasedici çanta",
    },
    subtitle: { en: "SAF-2023 · Innovative Exhibition — Winner", az: "SAF-2023 · İnnovativ Sərgi — Qalib" },
    context: { en: "Competition entry · SAF-2023", az: "Müsabiqə işi · SAF-2023" },
    role: { en: "Design and build", az: "Dizayn və hazırlıq" },
    tech: ["Engineering design", "Prototyping"],
    result: {
      en: "Winner, Innovative Exhibition category at SAF-2023.",
      az: "SAF-2023-də İnnovativ Sərgi kateqoriyası üzrə qalib.",
    },
    body: { en: "Prepared for the SAF-2023 Innovative Exhibition on the theme of a rescue bag for use in an earthquake scenario.",
        az: "SAF-2023 İnnovativ Sərgi üçün zəlzələ ssenarisində istifadə üçün xilasedici çanta mövzusunda hazırlanıb.",
      },
  },
  {
    slug: "sumracers-egypt-2021",
    index: "06",
    title: { en: "SUMracers — Egypt robotics entry", az: "SUMracers — Misir robototexnika işi" },
    subtitle: { en: "International Robotics Olympiad, Egypt 2021 — 5th place", az: "Misir Beynəlxalq Robototexnika Olimpiadası 2021 — 5-ci yer" },
    context: { en: "Team entry · SUMracers", az: "Komanda işi · SUMracers" },
    role: { en: "Team member", az: "Komanda üzvü" },
    tech: ["Robotics", "Team engineering"],
    result: {
      en: "5th place with the SUMracers team.",
      az: "SUMracers komandası ilə 5-ci yer.",
    },
    body: { en: "Team robotics entry presented at the international olympiad in Egypt.",
        az: "Misirdə keçirilən beynəlxalq olimpiadada təqdim olunan komanda robototexnika işi.",
      },
  },
  {
    slug: "wro-robocross-track",
    index: "07",
    title: { en: "WRO / RoboCross robotics track", az: "WRO / RoboCross robototexnika istiqaməti" },
    subtitle: {
      en: "RoboCross World 2nd (2020) · WRO finals and placements 2020–2024",
      az: "RoboCross Dünya 2-cisi (2020) · WRO finalları və yerləri 2020–2024",
    },
    context: { en: "Competition robotics · 2020–2024", az: "Müsabiqə robototexnikası · 2020–2024" },
    role: { en: "Participant", az: "İştirakçı" },
    tech: ["Robotics", "Programming"],
    result: {
      en: "RoboCross Online Challenge World 2nd place (2020); WRO Virtual Games finalist (2020); WRO Canada 2020-X 5th place; WRO Azerbaijan 2024 finalist.",
      az: "RoboCross Onlayn Çağırışı Dünya 2-cisi (2020); WRO Virtual Oyunlar finalçısı (2020); WRO Kanada 2020-X 5-ci yer; WRO Azərbaycan 2024 finalçısı.",
    },
    body: { en: "A continuous competition record across virtual and physical robotics formats. Detailed build documentation will be added where available.",
        az: "Virtual və fiziki robototexnika formatlarında davamlı müsabiqə təcrübəsi. Ətraflı sənədlər mövcud olduqca əlavə ediləcək.",
      },
  },
  {
    slug: "teknofest-2022-entry",
    index: "08",
    title: { en: "Teknofest Azerbaijan entry", az: "Teknofest Azərbaycan işi" },
    subtitle: { en: "Teknofest Azerbaijan 2022 — Finalist", az: "Teknofest Azərbaycan 2022 — Finalçı" },
    context: { en: "Technology competition · 2022", az: "Texnologiya müsabiqəsi · 2022" },
    role: { en: "Participant", az: "İştirakçı" },
    tech: ["Engineering", "Technology"],
    result: { en: "Finalist at Teknofest Azerbaijan 2022.", az: "Teknofest Azərbaycan 2022-də finalçı." },
    body: { en: "Finalist entry at Teknofest Azerbaijan 2022. Project documentation will be added.",
        az: "Teknofest Azərbaycan 2022-də finalçı işi. Layihə sənədləri əlavə ediləcək.",
      },
  },
  {
    slug: "ai-programming-practice",
    index: "09",
    title: { en: "AI and programming practice", az: "Süni intellekt və proqramlaşdırma təcrübəsi" },
    subtitle: {
      en: "AI Olympiad Honor Roll (2025) · Bebras Honors · Scratch Finalist (2021)",
      az: "Sİ Olimpiadası Şərəf siyahısı (2025) · Bebras Fəxri · Scratch Finalçısı (2021)",
    },
    context: { en: "Code and applied AI · Python / C++", az: "Kod və tətbiqi Sİ · Python / C++" },
    role: { en: "Independent practice and olympiad preparation", az: "Müstəqil məşq və olimpiada hazırlığı" },
    tech: ["Python", "C++"],
    result: {
      en: "International Schools AI Olympiad 2025 Honor Roll; Bebras USA 2024–2025 Honor Roll; Bebras semifinal; Scratch Olympiad National Selection Finalist (2021).",
      az: "Beynəlxalq Məktəblər Sİ Olimpiadası 2025 Şərəf siyahısı; Bebras ABŞ 2024–2025 Şərəf siyahısı; Bebras yarımfinal; Scratch Olimpiadası Milli Seçim Finalçısı (2021).",
    },
    body: { en: "Ongoing work in Python and C++ through olympiads and small applied tasks. Selected code is shared via GitHub where appropriate.",
        az: "Olimpiadalar və kiçik tətbiqi tapşırıqlar vasitəsilə Python və C++ üzrə davamlı iş. Seçilmiş kodlar uyğun olduqda GitHub-da paylaşılır.",
      },
  },
  {
    slug: "cybersecurity-foundations",
    index: "10",
    title: { en: "Cybersecurity foundations", az: "Kibertəhlükəsizlik əsasları" },
    subtitle: { en: "National Junior Cybersecurity Olympiad 2025 — 2nd place", az: "Milli Yeniyetmə Kibertəhlükəsizlik Olimpiadası 2025 — 2-ci yer" },
    context: { en: "Study and lab practice · documented olympiad result", az: "Tədris və laboratoriya təcrübəsi · sənədli olimpiada nəticəsi" },
    role: { en: "Participant", az: "İştirakçı" },
    tech: ["Fundamentals", "Lab practice"],
    result: {
      en: "2nd place at the National Junior Cybersecurity Olympiad 2025. Lab-only practice; no live-system testing.",
      az: "Milli Yeniyetmə Kibertəhlükəsizlik Olimpiadası 2025-də 2-ci yer. Yalnız laboratoriya təcrübəsi; canlı sistemlərdə sınaq yoxdur.",
    },
    body: { en: "Foundations developed through structured study and controlled lab exercises. Further notes will be added conservatively.",
        az: "Strukturlaşdırılmış tədris və nəzarətli laboratoriya məşğələləri ilə formalaşan əsaslar. Əlavə qeydlər ehtiyatla əlavə ediləcək.",
      },
  },
];

export const projects: Project[] = [...featured, ...archive];
