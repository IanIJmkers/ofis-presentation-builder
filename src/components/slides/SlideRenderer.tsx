import type { Slide, Brand } from '../../types';
import TitleSlide from './TitleSlide';
import ContentSlide from './ContentSlide';
import TwoColSlide from './TwoColSlide';
import CardGridSlide from './CardGridSlide';
import ProcessSlide from './ProcessSlide';
import StatsSlide from './StatsSlide';
import AccentBarSlide from './AccentBarSlide';
import DividerLightSlide from './DividerLightSlide';
import DividerDarkSlide from './DividerDarkSlide';
import ImageBleedSlide from './ImageBleedSlide';
import TableSlide from './TableSlide';
import DarkImageTextSlide from './DarkImageTextSlide';
import ContactSlide from './ContactSlide';
import ImageOverlay from './ImageOverlay';

const REGISTRY = {
  title: TitleSlide,
  content: ContentSlide,
  'two-col': TwoColSlide,
  'card-grid': CardGridSlide,
  process: ProcessSlide,
  stats: StatsSlide,
  'accent-bar': AccentBarSlide,
  'divider-light': DividerLightSlide,
  'divider-dark': DividerDarkSlide,
  'image-bleed': ImageBleedSlide,
  table: TableSlide,
  'dark-image-text': DarkImageTextSlide,
  contact: ContactSlide,
} as const;

type Props = {
  slide: Slide;
  brand: Brand;
  index: number;
  editable: boolean;
  onChange: (key: string, value: unknown) => void;
};

export default function SlideRenderer({ slide, brand, index, editable, onChange }: Props) {
  const Tpl = REGISTRY[slide.type];
  const slideNumber = String(index + 1).padStart(2, '0');

  return (
    <div className={`slide slide--${slide.type}`} data-slide-id={slide.id}>
      {Tpl ? (
        <Tpl
          slide={slide}
          brand={brand}
          slideNumber={slideNumber}
          editable={editable}
          onChange={onChange}
        />
      ) : (
        <div style={{ padding: 80 }}>Unknown slide type: {slide.type}</div>
      )}
      <ImageOverlay slide={slide} editable={editable} />
    </div>
  );
}
