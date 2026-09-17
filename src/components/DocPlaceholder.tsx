import { IconDoc } from "./icons";

export function DocPlaceholder({
  id,
  label,
  caption,
}: {
  id: string;
  label: string;
  caption?: string;
}) {
  return (
    <figure className="doc-fig" aria-label={label}>
      <div className="doc-frame" role="img" aria-label={`${id} — ${label}`}>
        <span className="doc-ticks" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="doc-grid" aria-hidden="true" />
        <span className="doc-center">
          <IconDoc size={28} />
          <strong>{id}</strong>
          <small>{label}</small>
        </span>
        <span className="doc-scale" aria-hidden="true">
          0 ——— 10 ——— 20 ——— 30 mm
        </span>
      </div>
      {caption ? (
        <figcaption className="caption">
          <span>{caption}</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
