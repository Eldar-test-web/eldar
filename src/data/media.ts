// Real project media manifest. EDIT HERE when new verified files land.
// RULES: every entry must be authentic project material. Never use stock,
// AI-generated people, or unrelated hardware to represent real work.
// - src: absolute public path under /public/media
// - captions state exactly what the file shows, nothing more.
// Files whose content could not be verified are NOT listed here.

export interface MediaItem {
  src: string;
  width: number;
  height: number;
  altEn: string;
  altAz: string;
  captionEn: string;
  captionAz: string;
}

export const MEDIA: Record<string, MediaItem> = {
  droneAssembly: {
    src: "/media/airo-drone-assembly.jpg",
    width: 1921,
    height: 906,
    altEn: "AIRO 2026 rescue drone assembly shown in CAD",
    altAz: "AIRO 2026 xilasetmə dronunun CAD görünüşündə yığımı",
    captionEn: "AIRO 2026 rescue drone, assembly modelled in SolidWorks.",
    captionAz: "AIRO 2026 xilasetmə dronu, SolidWorks-də modellənmiş yığım.",
  },
  aquaFlyPoster: {
    src: "/media/aquafly-poster.jpg",
    width: 1400,
    height: 1083,
    altEn: "Aqua Fly project poster",
    altAz: "Aqua Fly layihə posteri",
    captionEn: "Aqua Fly project poster, prepared for competition presentation.",
    captionAz: "Aqua Fly layihə posteri, müsabiqə təqdimatı üçün hazırlanıb.",
  },
  wakewellPoster: {
    src: "/media/wakewell-poster.jpg",
    width: 1200,
    height: 1600,
    altEn: "WakeWell project poster",
    altAz: "WakeWell layihə posteri",
    captionEn: "WakeWell project poster from the public project site material.",
    captionAz: "Açıq layihə saytının materiallarından WakeWell posteri.",
  },
  wakewellRender: {
    src: "/media/wakewell-product.jpg",
    width: 1000,
    height: 1000,
    altEn: "WakeWell wrist unit concept render",
    altAz: "WakeWell bilək qurğusunun konsept renderi",
    captionEn: "WakeWell wrist unit, concept render.",
    captionAz: "WakeWell bilək qurğusu, konsept render.",
  },
  droneConceptVideo: {
    src: "/media/airo-drone.mp4",
    width: 0,
    height: 0,
    altEn: "AI-assisted concept visualization of the AIRO drone",
    altAz: "AIRO dronunun süni intellektlə hazırlanmış konsept vizuallaşdırması",
    captionEn: "AI-assisted concept visualization. Not flight footage.",
    captionAz: "Süni intellektlə hazırlanmış konsept vizuallaşdırma. Uçuş görüntüsü deyil.",
  },
  portrait: {
    src: "/media/eldar-portrait.jpg",
    width: 960,
    height: 1280,
    altEn: "Portrait of Eldar Hamidov",
    altAz: "Eldar Həmidovun portreti",
    captionEn: "Eldar Hamidov, Sumgait, Azerbaijan.",
    captionAz: "Eldar Həmidov, Sumqayıt, Azərbaycan.",
  },
  cadWork: {
    src: "/media/eldar-cad-work.jpg",
    width: 960,
    height: 1280,
    altEn: "Eldar modelling the AIRO 2026 drone frame in SolidWorks",
    altAz: "Eldar AIRO 2026 dron gövdəsini SolidWorks-də modelləyir",
    captionEn: "Modelling the AIRO 2026 drone frame in SolidWorks.",
    captionAz: "AIRO 2026 dron gövdəsinin SolidWorks-də modellənməsi.",
  },
  soldering: {
    src: "/media/eldar-soldering.jpg",
    width: 1400,
    height: 787,
    altEn: "Eldar soldering the drone power electronics",
    altAz: "Eldar dron güc elektronikasını lehimləyir",
    captionEn: "Soldering the drone power distribution and motor wiring.",
    captionAz: "Dron güc paylanması və motor naqillərinin lehimlənməsi.",
  },
  jury: {
    src: "/media/airo-jury.jpg",
    width: 900,
    height: 1600,
    altEn: "AIRO 2026 second place with members of the international jury",
    altAz: "AIRO 2026 ikinci yer, beynəlxalq münsiflərlə",
    captionEn: "AIRO 2026, second place, with members of the international jury.",
    captionAz: "AIRO 2026, ikinci yer, beynəlxalq münsiflərlə.",
  },
  wakewellWatch: {
    src: "/media/wakewell-watch.jpg",
    width: 1200,
    height: 1209,
    altEn: "WakeWell wrist unit prototype",
    altAz: "WakeWell bilək qurğusunun prototipi",
    captionEn: "WakeWell wrist unit prototype hardware.",
    captionAz: "WakeWell bilək qurğusunun prototip aparatı.",
  },
  motorAssembly: {
    src: "/media/motor-assembly.jpg",
    width: 1400,
    height: 790,
    altEn: "Eldar assembling the 3D-printed five-cylinder radial engine",
    altAz: "Eldar 3D çap olunmuş beşsilindrli radial mühərriki yığır",
    captionEn: "Assembling the 3D-printed five-cylinder radial engine at the competition.",
    captionAz: "Müsabiqədə 3D çap olunmuş beşsilindrli radial mühərrikin yığılması.",
  },
};

// Portrait and workshop action shots (profile photo, CAD work, PCB work,
// jury photo, watch photos, motor assembly) are intentionally absent here:
// the source files could not be matched to verified filenames. Add them as
// new entries with exact captions once the files are confirmed.
