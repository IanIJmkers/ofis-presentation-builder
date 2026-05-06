export type UploadedImage = {
  src: string;
  originalW: number;
  originalH: number;
};

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function readImageDimensions(src: string): Promise<{ w: number; h: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = reject;
    img.src = src;
  });
}

export async function pickImage(): Promise<UploadedImage> {
  const file = await new Promise<File>((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const f = input.files?.[0];
      if (!f) {
        reject(new Error('No file selected'));
        return;
      }
      resolve(f);
    };
    input.click();
  });

  const src = await fileToDataUrl(file);
  let originalW = 0;
  let originalH = 0;
  try {
    const dims = await readImageDimensions(src);
    originalW = dims.w;
    originalH = dims.h;
  } catch {
    /* keep zero — callers fall back to naturalWidth/Height when needed */
  }
  return { src, originalW, originalH };
}
