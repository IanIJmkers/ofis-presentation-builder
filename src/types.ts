export type SlideType =
  | 'title'
  | 'content'
  | 'two-col'
  | 'card-grid'
  | 'process'
  | 'stats'
  | 'accent-bar'
  | 'divider-light'
  | 'divider-dark'
  | 'image-bleed'
  | 'table'
  | 'dark-image-text'
  | 'contact';

export type AccentColor = 'gold' | 'green' | 'teal' | 'purple' | 'primary';

export type FreeImage = {
  id: string;
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  objectFit: 'contain' | 'cover';
  lockAspectRatio?: boolean;
  originalW?: number;
  originalH?: number;
};

export type Card = { title: string; body: string };
export type Step = { title: string; body: string };
export type Stat = { number: string; label: string };

export type Slide = {
  id: string;
  type: SlideType;
  fields: Record<string, any>;
  images: FreeImage[];
  variant?: AccentColor;
  showChrome?: boolean;
  slideNumber?: string;
};

export type Brand = {
  primary: string;
  accent: string;
  logoDataUrl: string | null;
  logoWhiteDataUrl: string | null;
  logoText: string;
  logoHeight?: number | null;
};

export type Presentation = {
  id: string;
  title: string;
  brand: Brand;
  slides: Slide[];
};
