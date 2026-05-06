import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';
import type { Stat } from '../../types';

export default function StatsSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  const stats: Stat[] = Array.isArray(f.stats) ? f.stats : [];

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
        <div className="stats-container">
          {stats.map((stat, i) => (
            <div className="stat-item" key={i}>
              <Editable
                as="div"
                className="stat-number"
                value={stat.number}
                onChange={(v) => {
                  const next = [...stats];
                  next[i] = { ...next[i], number: v };
                  onChange('stats', next);
                }}
                editable={editable}
              />
              <Editable
                as="div"
                className="stat-label"
                value={stat.label}
                onChange={(v) => {
                  const next = [...stats];
                  next[i] = { ...next[i], label: v };
                  onChange('stats', next);
                }}
                editable={editable}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
