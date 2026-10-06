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
    captionEn: "WakeWell wrist unit, concept render. Hardware prototype photos will be added when available.",
    captionAz: "WakeWell bilək qurğusu, konsept render. Aparat prototipinin fotoları mövcud olduqda əlavə ediləcək.",
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
};

// Portrait and workshop action shots (profile photo, CAD work, PCB work,
// jury photo, watch photos, motor assembly) are intentionally absent here:
// the source files could not be matched to verified filenames. Add them as
// new entries with exact captions once the files are confirmed.
