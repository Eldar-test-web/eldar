// 3D Design Lab catalogue - EDIT HERE.
// Every model is Eldar's real CAD geometry as STL parts in /public/models/.
// Drone lift modules ship once and are instanced 4x at the exact measured
// assembly corners (SolidWorks bboxes), so the render matches the assembly.

export type PartMaterial = "aluminum" | "graphite" | "slate" | "shell" | "steel";

export interface LabPart {
  /** absolute public path, e.g. "/models/drone/motor.stl" */
  path: string;
  label: string;
  labelAz: string;
  /** real file size, measured on disk */
  size: string;
  material: PartMaterial;
}

export interface LabInstance {
  /** index into parts[] */
  part: number;
  /** assembly-space position the part instance sits at */
  at: [number, number, number];
  /** yaw in radians applied after recentering */
  ry?: number;
}

export type LabModelId = "airo-speedboat" | "manly-balzer" | "aqua-fly";

export type LabCategory = "robotics" | "mechanical" | "marine";

export interface LabModel {
  id: LabModelId;
  index: string;
  category: LabCategory;
  title: string;
  subtitle: string;
  description: string;
  descriptionAz: string;
  /** optional still image shown while the 3D loads / on the slide */
  poster?: string;
  posterAlt?: string;
  posterAltAz?: string;
  parts: LabPart[];
  /** extra placements of parts[] entries (e.g. repeated motor modules) */
  instances?: LabInstance[];
  /** assembly-space point the instanced geometry is recentered around */
  instancePivot?: [number, number, number];
  specs: { k: string; v: string }[];
  disclaimer?: string;
}

export const LAB_MODELS: LabModel[] = [
  {
    id: "airo-speedboat",
    index: "01",
    category: "marine",
    title: "BOAT V4 - RC Hull Assembly",
    subtitle: "10-part CAD assembly, bow, stern, motors, servo",
    description:
      "Eldar's BOAT V4 hull assembly exactly as modeled: bow and stern sections, connecting rod, deck cover, twin CFMX motors, steering servo with gear, and mounting screw. Drag to spin, open fullscreen to inspect, download any part as STL.",
    descriptionAz:
      "Eldarın BOAT V4 gövdə yığımı modelləşdirildiyi kimi: burun və arxa hissələr, birləşdirici mil, göyərtə qapağı, qoşa CFMX mühərriki, dişlili sükan servosu və bərkitmə vinti. Döndərmək üçün sürükləyin, tam ekranda açın, istənilən detalı STL kimi endirin.",
    parts: [
      { path: "/models/boat/bow.stl", label: "Bow hull", labelAz: "Burun gövdəsi", size: "0.4 MB", material: "shell" },
      { path: "/models/boat/stern.stl", label: "Stern hull", labelAz: "Arxa gövdə", size: "0.4 MB", material: "shell" },
      { path: "/models/boat/rod.stl", label: "Stern rod", labelAz: "Arxa mil", size: "0.05 MB", material: "aluminum" },
      { path: "/models/boat/deck.stl", label: "Deck cover", labelAz: "Göyərtə qapağı", size: "0.1 MB", material: "shell" },
      { path: "/models/boat/motor-a.stl", label: "Motor CFMX, port", labelAz: "CFMX mühərriki, sol", size: "1.7 MB", material: "graphite" },
      { path: "/models/boat/motor-b.stl", label: "Motor CFMX, starboard", labelAz: "CFMX mühərriki, sağ", size: "1.7 MB", material: "graphite" },
      { path: "/models/boat/servo-frame.stl", label: "Servo frame", labelAz: "Servo çərçivəsi", size: "0.2 MB", material: "slate" },
      { path: "/models/boat/servo-body.stl", label: "Servo SPT5435LV", labelAz: "SPT5435LV servosu", size: "2.6 MB", material: "graphite" },
      { path: "/models/boat/gear.stl", label: "Servo gear MG995", labelAz: "MG995 dişlisi", size: "0.1 MB", material: "steel" },
      { path: "/models/boat/screw.stl", label: "Screw M2", labelAz: "M2 vinti", size: "4.3 MB", material: "steel" },
    ],
    specs: [
      { k: "Type", v: "BOAT V4 CAD assembly, 10 parts" },
      { k: "Drive", v: "Twin CFMX motors" },
      { k: "Steering", v: "Servo + gear linkage" },
    ],
    disclaimer: "Eldar's BOAT V4 CAD assembly - real modeled geometry, shown as designed.",
  },
  {
    id: "manly-balzer",
    index: "02",
    category: "mechanical",
    title: "Radial Engine - 5-Cylinder",
    subtitle: "FreeCAD reconstruction, 1903 aviation study",
    description:
      "Five-cylinder radial engine reconstructed by Eldar in FreeCAD (56 parts, single exported mesh): crankcase, finned cylinders, propeller hub. Drag to spin, open fullscreen to inspect, download the mesh as STL.",
    descriptionAz:
      "Eldarın FreeCAD-də rekonstruksiya etdiyi beş silindrli radial mühərrik (56 detal, tək ixrac mesh): karter, qanadlı silindrlər, pər hubu. Döndərmək üçün sürükləyin, tam ekranda açın, mesh-i STL kimi endirin.",
    parts: [
      { path: "/models/engine/engine.stl", label: "Engine assembly mesh", labelAz: "Mühərrik yığım mesh-i", size: "9.4 MB", material: "graphite" },
    ],
    specs: [
      { k: "Layout", v: "5-cylinder radial" },
      { k: "Source", v: "FreeCAD, 56 parts" },
      { k: "Reference", v: "1903 aviation radial study" },
    ],
  },
  {
    id: "aqua-fly",
    index: "03",
    category: "robotics",
    title: "Aqua Fly - Rescue Drone",
    subtitle: "AIRO 2026, 2nd place, quad lift assembly",
    description:
      "Eldar's AIRO 2026 second-place rescue drone exactly as modeled: four corner lift modules on a central frame with a lower rescue unit. The module mesh ships once and is placed at all four measured corners. Drag to spin, open fullscreen, download parts as STL.",
    descriptionAz:
      "Eldarın AIRO 2026-da ikinci yer tutmuş xilasetmə dronu modelləşdirildiyi kimi: mərkəzi çərçivədə dörd künc qaldırma modulu və alt xilasetmə bloku. Modul mesh-i bir dəfə yüklənib dörd ölçülmüş küncə yerləşdirilir. Döndərin, tam ekranda açın, detalları STL kimi endirin.",
    poster: "/models/drone/poster.jpg",
    posterAlt: "SolidWorks render of the Aqua Fly quadcopter drone",
    posterAltAz: "Aqua Fly kvadrokopter dronunun SolidWorks renderi",
    parts: [
      { path: "/models/drone/motor.stl", label: "Lift module ×4", labelAz: "Qaldırma modulu ×4", size: "13.5 MB", material: "graphite" },
      { path: "/models/drone/frame.stl", label: "Central frame", labelAz: "Mərkəzi çərçivə", size: "0.7 MB", material: "aluminum" },
      { path: "/models/drone/lower.stl", label: "Rescue lower unit", labelAz: "Alt xilasetmə bloku", size: "1.9 MB", material: "slate" },
    ],
    // Measured SolidWorks bboxes: modules sit at these assembly-space corners.
    instancePivot: [341.15, 101.9, 270.75],
    instances: [
      { part: 0, at: [341.15, 101.9, 270.75] },
      { part: 0, at: [334.0, 101.9, 96.0] },
      { part: 0, at: [89.0, 101.9, 96.0] },
      { part: 0, at: [89.0, 101.9, 278.0] },
    ],
    specs: [
      { k: "Airframe", v: "4 lift modules + central frame" },
      { k: "Result", v: "AIRO 2026, 2nd place" },
      { k: "Role", v: "Water-rescue concept" },
    ],
  },
];
