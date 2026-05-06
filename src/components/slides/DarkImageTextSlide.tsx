import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';
import { pickImage } from '../../utils/imageUpload';

function bgSizeStyle(mode: 'cover' | 'contain', scale: number): string {
  if (scale === 1) return mode;
  // Scale acts as a multiplier on the chosen base mode. At scale=1 we use the
  // keyword so behaviour matches the CSS-default rendering exactly; for any
  // other scale we fall back to a percentage (width-based) which still respects
  // aspect ratio because backgroundSize takes a single value.
  return `${Math.round(scale * 100)}%`;
}

export default function DarkImageTextSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  return (
    <>
      <div
        className="dark-bg"
        style={
          f.bgImageDataUrl
            ? {
                backgroundImage: `url(${f.bgImageDataUrl})`,
                backgroundSize: bgSizeStyle(f.bgSize ?? 'cover', f.bgScale ?? 1),
                backgroundPosition: `${f.bgPositionX ?? 50}% ${f.bgPositionY ?? 50}%`,
                backgroundRepeat: 'no-repeat',
              }
            : { background: '#1a3050' }
        }
      />
      <div className="dark-overlay" />
      <SlideChrome brand={brand} slideNumber={slideNumber} variant="dark" showTopBar={false} showBottomBar={false} />
      <div className="content-wrap">
        <Editable as="h2" value={f.h2 ?? ''} onChange={(v) => onChange('h2', v)} editable={editable} />
        <div className="accent-line" style={{ width: 100, height: 4 }} />
        <Editable
          as="p"
          value={f.body ?? ''}
          onChange={(v) => onChange('body', v)}
          editable={editable}
          multiline
        />
        {editable ? (
          <button
            onClick={async (e) => {
              e.stopPropagation();
              try {
                const { src } = await pickImage();
                onChange('bgImageDataUrl', src);
              } catch {
                /* cancelled */
              }
            }}
            style={{
              marginTop: 24,
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.15)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.4)',
              alignSelf: 'flex-start',
            }}
          >
            {f.bgImageDataUrl ? 'Achtergrond vervangen' : '+ Achtergrondafbeelding'}
          </button>
        ) : null}
      </div>
    </>
  );
}
