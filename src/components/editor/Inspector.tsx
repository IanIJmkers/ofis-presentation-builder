import { usePresentation } from '../../store/usePresentation';
import { pickImage } from '../../utils/imageUpload';
import type { AccentColor, Card, Step, Stat } from '../../types';

const ACCENT_COLORS: AccentColor[] = ['gold', 'green', 'teal', 'purple', 'primary'];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <div className="text-xs uppercase tracking-wider text-neutral-400 mb-2">{title}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs text-neutral-400 mb-1">{children}</label>;
}

function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400"
    />
  );
}

function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      title="Body text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1.5 text-sm text-neutral-100 focus:outline-none focus:border-amber-400 font-mono resize-y"
    />
  );
}

function NumberInput({
  value,
  onChange,
  min,
  max,
  step = 1,
  title,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  title?: string;
}) {
  return (
    <input
      type="number"
      title={title}
      value={Number.isFinite(value) ? value : 0}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100"
    />
  );
}

function RangeSlider({
  value,
  onChange,
  min,
  max,
  step = 1,
  title,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  title?: string;
}) {
  return (
    <input
      type="range"
      title={title}
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-amber-400"
    />
  );
}

function SmallButton({
  onClick,
  children,
  variant = 'secondary',
}: {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}) {
  const cls =
    variant === 'primary'
      ? 'bg-amber-500 hover:bg-amber-400 text-neutral-900'
      : variant === 'danger'
        ? 'bg-red-700 hover:bg-red-600 text-white'
        : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100';
  return (
    <button onClick={onClick} className={`${cls} text-xs px-2 py-1 rounded font-medium`}>
      {children}
    </button>
  );
}

export default function Inspector() {
  const {
    presentation,
    selectedSlideId,
    selectedImageId,
    updateSlideField,
    updateSlide,
    updateImage,
    deleteImage,
    bringImageForward,
    sendImageBackward,
    setBrand,
  } = usePresentation();

  const slide = presentation.slides.find((s) => s.id === selectedSlideId);
  const selectedImage = slide?.images.find((i) => i.id === selectedImageId);

  if (!slide) {
    return (
      <div className="w-[320px] bg-neutral-900 border-l border-neutral-800 p-4 text-neutral-500 text-sm editor-chrome">
        Geen slide geselecteerd
      </div>
    );
  }

  const f = slide.fields;
  const set = (k: string, v: unknown) => updateSlideField(slide.id, k, v);

  return (
    <div className="w-[320px] bg-neutral-900 border-l border-neutral-800 flex flex-col editor-chrome">
      <div className="px-4 py-3 border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-400">
        Eigenschappen
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {selectedImage ? (
          <Section title="Geselecteerde afbeelding">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <FieldLabel>X</FieldLabel>
                <input
                  type="number"
                  title="Image X position"
                  value={Math.round(selectedImage.x)}
                  onChange={(e) =>
                    updateImage(slide.id, selectedImage.id, { x: Number(e.target.value) })
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100"
                />
              </div>
              <div>
                <FieldLabel>Y</FieldLabel>
                <input
                  type="number"
                  title="Image Y position"
                  value={Math.round(selectedImage.y)}
                  onChange={(e) =>
                    updateImage(slide.id, selectedImage.id, { y: Number(e.target.value) })
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100"
                />
              </div>
              <div>
                <FieldLabel>Breedte</FieldLabel>
                <input
                  type="number"
                  title="Image width"
                  value={Math.round(selectedImage.w)}
                  onChange={(e) =>
                    updateImage(slide.id, selectedImage.id, { w: Number(e.target.value) })
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100"
                />
              </div>
              <div>
                <FieldLabel>Hoogte</FieldLabel>
                <input
                  type="number"
                  title="Image height"
                  value={Math.round(selectedImage.h)}
                  onChange={(e) =>
                    updateImage(slide.id, selectedImage.id, { h: Number(e.target.value) })
                  }
                  className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100"
                />
              </div>
            </div>
            <FieldLabel>Object-fit</FieldLabel>
            <select
              title="Image object-fit"
              value={selectedImage.objectFit}
              onChange={(e) =>
                updateImage(slide.id, selectedImage.id, {
                  objectFit: e.target.value as 'contain' | 'cover',
                })
              }
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-sm text-neutral-100"
            >
              <option value="contain">contain</option>
              <option value="cover">cover</option>
            </select>

            <label className="flex items-center gap-2 text-xs text-neutral-200 pt-2">
              <input
                type="checkbox"
                checked={selectedImage.lockAspectRatio ?? false}
                onChange={(e) =>
                  updateImage(slide.id, selectedImage.id, { lockAspectRatio: e.target.checked })
                }
              />
              Verhouding vergrendelen
            </label>

            {(() => {
              const baseW = selectedImage.originalW ?? 0;
              const baseH = selectedImage.originalH ?? 0;
              const hasOriginal = baseW > 0 && baseH > 0;
              const currentPct = hasOriginal
                ? Math.round((selectedImage.w / baseW) * 100)
                : 100;
              return (
                <>
                  <FieldLabel>
                    Schaal {hasOriginal ? `${currentPct}%` : '(origineel onbekend)'}
                  </FieldLabel>
                  <RangeSlider
                    value={hasOriginal ? Math.min(300, Math.max(10, currentPct)) : 100}
                    min={10}
                    max={300}
                    step={1}
                    title="Schaalpercentage"
                    onChange={(pct) => {
                      if (hasOriginal) {
                        updateImage(slide.id, selectedImage.id, {
                          w: Math.round((baseW * pct) / 100),
                          h: Math.round((baseH * pct) / 100),
                        });
                      } else {
                        // No original on file — scale relative to current size.
                        const factor = pct / 100;
                        updateImage(slide.id, selectedImage.id, {
                          w: Math.max(20, Math.round(selectedImage.w * factor)),
                          h: Math.max(20, Math.round(selectedImage.h * factor)),
                        });
                      }
                    }}
                  />
                  {hasOriginal ? (
                    <div className="text-[10px] text-neutral-500 -mt-1">
                      Origineel: {baseW} × {baseH}
                    </div>
                  ) : null}
                </>
              );
            })()}

            <FieldLabel>Snel schalen</FieldLabel>
            <div className="flex gap-1 flex-wrap">
              {[0.5, 0.75, 1.25, 1.5, 2].map((factor) => (
                <button
                  key={factor}
                  onClick={() => {
                    const newW = Math.round(selectedImage.w * factor);
                    const newH = Math.round(selectedImage.h * factor);
                    updateImage(slide.id, selectedImage.id, { w: newW, h: newH });
                  }}
                  className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 text-xs px-2 py-1 rounded font-medium"
                >
                  {factor < 1 ? `−${Math.round((1 - factor) * 100)}%` : `+${Math.round((factor - 1) * 100)}%`}
                </button>
              ))}
              <button
                onClick={() => {
                  const img = new Image();
                  img.onload = () => {
                    updateImage(slide.id, selectedImage.id, {
                      w: img.naturalWidth,
                      h: img.naturalHeight,
                      originalW: img.naturalWidth,
                      originalH: img.naturalHeight,
                    });
                  };
                  img.src = selectedImage.src;
                }}
                title="Originele afmetingen herstellen"
                className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 text-xs px-2 py-1 rounded font-medium"
              >
                100%
              </button>
            </div>

            <FieldLabel>Aanpassen aan slide</FieldLabel>
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() =>
                  updateImage(slide.id, selectedImage.id, { x: 0, y: 0, w: 1123, h: 794 })
                }
                className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 text-xs px-2 py-1 rounded font-medium"
              >
                Vul slide
              </button>
              <button
                onClick={() => {
                  // Centre on slide while keeping current size
                  const x = Math.round((1123 - selectedImage.w) / 2);
                  const y = Math.round((794 - selectedImage.h) / 2);
                  updateImage(slide.id, selectedImage.id, { x, y });
                }}
                className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 text-xs px-2 py-1 rounded font-medium"
              >
                Centreer
              </button>
            </div>

            <div className="flex gap-2 pt-3">
              <SmallButton onClick={() => bringImageForward(slide.id, selectedImage.id)}>
                ↑ Voorgrond
              </SmallButton>
              <SmallButton onClick={() => sendImageBackward(slide.id, selectedImage.id)}>
                ↓ Achtergrond
              </SmallButton>
              <SmallButton variant="danger" onClick={() => deleteImage(slide.id, selectedImage.id)}>
                Verwijder
              </SmallButton>
            </div>
          </Section>
        ) : null}

        <Section title="Slide chrome">
          <label className="flex items-center gap-2 text-sm text-neutral-200">
            <input
              type="checkbox"
              checked={slide.showChrome ?? true}
              onChange={(e) => updateSlide(slide.id, { showChrome: e.target.checked })}
            />
            Logo + paginanummer tonen
          </label>
        </Section>

        {slide.type === 'accent-bar' ? (
          <Section title="Accent kleur">
            <div className="flex gap-2 flex-wrap">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => updateSlide(slide.id, { variant: c })}
                  className={`w-8 h-8 rounded border-2 ${
                    slide.variant === c ? 'border-white' : 'border-neutral-700'
                  }`}
                  style={{ background: COLOR_HEX[c] }}
                  title={c}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {slide.type === 'card-grid' ? (
          <CardGridInspector fields={f} set={set} />
        ) : null}
        {slide.type === 'process' ? <ProcessInspector fields={f} set={set} /> : null}
        {slide.type === 'stats' ? <StatsInspector fields={f} set={set} /> : null}
        {slide.type === 'table' ? <TableInspector fields={f} set={set} /> : null}
        {slide.type === 'content' ? <ContentInspector fields={f} set={set} /> : null}
        {slide.type === 'image-bleed' ? <ImageBleedInspector slideId={slide.id} fields={f} set={set} /> : null}
        {slide.type === 'dark-image-text' ? (
          <DarkImageInspector slideId={slide.id} fields={f} set={set} />
        ) : null}
        {slide.type === 'contact' ? <ContactInspector fields={f} set={set} /> : null}
        {slide.type === 'title' ? <TitleInspector fields={f} set={set} /> : null}

        <Section title="Brand (alle slides)">
          <p className="text-xs text-neutral-500 mb-2">
            Standaard worden de Orchestra logo's gebruikt (vanuit{' '}
            <code className="text-amber-300">/public/</code>). Upload hier alleen als je een ander
            logo wilt gebruiken voor deze presentatie.
          </p>
          <FieldLabel>Logo tekst (fallback)</FieldLabel>
          <TextInput
            value={presentation.brand.logoText}
            onChange={(v) => setBrand({ logoText: v })}
          />
          <FieldLabel>Logo afbeelding (lichte achtergrond) — overschrijft default</FieldLabel>
          <div className="flex gap-2 items-center">
            {presentation.brand.logoDataUrl ? (
              <img src={presentation.brand.logoDataUrl} alt="" className="h-8 bg-white p-1 rounded" />
            ) : null}
            <SmallButton
              onClick={async () => {
                try {
                  const { src } = await pickImage();
                  setBrand({ logoDataUrl: src });
                } catch {}
              }}
            >
              {presentation.brand.logoDataUrl ? 'Vervang' : 'Upload'}
            </SmallButton>
            {presentation.brand.logoDataUrl ? (
              <SmallButton variant="danger" onClick={() => setBrand({ logoDataUrl: null })}>
                ×
              </SmallButton>
            ) : null}
          </div>
          <FieldLabel>Logo (donkere/witte versie)</FieldLabel>
          <div className="flex gap-2 items-center">
            {presentation.brand.logoWhiteDataUrl ? (
              <img src={presentation.brand.logoWhiteDataUrl} alt="" className="h-8 bg-neutral-700 p-1 rounded" />
            ) : null}
            <SmallButton
              onClick={async () => {
                try {
                  const { src } = await pickImage();
                  setBrand({ logoWhiteDataUrl: src });
                } catch {}
              }}
            >
              {presentation.brand.logoWhiteDataUrl ? 'Vervang' : 'Upload'}
            </SmallButton>
            {presentation.brand.logoWhiteDataUrl ? (
              <SmallButton variant="danger" onClick={() => setBrand({ logoWhiteDataUrl: null })}>
                ×
              </SmallButton>
            ) : null}
          </div>

          <FieldLabel>Logo hoogte (px) — leeg = standaard</FieldLabel>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              title="Logo height in pixels"
              placeholder="standaard"
              value={presentation.brand.logoHeight ?? ''}
              min={12}
              max={200}
              onChange={(e) => {
                const v = e.target.value;
                setBrand({ logoHeight: v === '' ? null : Number(v) });
              }}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs text-neutral-100"
            />
            {presentation.brand.logoHeight != null ? (
              <SmallButton variant="danger" onClick={() => setBrand({ logoHeight: null })}>
                ×
              </SmallButton>
            ) : null}
          </div>
        </Section>

        <p className="text-xs text-neutral-500 mt-6">
          Klik op tekst in de slide om direct te typen. Sleep een afbeelding op de slide om hem toe
          te voegen — daarna kun je ze vrij verplaatsen en schalen.
        </p>
      </div>
    </div>
  );
}

const COLOR_HEX: Record<AccentColor, string> = {
  gold: '#d4af37',
  green: '#3a7233',
  teal: '#2a8a9a',
  purple: '#6b4c9a',
  primary: '#0b2a48',
};

/* ── Per-template inspectors ── */

function ContentInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const bullets: string[] = Array.isArray(fields.bullets) ? fields.bullets : [];
  return (
    <Section title="Bulletpoints">
      {bullets.map((b, i) => (
        <div key={i} className="flex gap-1">
          <TextInput
            value={b}
            onChange={(v) => {
              const next = [...bullets];
              next[i] = v;
              set('bullets', next);
            }}
          />
          <SmallButton
            variant="danger"
            onClick={() => {
              const next = bullets.filter((_, j) => j !== i);
              set('bullets', next);
            }}
          >
            ×
          </SmallButton>
        </div>
      ))}
      <SmallButton onClick={() => set('bullets', [...bullets, ''])}>+ Bullet</SmallButton>
    </Section>
  );
}

function CardGridInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const cards: Card[] = Array.isArray(fields.cards) ? fields.cards : [];
  const cols = Number(fields.cols) || 3;
  return (
    <>
      <Section title="Kolommen">
        <div className="flex gap-2">
          {[2, 3, 4].map((c) => (
            <button
              key={c}
              onClick={() => set('cols', c)}
              className={`px-3 py-1.5 text-sm rounded border ${
                cols === c
                  ? 'bg-amber-500 border-amber-400 text-neutral-900'
                  : 'bg-neutral-800 border-neutral-700 text-neutral-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </Section>
      <Section title="Cards">
        {cards.map((card, i) => (
          <div key={i} className="bg-neutral-800 rounded p-2 space-y-1">
            <TextInput
              value={card.title}
              onChange={(v) => {
                const next = [...cards];
                next[i] = { ...next[i], title: v };
                set('cards', next);
              }}
              placeholder="Titel"
            />
            <TextArea
              value={card.body}
              onChange={(v) => {
                const next = [...cards];
                next[i] = { ...next[i], body: v };
                set('cards', next);
              }}
              rows={2}
            />
            <SmallButton
              variant="danger"
              onClick={() => set('cards', cards.filter((_, j) => j !== i))}
            >
              Verwijder card
            </SmallButton>
          </div>
        ))}
        <SmallButton onClick={() => set('cards', [...cards, { title: 'Nieuw', body: 'Beschrijving' }])}>
          + Card
        </SmallButton>
      </Section>
    </>
  );
}

function ProcessInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const steps: Step[] = Array.isArray(fields.steps) ? fields.steps : [];
  return (
    <Section title="Stappen">
      {steps.map((step, i) => (
        <div key={i} className="bg-neutral-800 rounded p-2 space-y-1">
          <div className="text-xs text-neutral-400">Stap {i + 1}</div>
          <TextInput
            value={step.title}
            onChange={(v) => {
              const next = [...steps];
              next[i] = { ...next[i], title: v };
              set('steps', next);
            }}
          />
          <TextArea
            value={step.body}
            onChange={(v) => {
              const next = [...steps];
              next[i] = { ...next[i], body: v };
              set('steps', next);
            }}
            rows={2}
          />
          <SmallButton
            variant="danger"
            onClick={() => set('steps', steps.filter((_, j) => j !== i))}
          >
            Verwijder stap
          </SmallButton>
        </div>
      ))}
      <SmallButton onClick={() => set('steps', [...steps, { title: 'Stap', body: '' }])}>
        + Stap
      </SmallButton>
    </Section>
  );
}

function StatsInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const stats: Stat[] = Array.isArray(fields.stats) ? fields.stats : [];
  return (
    <Section title="Cijfers">
      {stats.map((stat, i) => (
        <div key={i} className="bg-neutral-800 rounded p-2 space-y-1">
          <TextInput
            value={stat.number}
            onChange={(v) => {
              const next = [...stats];
              next[i] = { ...next[i], number: v };
              set('stats', next);
            }}
            placeholder="€1,5 Mld"
          />
          <TextInput
            value={stat.label}
            onChange={(v) => {
              const next = [...stats];
              next[i] = { ...next[i], label: v };
              set('stats', next);
            }}
            placeholder="Label"
          />
          <SmallButton
            variant="danger"
            onClick={() => set('stats', stats.filter((_, j) => j !== i))}
          >
            ×
          </SmallButton>
        </div>
      ))}
      <SmallButton onClick={() => set('stats', [...stats, { number: '0', label: 'Label' }])}>
        + Stat
      </SmallButton>
    </Section>
  );
}

function TableInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const headers: string[] = Array.isArray(fields.headers) ? fields.headers : [];
  const rows: string[][] = Array.isArray(fields.rows) ? fields.rows : [];

  return (
    <>
      <Section title="Kolommen">
        <div className="space-y-1">
          {headers.map((h, i) => (
            <div key={i} className="flex gap-1">
              <TextInput
                value={h}
                onChange={(v) => {
                  const next = [...headers];
                  next[i] = v;
                  set('headers', next);
                }}
              />
              <SmallButton
                variant="danger"
                onClick={() => {
                  set('headers', headers.filter((_, j) => j !== i));
                  set(
                    'rows',
                    rows.map((r) => r.filter((_, j) => j !== i)),
                  );
                }}
              >
                ×
              </SmallButton>
            </div>
          ))}
        </div>
        <SmallButton
          onClick={() => {
            set('headers', [...headers, 'Kolom']);
            set('rows', rows.map((r) => [...r, '']));
          }}
        >
          + Kolom
        </SmallButton>
      </Section>
      <Section title="Rijen">
        <div className="text-xs text-neutral-500 mb-2">
          Bewerk celinhoud direct in de slide.
        </div>
        <SmallButton
          onClick={() => set('rows', [...rows, headers.map(() => '')])}
        >
          + Rij
        </SmallButton>
        <div className="space-y-1 mt-2">
          {rows.map((_, i) => (
            <div key={i} className="flex justify-between items-center text-xs text-neutral-400">
              Rij {i + 1}
              <SmallButton
                variant="danger"
                onClick={() => set('rows', rows.filter((_, j) => j !== i))}
              >
                ×
              </SmallButton>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

function ImageBleedInspector({
  fields,
  set,
}: {
  slideId: string;
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const scale = Number(fields.imageScale ?? 1);
  const offsetX = Number(fields.imageOffsetX ?? 0);
  const offsetY = Number(fields.imageOffsetY ?? 0);
  const fit: 'contain' | 'cover' = fields.imageObjectFit === 'cover' ? 'cover' : 'contain';
  const reset = () => {
    set('imageScale', 1);
    set('imageObjectFit', 'contain');
    set('imageOffsetX', 0);
    set('imageOffsetY', 0);
  };
  return (
    <Section title="Hoofdafbeelding">
      <div className="flex gap-2 items-center">
        {fields.imageDataUrl ? (
          <img src={fields.imageDataUrl} alt="" className="h-12 rounded bg-neutral-800 p-1" />
        ) : null}
        <SmallButton
          onClick={async () => {
            try {
              const { src } = await pickImage();
              set('imageDataUrl', src);
            } catch {}
          }}
        >
          {fields.imageDataUrl ? 'Vervang' : 'Upload'}
        </SmallButton>
        {fields.imageDataUrl ? (
          <SmallButton variant="danger" onClick={() => set('imageDataUrl', '')}>
            ×
          </SmallButton>
        ) : null}
      </div>

      {fields.imageDataUrl ? (
        <>
          <FieldLabel>Schaal {Math.round(scale * 100)}%</FieldLabel>
          <RangeSlider
            value={Math.round(scale * 100)}
            min={25}
            max={250}
            step={1}
            title="Image scale"
            onChange={(v) => set('imageScale', v / 100)}
          />

          <FieldLabel>Object-fit</FieldLabel>
          <div className="flex gap-1">
            {(['contain', 'cover'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => set('imageObjectFit', mode)}
                className={`text-xs px-2 py-1 rounded font-medium ${
                  fit === mode
                    ? 'bg-amber-500 text-neutral-900'
                    : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <FieldLabel>X (px)</FieldLabel>
              <NumberInput
                value={offsetX}
                onChange={(v) => set('imageOffsetX', v)}
                step={5}
                title="Horizontal offset"
              />
            </div>
            <div>
              <FieldLabel>Y (px)</FieldLabel>
              <NumberInput
                value={offsetY}
                onChange={(v) => set('imageOffsetY', v)}
                step={5}
                title="Vertical offset"
              />
            </div>
          </div>

          <div className="pt-2">
            <SmallButton onClick={reset}>Reset schaal/positie</SmallButton>
          </div>
        </>
      ) : null}
    </Section>
  );
}

function DarkImageInspector({
  fields,
  set,
}: {
  slideId: string;
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const size: 'cover' | 'contain' = fields.bgSize === 'contain' ? 'contain' : 'cover';
  const scale = Number(fields.bgScale ?? 1);
  const posX = Number(fields.bgPositionX ?? 50);
  const posY = Number(fields.bgPositionY ?? 50);
  const reset = () => {
    set('bgSize', 'cover');
    set('bgScale', 1);
    set('bgPositionX', 50);
    set('bgPositionY', 50);
  };
  return (
    <Section title="Achtergrondafbeelding">
      <div className="flex gap-2 items-center">
        {fields.bgImageDataUrl ? (
          <img src={fields.bgImageDataUrl} alt="" className="h-12 rounded bg-neutral-800 p-1" />
        ) : null}
        <SmallButton
          onClick={async () => {
            try {
              const { src } = await pickImage();
              set('bgImageDataUrl', src);
            } catch {}
          }}
        >
          {fields.bgImageDataUrl ? 'Vervang' : 'Upload'}
        </SmallButton>
        {fields.bgImageDataUrl ? (
          <SmallButton variant="danger" onClick={() => set('bgImageDataUrl', '')}>
            ×
          </SmallButton>
        ) : null}
      </div>

      {fields.bgImageDataUrl ? (
        <>
          <FieldLabel>Modus</FieldLabel>
          <div className="flex gap-1">
            {(['cover', 'contain'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => set('bgSize', mode)}
                className={`text-xs px-2 py-1 rounded font-medium ${
                  size === mode
                    ? 'bg-amber-500 text-neutral-900'
                    : 'bg-neutral-700 hover:bg-neutral-600 text-neutral-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <FieldLabel>Schaal {Math.round(scale * 100)}%</FieldLabel>
          <RangeSlider
            value={Math.round(scale * 100)}
            min={50}
            max={250}
            step={1}
            title="Background scale"
            onChange={(v) => set('bgScale', v / 100)}
          />

          <FieldLabel>Positie X {Math.round(posX)}%</FieldLabel>
          <RangeSlider
            value={Math.round(posX)}
            min={0}
            max={100}
            step={1}
            title="Background X position"
            onChange={(v) => set('bgPositionX', v)}
          />

          <FieldLabel>Positie Y {Math.round(posY)}%</FieldLabel>
          <RangeSlider
            value={Math.round(posY)}
            min={0}
            max={100}
            step={1}
            title="Background Y position"
            onChange={(v) => set('bgPositionY', v)}
          />

          <div className="pt-2">
            <SmallButton onClick={reset}>Reset</SmallButton>
          </div>
        </>
      ) : null}
    </Section>
  );
}

function TitleInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const height = Number(fields.logoHeight ?? 140);
  const maxWidth = Number(fields.logoMaxWidth ?? 70);
  return (
    <Section title="Logo op titelslide">
      <FieldLabel>Hoogte {Math.round(height)} px</FieldLabel>
      <RangeSlider
        value={Math.round(height)}
        min={40}
        max={400}
        step={1}
        title="Title-slide logo height"
        onChange={(v) => set('logoHeight', v)}
      />

      <FieldLabel>Max. breedte {Math.round(maxWidth)}%</FieldLabel>
      <RangeSlider
        value={Math.round(maxWidth)}
        min={20}
        max={100}
        step={1}
        title="Title-slide logo max width"
        onChange={(v) => set('logoMaxWidth', v)}
      />

      <div className="pt-2">
        <SmallButton
          onClick={() => {
            set('logoHeight', 140);
            set('logoMaxWidth', 70);
          }}
        >
          Reset
        </SmallButton>
      </div>
    </Section>
  );
}

function ContactInspector({
  fields,
  set,
}: {
  fields: any;
  set: (k: string, v: unknown) => void;
}) {
  const address: string[] = Array.isArray(fields.address) ? fields.address : [];
  const logoHeight = Number(fields.logoHeight ?? 200);
  const logoMaxWidth = Number(fields.logoMaxWidth ?? 380);
  return (
    <>
      <Section title="Logo op contactslide">
        <FieldLabel>Hoogte {Math.round(logoHeight)} px</FieldLabel>
        <RangeSlider
          value={Math.round(logoHeight)}
          min={40}
          max={400}
          step={1}
          title="Contact logo height"
          onChange={(v) => set('logoHeight', v)}
        />
        <FieldLabel>Max. breedte {Math.round(logoMaxWidth)} px</FieldLabel>
        <RangeSlider
          value={Math.round(logoMaxWidth)}
          min={120}
          max={700}
          step={1}
          title="Contact logo max width"
          onChange={(v) => set('logoMaxWidth', v)}
        />
        <div className="pt-2">
          <SmallButton
            onClick={() => {
              set('logoHeight', 200);
              set('logoMaxWidth', 380);
            }}
          >
            Reset
          </SmallButton>
        </div>
      </Section>

      <Section title="Adres regels">
        {address.map((line, i) => (
          <div key={i} className="flex gap-1">
            <TextInput
              value={line}
              onChange={(v) => {
                const next = [...address];
                next[i] = v;
                set('address', next);
              }}
            />
            <SmallButton
              variant="danger"
              onClick={() => set('address', address.filter((_, j) => j !== i))}
            >
              ×
            </SmallButton>
          </div>
        ))}
        <SmallButton onClick={() => set('address', [...address, ''])}>+ Regel</SmallButton>
      </Section>
      <Section title="Contact">
        <FieldLabel>Telefoon</FieldLabel>
        <TextInput value={fields.phone ?? ''} onChange={(v) => set('phone', v)} />
        <FieldLabel>Website (label)</FieldLabel>
        <TextInput value={fields.website ?? ''} onChange={(v) => set('website', v)} />
        <FieldLabel>Website URL</FieldLabel>
        <TextInput value={fields.websiteUrl ?? ''} onChange={(v) => set('websiteUrl', v)} />
      </Section>
    </>
  );
}
