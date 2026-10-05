// Ask Eldar — on-device knowledge base built only from verified portfolio data.
// Records carry both languages; retrieval scores title matches above body
// matches. Nothing here is generated: every string comes from the data files.

import { PROFILE } from "@/data/profile";
import { projects, achievements } from "@/lib/content";
import { LAB_MODELS } from "@/data/models";
import type { Lang } from "@/lib/i18n";

export interface KBRecord {
  id: string;
  kind: "project" | "achievement" | "profile" | "skill" | "model" | "contact";
  title: Record<Lang, string>;
  text: Record<Lang, string>;
  /** language-neutral route suffix, e.g. "/projects/wakewell" */
  route: string;
}

const kindLabel: Record<KBRecord["kind"], Record<Lang, string>> = {
  project: { en: "Project", az: "Layihə" },
  achievement: { en: "Achievement", az: "Nailiyyət" },
  profile: { en: "Profile", az: "Profil" },
  skill: { en: "Skill", az: "Bacarıq" },
  model: { en: "3D model", az: "3D model" },
  contact: { en: "Contact", az: "Əlaqə" },
};

export function kindName(kind: KBRecord["kind"], lang: Lang) {
  return kindLabel[kind][lang];
}

export function buildKnowledge(): KBRecord[] {
  const recs: KBRecord[] = [];

  recs.push({
    id: "profile-who",
    kind: "profile",
    title: { en: "Eldar Hamidov", az: "Eldar Həmidov" },
    text: {
      en: `${PROFILE.name} from ${PROFILE.location}. ${PROFILE.supporting} Robotics, AI, cybersecurity, mechanical CAD.`,
      az: `${PROFILE.location} sakini ${PROFILE.name}. ${PROFILE.supporting} Robototexnika, AI, kibertəhlükəsizlik, mexaniki CAD.`,
    },
    route: "/about",
  });

  for (const e of PROFILE.education) {
    recs.push({
      id: `edu-${e.years}`,
      kind: "profile",
      title: { en: `Education — ${e.schoolEn}`, az: `Təhsil — ${e.school}` },
      text: {
        en: `${e.schoolEn}, ${e.years}.`,
        az: `${e.school}, ${e.years}.`,
      },
      route: "/about",
    });
  }

  for (const g of PROFILE.skillGroups) {
    recs.push({
      id: `skill-${g.group}`,
      kind: "skill",
      title: { en: g.group, az: g.group },
      text: { en: g.items.join(", "), az: g.items.join(", ") },
      route: "/skills",
    });
  }

  for (const p of projects) {
    const secs = (p.sections ?? []).map((s) => `${s.h.en}. ${s.p.en}`).join(" ");
    const secsAz = (p.sections ?? []).map((s) => `${s.h.az}. ${s.p.az}`).join(" ");
    recs.push({
      id: `project-${p.slug}`,
      kind: "project",
      title: p.title,
      text: {
        en: `${p.subtitle.en}. ${p.body.en} Role: ${p.role.en}. Result: ${p.result.en}. Technologies: ${p.tech.join(", ")}. ${secs}`,
        az: `${p.subtitle.az}. ${p.body.az} Rol: ${p.role.az}. Nəticə: ${p.result.az}. Texnologiyalar: ${p.tech.join(", ")}. ${secsAz}`,
      },
      route: `/projects/${p.slug}`,
    });
  }

  for (const a of achievements) {
    recs.push({
      id: `ach-${a.id}`,
      kind: "achievement",
      title: a.title,
      text: {
        en: `${a.event.en}, ${a.year}. Result: ${a.result.en}. ${a.note?.en ?? ""}`,
        az: `${a.event.az}, ${a.year}. Nəticə: ${a.result.az}. ${a.note?.az ?? ""}`,
      },
      route: "/achievements",
    });
  }

  for (const m of LAB_MODELS) {
    recs.push({
      id: `model-${m.id}`,
      kind: "model",
      title: { en: m.title, az: m.title },
      text: {
        en: `${m.subtitle}. ${m.description} Parts: ${m.parts.map((x) => x.label).join(", ")}.`,
        az: `${m.subtitle}. ${m.descriptionAz} Detallar: ${m.parts.map((x) => x.labelAz).join(", ")}.`,
      },
      route: `/lab/${m.id}`,
    });
  }

  recs.push({
    id: "contact",
    kind: "contact",
    title: { en: "Contact Eldar", az: "Eldar ilə əlaqə" },
    text: {
      en: "Academic, competition and collaboration inquiries through WhatsApp or email, listed on the contact page.",
      az: "Akademik, müsabiqə və əməkdaşlıq sorğuları üçün WhatsApp və ya e-poçt — əlaqə səhifəsində.",
    },
    route: "/contact",
  });

  return recs;
}

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9əğıöüçş]+/i)
    .filter((w) => w.length > 2);
}

export function detectLang(q: string): Lang {
  if (/[əğıöüçş]/i.test(q)) return "az";
  if (/\b(v[əe]|il[əe]|üçün|haqqında|n[əe]|nec[əe]|hans[ıi]|kimdir|nədir|layih[əe]|model)\b/i.test(q)) return "az";
  return "en";
}

/** Ranked retrieval over the knowledge base. Title hits weigh 3x body hits. */
export function retrieve(recs: KBRecord[], query: string, lang: Lang, top = 3) {
  const qt = new Set(tokenize(query));
  if (qt.size === 0) return [];
  const scored = recs
    .map((r) => {
      const title = new Set(tokenize(r.title[lang]));
      const body = tokenize(r.text[lang]);
      let score = 0;
      for (const w of qt) {
        if (title.has(w)) score += 3;
        else {
          let hits = 0;
          for (const b of body) if (b === w || (b.length > 4 && w.length > 4 && (b.includes(w) || w.includes(b)))) hits++;
          score += Math.min(hits, 3);
        }
      }
      return { r, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, top);
  return scored;
}
