import type { Presentation } from '../types';

export function downloadJson(presentation: Presentation): void {
  const blob = new Blob([JSON.stringify(presentation, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeTitle = (presentation.title || 'presentation')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  a.download = `${safeTitle}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importJsonFile(): Promise<Presentation> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      try {
        const text = await file.text();
        const data = JSON.parse(text) as Presentation;
        if (!data.slides || !Array.isArray(data.slides)) {
          throw new Error('Invalid presentation file');
        }
        resolve(data);
      } catch (err) {
        reject(err);
      }
    };
    input.click();
  });
}
