import { useEffect, useState } from 'react';
import { usePresentation } from '../../store/usePresentation';
import { downloadJson, importJsonFile } from '../../utils/exportJson';
import { DEFAULT_LOGO_MARK } from '../../brand/assets';

export default function Toolbar() {
  const { presentation, setTitle, setPresentation } = usePresentation();
  const [savedAt, setSavedAt] = useState<number>(Date.now());

  // Track saves: any presentation change triggers debounced save in store; mark indicator when state changes.
  useEffect(() => {
    setSavedAt(Date.now());
  }, [presentation]);

  const openPrint = () => {
    const win = window.open('/print', '_blank');
    if (!win) {
      // Pop-up blocked - fall back to navigating in same tab
      window.location.href = '/print';
    }
  };

  return (
    <div className="h-12 bg-neutral-900 border-b border-neutral-800 flex items-center px-4 gap-4 editor-chrome flex-shrink-0">
      <div className="flex items-center gap-2">
        <img
          src={DEFAULT_LOGO_MARK}
          alt="Orchestra"
          className="h-6 w-auto"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <span className="text-neutral-300 text-sm font-medium">Presentation Builder</span>
      </div>
      <input
        type="text"
        title="Presentatie titel"
        placeholder="Naam van presentatie"
        value={presentation.title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-transparent border-b border-transparent hover:border-neutral-700 focus:border-amber-400 text-neutral-100 text-sm py-1 px-2 outline-none flex-1 max-w-md"
      />
      <span className="text-xs text-neutral-500">
        {Math.max(0, Math.round((Date.now() - savedAt) / 1000))}s geleden opgeslagen
      </span>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={async () => {
            try {
              const p = await importJsonFile();
              setPresentation(p);
            } catch (err) {
              alert('Import mislukt: ' + (err as Error).message);
            }
          }}
          className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded hover:bg-neutral-800"
        >
          Import JSON
        </button>
        <button
          onClick={() => downloadJson(presentation)}
          className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded hover:bg-neutral-800"
        >
          Export JSON
        </button>
        <button
          onClick={openPrint}
          className="bg-amber-500 hover:bg-amber-400 text-neutral-900 font-semibold text-xs px-4 py-1.5 rounded"
        >
          Print → PDF
        </button>
      </div>
    </div>
  );
}
