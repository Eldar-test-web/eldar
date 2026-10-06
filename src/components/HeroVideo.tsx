"use client";

import { useReducedMotion } from "motion/react";
import { MEDIA } from "@/data/media";
import { assetUrl } from "@/lib/asset";
import type { Lang } from "@/lib/i18n";

/* Hero background film. Motion only with full motion: under reduced
   motion a real still frame renders instead, with identical framing. */
export function HeroVideo({ lang }: { lang: Lang }) {
  const reduce = useReducedMotion();
  const m = MEDIA.droneConceptVideo;
  const alt = lang === "az" ? m.altAz : m.altEn;
  if (reduce) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="hero-media"
        src={assetUrl("/media/airo-drone-assembly.jpg")}
        alt={alt}
        width={1921}
        height={906}
        fetchPriority="high"
      />
    );
  }
  return (
    <video
      className="hero-media"
      ref={(el) => {
        if (el) el.muted = true;
      }}
      src={assetUrl(m.src)}
      aria-label={alt}
      autoPlay
      loop
      playsInline
      preload="metadata"
      poster={assetUrl("/media/airo-drone-assembly.jpg")}
    />
  );
}
