import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';

export default function TwoColSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
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
        <div className="two-col">
          <div>
            <Editable
              as="h3"
              value={f.leftTitle ?? ''}
              onChange={(v) => onChange('leftTitle', v)}
              editable={editable}
            />
            <Editable
              as="p"
              value={f.leftBody ?? ''}
              onChange={(v) => onChange('leftBody', v)}
              editable={editable}
              multiline
            />
          </div>
          <div>
            <Editable
              as="h3"
              value={f.rightTitle ?? ''}
              onChange={(v) => onChange('rightTitle', v)}
              editable={editable}
            />
            <Editable
              as="p"
              value={f.rightBody ?? ''}
              onChange={(v) => onChange('rightBody', v)}
              editable={editable}
              multiline
            />
          </div>
        </div>
      </div>
    </>
  );
}
