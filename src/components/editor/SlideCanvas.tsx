import { useEffect, useRef, useState } from 'react';
import { usePresentation } from '../../store/usePresentation';
import SlideRenderer from '../slides/SlideRenderer';
import { fileToDataUrl, readImageDimensions } from '../../utils/imageUpload';

const SLIDE_W = 1123;
const SLIDE_H = 794;

export default function SlideCanvas() {
  const { presentation, selectedSlideId, updateSlideField, addImage, selectImage } =
    usePresentation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [dragOver, setDragOver] = useState(false);

  const selectedIndex = presentation.slides.findIndex((s) => s.id === selectedSlideId);
  const selected = presentation.slides[selectedIndex];

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const padding = 48;
        const s = Math.min(
          (width - padding) / SLIDE_W,
          (height - padding) / SLIDE_H,
        );
        setScale(Math.min(1, Math.max(0.1, s)));
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!selected) {
    return (
      <div ref={containerRef} className="flex-1 flex items-center justify-center text-neutral-500">
        Geen slide geselecteerd
      </div>
    );
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    const src = await fileToDataUrl(file);
    let dims = { w: 0, h: 0 };
    try {
      dims = await readImageDimensions(src);
    } catch {
      /* ignore — fall back to default size */
    }
    addImage(selected.id, { src, originalW: dims.w, originalH: dims.h });
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center overflow-hidden relative bg-[#1a1a1a]"
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => selectImage(null)}
    >
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          boxShadow: '0 0 40px rgba(0,0,0,0.6)',
          flexShrink: 0,
        }}
      >
        <SlideRenderer
          slide={selected}
          brand={presentation.brand}
          index={selectedIndex}
          editable={true}
          onChange={(key, value) => updateSlideField(selected.id, key, value)}
        />
      </div>
      {dragOver ? (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ background: 'rgba(212, 175, 55, 0.15)', border: '4px dashed var(--accent)' }}
        >
          <span className="text-white text-2xl font-medium">Drop image</span>
        </div>
      ) : null}
      <div className="absolute bottom-3 left-3 text-xs text-neutral-500 pointer-events-none">
        {Math.round(scale * 100)}% • Slide {selectedIndex + 1} / {presentation.slides.length}
      </div>
    </div>
  );
}
