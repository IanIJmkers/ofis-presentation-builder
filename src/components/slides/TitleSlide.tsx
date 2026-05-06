import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';
import { DEFAULT_LOGO_WHITE } from '../../brand/assets';

export default function TitleSlide({ slide, brand, editable, onChange }: SlideTemplateProps) {
  const f = slide.fields;
  const logoSrc = brand.logoWhiteDataUrl ?? DEFAULT_LOGO_WHITE;
  return (
    <>
      <SlideChrome
        brand={brand}
        variant="dark"
        showTopBar={false}
        showBottomBar={false}
        showSlideNumber={false}
        showLogo={false}
      />
      <div className="deco-line" />
      <img
        className="title-logo"
        src={logoSrc}
        alt={brand.logoText}
        style={{
          height: typeof f.logoHeight === 'number' ? f.logoHeight : undefined,
          maxWidth: typeof f.logoMaxWidth === 'number' ? `${f.logoMaxWidth}%` : undefined,
        }}
      />
      <Editable
        as="p"
        className="title-subtitle"
        value={f.subtitle ?? ''}
        onChange={(v) => onChange('subtitle', v)}
        editable={editable}
        multiline
      />
      <Editable
        as="div"
        className="title-footer"
        value={f.footer ?? ''}
        onChange={(v) => onChange('footer', v)}
        editable={editable}
      />
    </>
  );
}
