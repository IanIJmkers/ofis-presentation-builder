import { Rnd } from 'react-rnd';
import type { Slide } from '../../types';
import { usePresentation } from '../../store/usePresentation';

type Props = {
  slide: Slide;
  editable: boolean;
};

const HANDLE_CLASSES = {
  top: 'rnd-handle rnd-handle--edge rnd-handle--top',
  right: 'rnd-handle rnd-handle--edge rnd-handle--right',
  bottom: 'rnd-handle rnd-handle--edge rnd-handle--bottom',
  left: 'rnd-handle rnd-handle--edge rnd-handle--left',
  topRight: 'rnd-handle rnd-handle--corner rnd-handle--top-right',
  bottomRight: 'rnd-handle rnd-handle--corner rnd-handle--bottom-right',
  bottomLeft: 'rnd-handle rnd-handle--corner rnd-handle--bottom-left',
  topLeft: 'rnd-handle rnd-handle--corner rnd-handle--top-left',
};

export default function ImageOverlay({ slide, editable }: Props) {
  const { selectedImageId, selectImage, updateImage } = usePresentation();

  if (!editable) {
    return (
      <div className="image-overlay-layer">
        {[...slide.images]
          .sort((a, b) => a.z - b.z)
          .map((im) => (
            <div
              key={im.id}
              className="free-image"
              style={{
                position: 'absolute',
                left: im.x,
                top: im.y,
                width: im.w,
                height: im.h,
                zIndex: im.z,
              }}
            >
              <img src={im.src} alt="" style={{ objectFit: im.objectFit }} />
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="image-overlay-layer">
      {[...slide.images]
        .sort((a, b) => a.z - b.z)
        .map((im) => {
          const isSelected = selectedImageId === im.id;
          return (
            <Rnd
              key={im.id}
              position={{ x: im.x, y: im.y }}
              size={{ width: im.w, height: im.h }}
              bounds="parent"
              lockAspectRatio={im.lockAspectRatio ?? false}
              onDragStop={(_, d) => updateImage(slide.id, im.id, { x: d.x, y: d.y })}
              onResizeStop={(_, __, ref, ___, position) =>
                updateImage(slide.id, im.id, {
                  w: ref.offsetWidth,
                  h: ref.offsetHeight,
                  x: position.x,
                  y: position.y,
                })
              }
              style={{ zIndex: im.z }}
              className={`free-image ${isSelected ? 'is-selected' : ''}`}
              resizeHandleClasses={HANDLE_CLASSES}
              onClick={(e: any) => {
                e.stopPropagation();
                selectImage(im.id);
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  outline: isSelected
                    ? '2px solid var(--accent)'
                    : '1px dashed rgba(0,0,0,0.2)',
                  background: 'transparent',
                  position: 'relative',
                }}
              >
                <img
                  src={im.src}
                  alt=""
                  style={{ objectFit: im.objectFit, pointerEvents: 'none' }}
                  draggable={false}
                />
                {isSelected ? (
                  <div className="rnd-size-badge">
                    {Math.round(im.w)} × {Math.round(im.h)}
                  </div>
                ) : null}
              </div>
            </Rnd>
          );
        })}
    </div>
  );
}
