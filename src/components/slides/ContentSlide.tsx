import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';

export default function ContentSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  const bullets: string[] = Array.isArray(f.bullets) ? f.bullets : [];

  return (
    <>
      <SlideChrome brand={brand} slideNumber={slideNumber} />
      <div className="content-wrap">
        <Editable as="h2" value={f.h2 ?? ''} onChange={(v) => onChange('h2', v)} editable={editable} />
        <Editable
          as="span"
          className="subtitle"
          value={f.subtitle ?? ''}
          onChange={(v) => onChange('subtitle', v)}
          editable={editable}
        />
        <Editable
          as="p"
          value={f.body ?? ''}
          onChange={(v) => onChange('body', v)}
          editable={editable}
          multiline
        />
        {bullets.length > 0 ? (
          <ul>
            {bullets.map((b, i) => (
              <Editable
                key={i}
                as="li"
                value={b}
                onChange={(v) => {
                  const next = [...bullets];
                  next[i] = v;
                  onChange('bullets', next);
                }}
                editable={editable}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}
