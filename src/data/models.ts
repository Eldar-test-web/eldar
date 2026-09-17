// 3D Design Lab catalogue — EDIT HERE.
// modelPath points at an optional GLB in /public/models/. If the file is
// missing, the viewer renders a built-in procedural interpretation instead
// (clearly labelled as a concept, never as the exact physical build).

export interface LabModel {
  id: "airo-speedboat" | "manly-balzer" | "aqua-fly";
  index: string;
  title: string;
  subtitle: string;
  description: string;
  descriptionAz: string;
  modelPath: string;
  specs: { k: string; v: string }[];
  disclaimer?: string;
}

export const LAB_MODELS: LabModel[] = [
  {
    id: "airo-speedboat",
    index: "01",
    title: "AIRO 2026 — Performance Hull",
    subtitle: "Azerbaijan International Robotics Olympiad · 2nd Place",
    description:
      "High-performance speedboat study: planing hull, deck, cockpit and propulsion block. Interactive concept / 3D interpretation inspired by the engineering theme of the competition — not the exact competition-winning physical design.",
    descriptionAz:
      "Yüksək sürətli kater tədqiqatı: gövdə, göyərtə, kokpit və hərəkət bloku. Müsabiqənin mühəndislik mövzusundan ilhamlanan interaktiv konsept / 3D interpretasiya — dəqiq müsabiqə modeli deyil.",
    modelPath: "/models/airo-speedboat.glb",
    specs: [
      { k: "Type", v: "Planing monohull concept" },
      { k: "Presentation", v: "Studio + waterline" },
      { k: "Controls", v: "Rotate · Zoom · Pan" },
    ],
    disclaimer:
      "Interactive concept / 3D interpretation inspired by the engineering theme of the competition.",
  },
  {
    id: "manly-balzer",
    index: "02",
    title: "Early Aviation Engineering — 1903",
    subtitle: "Langley–Manly–Balzer radial · 5-cylinder reference study",
    description:
      "Digital-museum study of the five-cylinder water-cooled radial associated with Langley's Aerodrome (approx. 52.4 hp at 950 rpm). Reconstructed from public historical references incl. the Smithsonian NASM collection — solid, cutaway and transparent modes for close inspection.",
    descriptionAz:
      "Langley Aerodromu ilə bağlı beş silindrli, su ilə soyudulan radial mühərrikin rəqəmsal-muzey tədqiqatı (təxminən 52,4 a.g., 950 rpm). Açıq tarixi mənbələr əsasında rekonstruksiya — bərk, kəsik və şəffaf rejimlər.",
    modelPath: "/models/manly-balzer.glb",
    specs: [
      { k: "Layout", v: "5-cylinder radial" },
      { k: "Cooling", v: "Water-cooled (reference)" },
      { k: "Output", v: "≈ 52.4 hp @ 950 rpm" },
    ],
  },
  {
    id: "aqua-fly",
    index: "03",
    title: "Aqua Fly — Rescue Drone",
    subtitle: "Smart water-rescue concept · hexagonal airframe",
    description:
      "Interactive version of the Aqua Fly concept: hexagonal airframe, six-arm lift system, water-rescue configuration with flotation and detection payload. Concept visualisation connected to the portfolio project — see aquafly-29.github.io/aqua-fly for the project site.",
    descriptionAz:
      "Aqua Fly konseptinin interaktiv versiyası: altıbucaqlı gövdə, altı qollu qaldırma sistemi, üzmə və aşkarlama yükü ilə su-xilasetmə konfiqurasiyası.",
    modelPath: "/models/aqua-fly.glb",
    specs: [
      { k: "Airframe", v: "Hexagonal, 6 arms" },
      { k: "Role", v: "Water-rescue concept" },
      { k: "Power", v: "Solar-assisted concept" },
    ],
  },
];
