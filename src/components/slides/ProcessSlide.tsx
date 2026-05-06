import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';
import type { Step } from '../../types';

export default function ProcessSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  const steps: Step[] = Array.isArray(f.steps) ? f.steps : [];

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
        <div
          className="process-grid"
          style={{ gridTemplateColumns: `repeat(${steps.length || 4}, 1fr)` }}
        >
          {steps.map((step, i) => (
            <div className="process-step" key={i}>
              <div className="process-step-num">{String(i + 1).padStart(2, '0')}</div>
              <Editable
                as="h3"
                value={step.title}
                onChange={(v) => {
                  const next = [...steps];
                  next[i] = { ...next[i], title: v };
                  onChange('steps', next);
                }}
                editable={editable}
              />
              <Editable
                as="p"
                value={step.body}
                onChange={(v) => {
                  const next = [...steps];
                  next[i] = { ...next[i], body: v };
                  onChange('steps', next);
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
