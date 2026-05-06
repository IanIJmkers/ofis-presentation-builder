import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';
import type { Card } from '../../types';

export default function CardGridSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  const cards: Card[] = Array.isArray(f.cards) ? f.cards : [];
  const cols = Number(f.cols) || 3;
  const colsClass = cols === 2 ? 'card-grid--2' : cols === 4 ? 'card-grid--4' : 'card-grid--3';

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
        <div className={`card-grid ${colsClass}`}>
          {cards.map((card, i) => (
            <div className="dash-card" key={i}>
              <Editable
                as="h3"
                value={card.title}
                onChange={(v) => {
                  const next = [...cards];
                  next[i] = { ...next[i], title: v };
                  onChange('cards', next);
                }}
                editable={editable}
              />
              <Editable
                as="p"
                value={card.body}
                onChange={(v) => {
                  const next = [...cards];
                  next[i] = { ...next[i], body: v };
                  onChange('cards', next);
                }}
                editable={editable}
                multiline
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
