import type { Slide, Brand } from '../../types';

export type SlideTemplateProps = {
  slide: Slide;
  brand: Brand;
  slideNumber: string;
  editable: boolean;
  onChange: (key: string, value: unknown) => void;
};
