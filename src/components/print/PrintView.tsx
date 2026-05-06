import { useEffect } from 'react';
import { usePresentation } from '../../store/usePresentation';
import SlideRenderer from '../slides/SlideRenderer';

export default function PrintView() {
  const { presentation } = usePresentation();

  useEffect(() => {
    document.body.style.background = 'white';
    const t = setTimeout(() => {
      window.print();
    }, 400);
    return () => {
      clearTimeout(t);
      document.body.style.background = '';
    };
  }, []);

  return (
    <div className="print-root" style={{ background: 'white', minHeight: '100vh' }}>
      {presentation.slides.map((slide, i) => (
        <div
          key={slide.id}
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '20px 0',
          }}
        >
          <SlideRenderer
            slide={slide}
            brand={presentation.brand}
            index={i}
            editable={false}
            onChange={() => {}}
          />
        </div>
      ))}
    </div>
  );
}
