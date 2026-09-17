import type { Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * FIG.02 — slow-drifting engineering line plate (hull lines plan, concept study).
 * Pure inline SVG + CSS: no images, no JS animation, disabled under
 * prefers-reduced-motion by the global rule. Ink/bronze on paper only.
 */
export function HeroFigure({ lang }: { lang: Lang }) {
  const az = lang === "az";
  return (
    <Reveal>
      <figure className="plate" aria-label={az ? "Gövdə xətləri planı — konsept" : "Hull lines plan — concept study"}>
        <div className="plate-top" aria-hidden="true">
          <span>EH — DWG / 02</span>
          <span>{az ? "miqyas — şərti" : "scale — indicative"}</span>
        </div>
        <svg className="plate-svg" viewBox="0 0 1200 360" role="img"
          aria-label={az ? "Sürət katerinin gövdə xətləri planı" : "Speedboat hull lines plan"}>
          <defs>
            <pattern id="plate-dots" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.2" cy="1.2" r="1.2" className="plate-dot" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1200" height="360" fill="url(#plate-dots)" />
          <g className="plate-drift">
            {/* station lines */}
            {[120, 220, 320, 420, 520, 620, 720, 820, 920, 1020].map((x) => (
              <line key={x} x1={x} y1={40} x2={x} y2={320} className="plate-station" />
            ))}
            {/* waterlines — hull form */}
            <path d="M80,250 C300,238 520,232 760,236 C900,238 1010,220 1100,160" className="plate-line" />
            <path d="M80,268 C300,258 520,252 760,256 C910,258 1020,242 1110,186" className="plate-line" />
            <path d="M80,286 C300,278 520,272 760,276 C920,278 1030,262 1118,210" className="plate-line plate-fade" />
            <path d="M80,304 C300,298 520,292 760,296 C930,298 1040,282 1124,232" className="plate-line plate-fade" />
            {/* sheer line */}
            <path d="M80,120 C340,108 640,104 880,116 C980,121 1050,138 1100,160" className="plate-line strong" />
            {/* centerline */}
            <line x1="60" y1="180" x2="1140" y2="180" className="plate-center plate-draw" />
            {/* bow section circle */}
            <g className="plate-fade">
              <circle cx="1010" cy="252" r="52" className="plate-line" />
              <circle cx="1010" cy="252" r="30" className="plate-line" />
              <line x1="1010" y1="200" x2="1010" y2="304" className="plate-station" />
              <line x1="958" y1="252" x2="1062" y2="252" className="plate-station" />
            </g>
            {/* dimension — length */}
            <g className="plate-dim">
              <line x1="80" y1="58" x2="1100" y2="58" />
              <line x1="80" y1="52" x2="80" y2="64" />
              <line x1="1100" y1="52" x2="1100" y2="64" />
            </g>
          </g>
          {/* dimension labels (static, readable) */}
          <text x="590" y="46" textAnchor="middle" className="plate-text">
            {az ? "L.O.A — 4,2 m (konsept)" : "L.O.A — 4.2 m (concept)"}
          </text>
          <text x="1010" y="336" textAnchor="middle" className="plate-text">
            {az ? "kəsik A–A" : "section A–A"}
          </text>
        </svg>
        <figcaption className="caption">
          <span>
            <b>FIG.02</b> — {az ? "Gövdə xətləri planı · konsept tədqiqat" : "Hull lines plan · concept study"}
          </span>
          <span>EH</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}
