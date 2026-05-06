import Editable from './Editable';
import SlideChrome from './SlideChrome';
import type { SlideTemplateProps } from './types';

export default function TableSlide({
  slide,
  brand,
  slideNumber,
  editable,
  onChange,
}: SlideTemplateProps) {
  const f = slide.fields;
  const headers: string[] = Array.isArray(f.headers) ? f.headers : [];
  const rows: string[][] = Array.isArray(f.rows) ? f.rows : [];

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
        <table className="data-table">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>
                  <Editable
                    as="span"
                    value={h}
                    onChange={(v) => {
                      const next = [...headers];
                      next[i] = v;
                      onChange('headers', next);
                    }}
                    editable={editable}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td key={c}>
                    <Editable
                      as="span"
                      value={cell}
                      onChange={(v) => {
                        const next = rows.map((rr) => [...rr]);
                        next[r][c] = v;
                        onChange('rows', next);
                      }}
                      editable={editable}
                      multiline
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
