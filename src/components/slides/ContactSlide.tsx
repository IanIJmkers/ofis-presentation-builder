import Editable from './Editable';
import type { SlideTemplateProps } from './types';
import { DEFAULT_LOGO_DARK } from '../../brand/assets';

export default function ContactSlide({ slide, brand, editable, onChange }: SlideTemplateProps) {
  const f = slide.fields;
  const address: string[] = Array.isArray(f.address) ? f.address : [];
  const logoSrc = brand.logoDataUrl ?? DEFAULT_LOGO_DARK;

  return (
    <>
      <div className="top-bar" />
      <div className="bottom-bar" />
      <div className="contact-layout">
        <div className="contact-logo">
          <img
            src={logoSrc}
            alt={brand.logoText}
            style={{
              height: typeof f.logoHeight === 'number' ? f.logoHeight : undefined,
              maxWidth: typeof f.logoMaxWidth === 'number' ? f.logoMaxWidth : undefined,
              maxHeight: 'none',
            }}
          />
        </div>
        <div className="contact-divider" />
        <div className="contact-details">
          {address.map((line, i) => (
            <Editable
              key={i}
              as="p"
              value={line}
              onChange={(v) => {
                const next = [...address];
                next[i] = v;
                onChange('address', next);
              }}
              editable={editable}
            />
          ))}
          <Editable
            as="p"
            className="contact-light"
            value={f.phone ?? ''}
            onChange={(v) => onChange('phone', v)}
            editable={editable}
          />
          <p>
            {editable ? (
              <Editable
                as="span"
                value={f.website ?? ''}
                onChange={(v) => onChange('website', v)}
                editable={editable}
              />
            ) : (
              <a href={f.websiteUrl ?? '#'}>{f.website}</a>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
