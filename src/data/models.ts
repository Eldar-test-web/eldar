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
      "Eldar's BOAT V4 CAD assembly (10 parts) — bow and stern hull sections, deck cover, twin motors, steering servo with gears, and mounting hardware. Shown exactly as modeled; rotate and inspect from every side, with wireframe and transparent modes.",
    descriptionAz:
      "Eldarın BOAT V4 CAD yığımı (10 detal) — burun və arxa gövdə hissələri, göyərtə qapağı, qoşa mühərrik, dişlili sükan servosu və bərkitmə detalları. Modelləşdirildiyi kimi göstərilir; hər tərəfdən döndərib yoxlayın, karkas və şəffaf rejimlərlə.",
    modelPath: "/models/airo-speedboat.glb",
    specs: [
      { k: "Type", v: "BOAT V4 CAD assembly · 10 parts" },
      { k: "Presentation", v: "Studio + waterline" },
      { k: "Controls", v: "Rotate · Zoom · Pan" },
    ],
    disclaimer:
      "Eldar's BOAT V4 CAD assembly — real modeled geometry, shown as designed.",
  },
  {
    id: "manly-balzer",
    index: "02",
    title: "Early Aviation Engineering — 1903",
    subtitle: "Langley–Manly–Balzer radial · 5-cylinder reference study",
    description:
      "Five-cylinder radial reconstructed by Eldar in FreeCAD (56 parts) — crankcase, finned cylinders, propeller hub — presented as a digital-museum study next to its historical reference, the Langley–Manly–Balzer radial (≈ 52.4 hp at 950 rpm, Smithsonian NASM collection). Rotate, zoom and inspect from every side; wireframe and transparent modes included.",
    descriptionAz:
      "Eldarın FreeCAD-də yığdığı beş silindrli radial rekonstruksiya (56 detal) — karter, qanadlı silindrlər, pər hubu — tarixi istinadı Langley–Manly–Balzer mühərriki ilə yanaşı rəqəmsal-muzey tədqiqatı kimi (≈ 52,4 a.g., 950 rpm, Smithsonian NASM kolleksiyası). Hər tərəfdən döndərin və yoxlayın; karkas və şəffaf rejimlər daxildir.",
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
      "Eldar's drone CAD assembly (6 parts) — four corner lift modules, central frame and lower unit. Shown exactly as modeled; rotate and inspect from every side, with wireframe and transparent modes. Concept visualisation connected to the portfolio project — see aquafly-29.github.io/aqua-fly for the project site.",
    descriptionAz:
      "Eldarın dron CAD yığımı (6 detal) — dörd künc qaldırma modulu, mərkəzi çərçivə və alt blok. Modelləşdirildiyi kimi göstərilir; hər tərəfdən döndərib yoxlayın, karkas və şəffaf rejimlərlə.",
    modelPath: "/models/aqua-fly.glb",
    specs: [
      { k: "Airframe", v: "4 corner lift modules + central frame" },
      { k: "Role", v: "Water-rescue concept" },
      { k: "Power", v: "Solar-assisted concept" },
    ],
  },
];
