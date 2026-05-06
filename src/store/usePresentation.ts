import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { Presentation, Slide, SlideType, FreeImage } from '../types';
import { makeSlide } from '../templates/defaults';
import { loadFromStorage, saveToStorage, debounce } from '../utils/storage';

type State = {
  presentation: Presentation;
  selectedSlideId: string | null;
  selectedImageId: string | null;
};

type Actions = {
  setPresentation: (p: Presentation) => void;
  setTitle: (title: string) => void;
  setBrand: (patch: Partial<Presentation['brand']>) => void;
  selectSlide: (id: string | null) => void;
  selectImage: (id: string | null) => void;
  addSlide: (type: SlideType, atIndex?: number) => void;
  duplicateSlide: (id: string) => void;
  deleteSlide: (id: string) => void;
  reorderSlides: (fromIndex: number, toIndex: number) => void;
  updateSlideField: (id: string, key: string, value: unknown) => void;
  updateSlide: (id: string, patch: Partial<Slide>) => void;
  addImage: (slideId: string, image: { src: string; originalW?: number; originalH?: number }) => void;
  updateImage: (slideId: string, imageId: string, patch: Partial<FreeImage>) => void;
  deleteImage: (slideId: string, imageId: string) => void;
  bringImageForward: (slideId: string, imageId: string) => void;
  sendImageBackward: (slideId: string, imageId: string) => void;
};

function defaultPresentation(): Presentation {
  return {
    id: nanoid(8),
    title: 'Nieuwe presentatie',
    brand: {
      primary: '#0b2a48',
      accent: '#d4af37',
      logoDataUrl: null,
      logoWhiteDataUrl: null,
      logoText: 'ORCHESTRA',
      logoHeight: null,
    },
    slides: [makeSlide('title'), makeSlide('content'), makeSlide('contact')],
  };
}

const initialPresentation = loadFromStorage() ?? defaultPresentation();

const persist = debounce((state: Presentation) => saveToStorage(state), 400);

export const usePresentation = create<State & Actions>((set, get) => ({
  presentation: initialPresentation,
  selectedSlideId: initialPresentation.slides[0]?.id ?? null,
  selectedImageId: null,

  setPresentation(p) {
    set({ presentation: p, selectedSlideId: p.slides[0]?.id ?? null, selectedImageId: null });
    persist(p);
  },

  setTitle(title) {
    set((s) => {
      const p = { ...s.presentation, title };
      persist(p);
      return { presentation: p };
    });
  },

  setBrand(patch) {
    set((s) => {
      const p = { ...s.presentation, brand: { ...s.presentation.brand, ...patch } };
      persist(p);
      return { presentation: p };
    });
  },

  selectSlide(id) {
    set({ selectedSlideId: id, selectedImageId: null });
  },

  selectImage(id) {
    set({ selectedImageId: id });
  },

  addSlide(type, atIndex) {
    set((s) => {
      const newSlide = makeSlide(type);
      const slides = [...s.presentation.slides];
      const idx = atIndex ?? slides.length;
      slides.splice(idx, 0, newSlide);
      const p = { ...s.presentation, slides };
      persist(p);
      return { presentation: p, selectedSlideId: newSlide.id, selectedImageId: null };
    });
  },

  duplicateSlide(id) {
    set((s) => {
      const idx = s.presentation.slides.findIndex((sl) => sl.id === id);
      if (idx === -1) return s;
      const original = s.presentation.slides[idx];
      const copy: Slide = JSON.parse(JSON.stringify(original));
      copy.id = nanoid(8);
      copy.images = copy.images.map((im) => ({ ...im, id: nanoid(8) }));
      const slides = [...s.presentation.slides];
      slides.splice(idx + 1, 0, copy);
      const p = { ...s.presentation, slides };
      persist(p);
      return { presentation: p, selectedSlideId: copy.id };
    });
  },

  deleteSlide(id) {
    set((s) => {
      const slides = s.presentation.slides.filter((sl) => sl.id !== id);
      const p = { ...s.presentation, slides };
      persist(p);
      const wasSelected = s.selectedSlideId === id;
      return {
        presentation: p,
        selectedSlideId: wasSelected ? slides[0]?.id ?? null : s.selectedSlideId,
      };
    });
  },

  reorderSlides(fromIndex, toIndex) {
    set((s) => {
      const slides = [...s.presentation.slides];
      const [moved] = slides.splice(fromIndex, 1);
      slides.splice(toIndex, 0, moved);
      const p = { ...s.presentation, slides };
      persist(p);
      return { presentation: p };
    });
  },

  updateSlideField(id, key, value) {
    set((s) => {
      const slides = s.presentation.slides.map((sl) =>
        sl.id === id ? { ...sl, fields: { ...sl.fields, [key]: value } } : sl,
      );
      const p = { ...s.presentation, slides };
      persist(p);
      return { presentation: p };
    });
  },

  updateSlide(id, patch) {
    set((s) => {
      const slides = s.presentation.slides.map((sl) =>
        sl.id === id ? { ...sl, ...patch } : sl,
      );
      const p = { ...s.presentation, slides };
      persist(p);
      return { presentation: p };
    });
  },

  addImage(slideId, image) {
    set((s) => {
      const slides = s.presentation.slides.map((sl) => {
        if (sl.id !== slideId) return sl;
        const maxZ = sl.images.reduce((m, im) => Math.max(m, im.z), 0);
        // Default placement: scale to fit ~half the slide width while keeping aspect.
        const ow = image.originalW ?? 0;
        const oh = image.originalH ?? 0;
        let w = 400;
        let h = 300;
        if (ow > 0 && oh > 0) {
          const maxW = 560;
          const ratio = oh / ow;
          w = Math.min(ow, maxW);
          h = Math.round(w * ratio);
        }
        const newImage: FreeImage = {
          id: nanoid(8),
          src: image.src,
          x: Math.round((1123 - w) / 2),
          y: Math.round((794 - h) / 2),
          w,
          h,
          z: maxZ + 1,
          objectFit: 'contain',
          originalW: ow || undefined,
          originalH: oh || undefined,
        };
        return { ...sl, images: [...sl.images, newImage] };
      });
      const p = { ...s.presentation, slides };
      persist(p);
      const added = slides.find((sl) => sl.id === slideId)?.images.slice(-1)[0];
      return { presentation: p, selectedImageId: added?.id ?? null };
    });
  },

  updateImage(slideId, imageId, patch) {
    set((s) => {
      const slides = s.presentation.slides.map((sl) => {
        if (sl.id !== slideId) return sl;
        return {
          ...sl,
          images: sl.images.map((im) => (im.id === imageId ? { ...im, ...patch } : im)),
        };
      });
      const p = { ...s.presentation, slides };
      persist(p);
      return { presentation: p };
    });
  },

  deleteImage(slideId, imageId) {
    set((s) => {
      const slides = s.presentation.slides.map((sl) => {
        if (sl.id !== slideId) return sl;
        return { ...sl, images: sl.images.filter((im) => im.id !== imageId) };
      });
      const p = { ...s.presentation, slides };
      persist(p);
      return {
        presentation: p,
        selectedImageId: s.selectedImageId === imageId ? null : s.selectedImageId,
      };
    });
  },

  bringImageForward(slideId, imageId) {
    const slide = get().presentation.slides.find((sl) => sl.id === slideId);
    if (!slide) return;
    const maxZ = slide.images.reduce((m, im) => Math.max(m, im.z), 0);
    get().updateImage(slideId, imageId, { z: maxZ + 1 });
  },

  sendImageBackward(slideId, imageId) {
    const slide = get().presentation.slides.find((sl) => sl.id === slideId);
    if (!slide) return;
    const minZ = slide.images.reduce((m, im) => Math.min(m, im.z), 0);
    get().updateImage(slideId, imageId, { z: minZ - 1 });
  },
}));
