import Editable from './Editable';
import type { SlideTemplateProps } from './types';

export default function ContactSlide({ slide, brand, editable, onChange }: SlideTemplateProps) {
  const f = slide.fields;
  const address: string[] = Array.isArray(f.address) ? f.address : [];

  return (
    <>
      <div className="top-bar" />
      <div className="bottom-bar" />
      <div className="contact-layout">
        <div className="contact-logo">
          {brand.logoDataUrl ? (
            <img
              src={brand.logoDataUrl}
              alt={brand.logoText}
              style={{
                height: typeof f.logoHeight === 'number' ? f.logoHeight : undefined,
                maxWidth: typeof f.logoMaxWidth === 'number' ? f.logoMaxWidth : undefined,
                maxHeight: 'none',
              }}
            />
          ) : (
            <Editable
              as="div"
              value={f.logoText ?? brand.logoText}
              onChange={(v) => onChange('logoText', v)}
              editable={editable}
              style={{
                fontSize: '2.4rem',
                color: 'var(--primary)',
                fontWeight: 700,
                letterSpacing: 4,
              }}
            />
          )}
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
