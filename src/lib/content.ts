import type { Lang } from "./i18n";

export type FilterKey =
  | "ALL"
  | "ROBOTICS"
  | "AI"
  | "CYBERSECURITY"
  | "PROGRAMMING"
  | "SCIENCE"
  | "MATHEMATICS"
  | "LANGUAGES";

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
}

export const achievements: Achievement[] = [
  {
    id: "airo-2026",
    year: "2026",
    yearNum: 2026,
    title: { en: "Azerbaijan International Robotics Olympiad — AIRO", az: "Azərbaycan Beynəlxalq Robototexnika Olimpiadası — AIRO" },
    event: { en: "AIRO-2026", az: "AIRO-2026" },
    result: { en: "2nd place", az: "2-ci yer" },
    categoryLabel: { en: "Robotics", az: "Robototexnika" },
    filter: "ROBOTICS",
  },
  {
    id: "njco-2025",
    year: "2025",
    yearNum: 2025,
    title: { en: "National Junior Cybersecurity Olympiad", az: "Milli Yeniyetmə Kibertəhlükəsizlik Olimpiadası" },
    event: { en: "NJCO 2025", az: "NJCO 2025" },
    result: { en: "2nd place", az: "2-ci yer" },
    categoryLabel: { en: "Cybersecurity", az: "Kibertəhlükəsizlik" },
    filter: "CYBERSECURITY",
  },
  {
    id: "ai-olympiad-2025",
    year: "2025",
    yearNum: 2025,
    title: { en: "International Schools AI Olympiad", az: "Beynəlxalq Məktəblər Süni İntellekt Olimpiadası" },
    event: { en: "ISAO 2025", az: "ISAO 2025" },
    result: { en: "Honor Roll", az: "Şərəf siyahısı" },
    categoryLabel: { en: "Artificial Intelligence", az: "Süni intellekt" },
    filter: "AI",
  },
  {
    id: "professionallar-2025",
    year: "2025",
    yearNum: 2025,
    title: { en: "“Professionallar” competition", az: "“Professionallar” müsabiqəsi" },
    event: { en: "Professionallar 2025", az: "Professionallar 2025" },
    result: { en: "1st place", az: "1-ci yer" },
    categoryLabel: { en: "Interdisciplinary", az: "İnterdisiplinar" },
    filter: "SCIENCE",
  },
  {
    id: "english-olympiad",
    year: "—",
    yearNum: 2025,
    title: { en: "USA International English Language Olympiad", az: "ABŞ Beynəlxalq İngilis Dili Olimpiadası" },
    event: { en: "Documented result", az: "Sənədləşdirilmiş nəticə" },
    result: { en: "1st place", az: "1-ci yer" },
    categoryLabel: { en: "English", az: "İngilis dili" },
    filter: "LANGUAGES",
    note: {
      en: "Year not published on this site. Listed exactly as documented.",
      az: "İli bu saytda göstərilmir. Sənəddə olduğu kimi təqdim olunur.",
    },
  },
  {
    id: "neo-math",
    year: "—",
    yearNum: 2025,
    title: { en: "Neo Science Olympiad — Mathematics", az: "Neo Elm Olimpiadası — Riyaziyyat" },
    event: { en: "Documented result", az: "Sənədləşdirilmiş nəticə" },
    result: { en: "3rd place", az: "3-cü yer" },
    categoryLabel: { en: "Mathematics", az: "Riyaziyyat" },
    filter: "MATHEMATICS",
    note: {
      en: "Year not published on this site. Listed exactly as documented.",
      az: "İli bu saytda göstərilmir. Sənəddə olduğu kimi təqdim olunur.",
    },
  },
  {
    id: "bebras-2024-2025",
    year: "2024–25",
    yearNum: 2024,
    title: { en: "Bebras Challenge — semifinal", az: "Bebras Çağırışı — yarımfinal" },
    event: { en: "Bebras 2024–2025", az: "Bebras 2024–2025" },
    result: { en: "Semifinalist", az: "Yarımfinalçı" },
    categoryLabel: { en: "Programming", az: "Proqramlaşdırma" },
    filter: "PROGRAMMING",
  },
  {
    id: "bebras-usa-2024-2025",
    year: "2024–25",
    yearNum: 2024,
    title: { en: "Bebras Challenge USA", az: "Bebras Çağırışı ABŞ" },
    event: { en: "Bebras USA 2024–2025", az: "Bebras ABŞ 2024–2025" },
    result: { en: "Honor Roll", az: "Şərəf siyahısı" },
    categoryLabel: { en: "Programming", az: "Proqramlaşdırma" },
    filter: "PROGRAMMING",
  },
  {
    id: "sabahin-alimleri-xiv",
    year: "2024",
    yearNum: 2024,
    title: { en: "Sabahın Alimləri XIV — Physics", az: "Sabahın Alimləri XIV — Fizika" },
    event: { en: "Sabahın Alimləri XIV", az: "Sabahın Alimləri XIV" },
    result: { en: "Finalist · certificate", az: "Finalçı · sertifikat" },
    categoryLabel: { en: "Science", az: "Elm" },
    filter: "SCIENCE",
  },
  {
    id: "wro-az-2024",
    year: "2024",
    yearNum: 2024,
    title: { en: "WRO Azerbaijan", az: "WRO Azərbaycan" },
    event: { en: "WRO Azerbaijan 2024", az: "WRO Azərbaycan 2024" },
    result: { en: "Finalist", az: "Finalçı" },
    categoryLabel: { en: "Robotics", az: "Robototexnika" },
    filter: "ROBOTICS",
  },
  {
    id: "saf-2023-rescue-bag",
    year: "2023",
    yearNum: 2023,
    title: {
      en: "“Rescue bag in case of earthquake” — Innovative Exhibition",
      az: "“Zəlzələ zamanı xilasedici çanta” — İnnovativ Sərgi",
    },
    event: { en: "SAF-2023", az: "SAF-2023" },
    result: { en: "Winner · Innovative Exhibition", az: "Qalib · İnnovativ Sərgi" },
    categoryLabel: { en: "Science · Engineering", az: "Elm · Mühəndislik" },
    filter: "SCIENCE",
  },
  {
    id: "teknofest-az-2022",
    year: "2022",
    yearNum: 2022,
    title: { en: "Teknofest Azerbaijan", az: "Teknofest Azərbaycan" },
    event: { en: "Teknofest Azerbaijan 2022", az: "Teknofest Azərbaycan 2022" },
    result: { en: "Finalist", az: "Finalçı" },
    categoryLabel: { en: "Robotics · Technology", az: "Robototexnika · Texnologiya" },
    filter: "ROBOTICS",
  },
  {
    id: "alp-logo-2022",
    year: "2022",
    yearNum: 2022,
    title: { en: "ALP Logo Competition", az: "ALP Loqo Müsabiqəsi" },
    event: { en: "ALP 2022", az: "ALP 2022" },
    result: { en: "4th place", az: "4-cü yer" },
    categoryLabel: { en: "Design", az: "Dizayn" },
    filter: "SCIENCE",
  },
  {
    id: "eu4climate-2022",
    year: "2022",
    yearNum: 2022,
    title: { en: "EU4Climate “Özün Yarat”", az: "EU4Climate “Özün Yarat”" },
    event: { en: "EU4Climate 2022", az: "EU4Climate 2022" },
    result: { en: "Finalist", az: "Finalçı" },
    categoryLabel: { en: "Innovation", az: "İnnovasiya" },
    filter: "SCIENCE",
  },
  {
    id: "egypt-2021-sumracers",
    year: "2021",
    yearNum: 2021,
    title: {
      en: "International Robotics Olympiad in Egypt — SUMracers team",
      az: "Misir Beynəlxalq Robototexnika Olimpiadası — SUMracers komandası",
    },
    event: { en: "Egypt 2021", az: "Misir 2021" },
    result: { en: "5th place", az: "5-ci yer" },
    categoryLabel: { en: "Robotics", az: "Robototexnika" },
    filter: "ROBOTICS",
  },
  {
    id: "saf-2021",
    year: "2021",
    yearNum: 2021,
    title: { en: "SAF Festival", az: "SAF Festivalı" },
    event: { en: "SAF 2021", az: "SAF 2021" },
    result: { en: "Finalist", az: "Finalçı" },
    categoryLabel: { en: "Science", az: "Elm" },
    filter: "SCIENCE",
  },
  {
    id: "scratch-2021",
    year: "2021",
    yearNum: 2021,
    title: {
      en: "V International Scratch Creative Programming Olympiad — National Selection",
      az: "V Beynəlxalq Scratch Yaradıcı Proqramlaşdırma Olimpiadası — Milli Seçim",
    },
    event: { en: "Scratch Olympiad 2021", az: "Scratch Olimpiadası 2021" },
    result: { en: "National Selection Finalist", az: "Milli Seçim Finalçısı" },
    categoryLabel: { en: "Programming", az: "Proqramlaşdırma" },
    filter: "PROGRAMMING",
  },
  {
    id: "wro-canada-2020x",
    year: "2020",
    yearNum: 2020,
    title: { en: "WRO Canada 2020-X", az: "WRO Kanada 2020-X" },
    event: { en: "WRO Canada 2020-X", az: "WRO Kanada 2020-X" },
    result: { en: "5th place", az: "5-ci yer" },
    categoryLabel: { en: "Robotics", az: "Robototexnika" },
    filter: "ROBOTICS",
  },
  {
    id: "wro-virtual-2020",
    year: "2020",
    yearNum: 2020,
    title: { en: "WRO Robot Virtual Games", az: "WRO Robot Virtual Oyunları" },
    event: { en: "WRO Virtual Games 2020", az: "WRO Virtual Oyunlar 2020" },
    result: { en: "Finalist", az: "Finalçı" },
    categoryLabel: { en: "Robotics", az: "Robototexnika" },
    filter: "ROBOTICS",
  },
  {
    id: "eu4climate-2020",
    year: "2020",
    yearNum: 2020,
    title: { en: "EU4Climate “Özün yarat” — fabric category", az: "EU4Climate “Özün yarat” — parça kateqoriyası" },
    event: { en: "EU4Climate 2020", az: "EU4Climate 2020" },
    result: { en: "1st place", az: "1-ci yer" },
    categoryLabel: { en: "Innovation", az: "İnnovasiya" },
    filter: "SCIENCE",
  },
  {
    id: "robocross-2020",
    year: "2020",
    yearNum: 2020,
    title: { en: "RoboCross Online Challenge", az: "RoboCross Onlayn Çağırışı" },
    event: { en: "RoboCross 2020", az: "RoboCross 2020" },
    result: { en: "World 2nd place", az: "Dünya 2-cisi" },
    categoryLabel: { en: "Robotics", az: "Robototexnika" },
    filter: "ROBOTICS",
  },
];

export interface Project {
  slug: string;
  index: string;
  title: Record<Lang, string>;
  subtitle: Record<Lang, string>;
  context: Record<Lang, string>;
  role: Record<Lang, string>;
  tech: string[];
  result: Record<Lang, string>;
  body: Record<Lang, string>;
}

export const projects: Project[] = [
  {
    slug: "rescue-bag-saf-2023",
    index: "01",
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
    index: "02",
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
    index: "03",
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
    index: "04",
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
    index: "05",
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
    index: "06",
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
