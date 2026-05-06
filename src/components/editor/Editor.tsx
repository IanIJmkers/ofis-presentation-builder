import Toolbar from './Toolbar';
import SlideThumbnails from './SlideThumbnails';
import SlideCanvas from './SlideCanvas';
import Inspector from './Inspector';

export default function Editor() {
  return (
    <div className="h-screen w-screen flex flex-col bg-neutral-950">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <SlideThumbnails />
        <SlideCanvas />
        <Inspector />
      </div>
    </div>
  );
}
