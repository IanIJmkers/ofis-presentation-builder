import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';
import { pickImage } from '../../utils/imageUpload';

export default function ImageBleedSlide({
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
        <div className="img-container">
          {f.imageDataUrl ? (
            <img
              src={f.imageDataUrl}
              alt=""
              style={{
                objectFit: f.imageObjectFit ?? 'contain',
                transform: `translate(${f.imageOffsetX ?? 0}px, ${f.imageOffsetY ?? 0}px) scale(${f.imageScale ?? 1})`,
                transformOrigin: 'center',
              }}
            />
          ) : editable ? (
            <button
              onClick={async (e) => {
                e.stopPropagation();
                try {
                  const { src } = await pickImage();
                  onChange('imageDataUrl', src);
                } catch {
                  /* user cancelled */
                }
              }}
              style={{
                padding: '60px 80px',
                background: 'var(--grey-light)',
                border: '2px dashed var(--grey-medium)',
                color: 'var(--text-grey)',
                fontSize: '1.1rem',
              }}
            >
              + Klik om afbeelding te uploaden
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
