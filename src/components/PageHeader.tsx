import { Reveal } from "./Reveal";

export function PageHeader({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  meta?: string[];
}) {
  return (
    <section className="page-head" aria-label={eyebrow}>
      <Reveal>
        <p className="eyebrow">
          <span className="eyebrow-rule" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="h-display">{title}</h1>
      </Reveal>
      <div className="page-head-grid">
        <Reveal delay={140}>
          <p className="lede">{lede}</p>
        </Reveal>
        {meta && meta.length > 0 ? (
          <Reveal delay={200} as="div">
            <dl className="head-meta-list">
              {meta.map((m, i) => (
                <div key={i}>
                  <dt>{String(i + 1).padStart(2, "0")}</dt>
                  <dd>{m}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  title,
  text,
}: {
  index: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="block-head">
      <div>
        <Reveal>
          <p className="block-num">{index}</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="h2">{title}</h2>
        </Reveal>
      </div>
      {text ? (
        <Reveal delay={120}>
          <p className="block-side">{text}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
