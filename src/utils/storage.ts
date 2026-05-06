import type { Presentation } from '../types';

const KEY = 'ofis-presentation-v1';

export function loadFromStorage(): Presentation | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Presentation;
  } catch {
    return null;
  }
}

export function saveToStorage(state: Presentation): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch (err) {
    console.warn('Failed to persist presentation', err);
  }
}

export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
