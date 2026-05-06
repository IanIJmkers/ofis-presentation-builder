import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useState } from 'react';
import { usePresentation } from '../../store/usePresentation';
import { SLIDE_TYPES, SLIDE_TYPE_LABELS } from '../../templates/defaults';
import SlideRenderer from '../slides/SlideRenderer';
import type { Slide, SlideType } from '../../types';

const THUMB_W = 220;
const THUMB_SCALE = THUMB_W / 1123;

function ThumbItem({
  slide,
  index,
  selected,
  onSelect,
  onDuplicate,
  onDelete,
  brand,
}: {
  slide: Slide;
  index: number;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  brand: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: slide.id,
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className="mb-3">
      <div
        className={`relative rounded-md overflow-hidden border-2 cursor-pointer transition-colors ${
          selected ? 'border-amber-400' : 'border-neutral-700 hover:border-neutral-500'
        }`}
        onClick={onSelect}
      >
        <div
          style={{
            width: THUMB_W,
            height: 794 * THUMB_SCALE,
            overflow: 'hidden',
            position: 'relative',
            background: '#fff',
          }}
        >
          <div
            style={{
              transform: `scale(${THUMB_SCALE})`,
              transformOrigin: 'top left',
              width: 1123,
              height: 794,
              pointerEvents: 'none',
            }}
          >
            <SlideRenderer
              slide={slide}
              brand={brand}
              index={index}
              editable={false}
              onChange={() => {}}
            />
          </div>
        </div>
        <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicate();
            }}
            className="bg-neutral-900/80 text-white text-xs rounded px-2 py-1"
            title="Duplicate"
          >
            ⎘
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Slide verwijderen?')) onDelete();
            }}
            className="bg-neutral-900/80 text-white text-xs rounded px-2 py-1"
            title="Delete"
          >
            ✕
          </button>
        </div>
      </div>
      <div className="flex items-center mt-1.5 px-1">
        <button
          {...attributes}
          {...listeners}
          className="text-neutral-500 hover:text-neutral-200 cursor-grab active:cursor-grabbing pr-2"
          title="Drag to reorder"
        >
          ⋮⋮
        </button>
        <span className="text-xs text-neutral-400">
          {String(index + 1).padStart(2, '0')} · {SLIDE_TYPE_LABELS[slide.type]}
        </span>
      </div>
    </div>
  );
}

export default function SlideThumbnails() {
  const {
    presentation,
    selectedSlideId,
    selectSlide,
    addSlide,
    duplicateSlide,
    deleteSlide,
    reorderSlides,
  } = usePresentation();

  const [picker, setPicker] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }));

  return (
    <div className="w-[260px] bg-neutral-900 border-r border-neutral-800 flex flex-col editor-chrome">
      <div className="px-4 py-3 border-b border-neutral-800 text-xs uppercase tracking-wider text-neutral-400">
        Slides ({presentation.slides.length})
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={(e) => {
            const { active, over } = e;
            if (over && active.id !== over.id) {
              const from = presentation.slides.findIndex((s) => s.id === active.id);
              const to = presentation.slides.findIndex((s) => s.id === over.id);
              reorderSlides(from, to);
            }
          }}
        >
          <SortableContext
            items={presentation.slides.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {presentation.slides.map((slide, i) => (
              <div key={slide.id} className="group">
                <ThumbItem
                  slide={slide}
                  index={i}
                  selected={selectedSlideId === slide.id}
                  onSelect={() => selectSlide(slide.id)}
                  onDuplicate={() => duplicateSlide(slide.id)}
                  onDelete={() => deleteSlide(slide.id)}
                  brand={presentation.brand}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className="border-t border-neutral-800 p-3 relative">
        <button
          onClick={() => setPicker((p) => !p)}
          className="w-full bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold rounded py-2 text-sm"
        >
          + Slide toevoegen
        </button>
        {picker ? (
          <div className="absolute bottom-full left-3 right-3 mb-2 bg-neutral-800 border border-neutral-700 rounded shadow-2xl max-h-[400px] overflow-y-auto">
            {SLIDE_TYPES.map((t: SlideType) => (
              <button
                key={t}
                onClick={() => {
                  addSlide(t);
                  setPicker(false);
                }}
                className="block w-full text-left px-3 py-2 text-sm text-neutral-200 hover:bg-neutral-700"
              >
                {SLIDE_TYPE_LABELS[t]}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
