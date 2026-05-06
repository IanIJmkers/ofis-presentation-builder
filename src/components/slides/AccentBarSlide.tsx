import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';

export default function AccentBarSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  const variant = slide.variant ?? 'gold';
  return (
    <>
      <SlideChrome brand={brand} slideNumber={slideNumber} />
      <div className="accent-layout">
        <div className="accent-layout-body">
          <Editable
            as="h2"
            value={f.h2 ?? ''}
            onChange={(v) => onChange('h2', v)}
            editable={editable}
            multiline
          />
          <div className="accent-line" />
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
        </div>
        <div className={`accent-bar accent-bar--${variant}`} />
      </div>
    </>
  );
}
