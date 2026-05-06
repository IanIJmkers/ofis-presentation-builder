import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';

export default function DividerLightSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  return (
    <>
      <SlideChrome brand={brand} slideNumber={slideNumber} showTopBar={false} showBottomBar={false} />
      <Editable
        as="div"
        className="divider-label"
        value={f.label ?? ''}
        onChange={(v) => onChange('label', v)}
        editable={editable}
      />
      <div className="divider-line" />
      <Editable
        as="h2"
        value={f.h2 ?? ''}
        onChange={(v) => onChange('h2', v)}
        editable={editable}
        multiline
      />
    </>
  );
}
