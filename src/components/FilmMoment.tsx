"use client";

import { useReducedMotion } from "motion/react";
import { MEDIA } from "@/data/media";
import { assetUrl } from "@/lib/asset";
import type { Lang } from "@/lib/i18n";

/* Full-bleed concept film. Autoplay is a privilege of full motion only:
   under reduced motion the film renders paused with controls. */
export function FilmMoment({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const m = MEDIA.droneConceptVideo;
  const caption = lang === "az" ? m.captionAz : m.captionEn;
  const alt = lang === "az" ? m.altAz : m.altEn;
  return (
    <div className="film-frame">
      <video
        ref={(el) => {
          if (el && !reduce) el.muted = true;
        }}
        src={assetUrl(m.src)}
        aria-label={alt}
        autoPlay={!reduce}
        loop
        playsInline
        controls={reduce ?? false}
        preload="metadata"
      />
      <p className="film-cap">
        <span>{caption}</span>
      </p>
    </div>
  );
}
