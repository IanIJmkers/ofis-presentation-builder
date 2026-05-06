import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';

export default function DividerDarkSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  return (
    <>
      <SlideChrome
        brand={brand}
        slideNumber={slideNumber}
        variant="dark"
        showTopBar={false}
        showBottomBar={false}
      />
      <Editable
        as="h2"
        value={f.h2 ?? ''}
        onChange={(v) => onChange('h2', v)}
        editable={editable}
      />
      <div className="accent-line" />
      <Editable
        as="div"
        className="big-statement"
        value={f.bigStatement ?? ''}
        onChange={(v) => onChange('bigStatement', v)}
        editable={editable}
        multiline
      />
    </>
  );
}
