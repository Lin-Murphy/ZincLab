export const clampIndex = (index: number, count: number) => Math.max(0, Math.min(count - 1, index));

export const nextLoopIndex = (index: number, count: number) => count > 0 ? (index + 1) % count : 0;

export function targetFromDelta(index: number, delta: number, threshold: number, count: number) {
  if (Math.abs(delta) < threshold) return index;
  return clampIndex(index + (delta > 0 ? 1 : -1), count);
}

export function shouldQueuePreload(input: {
  saveData?: boolean;
  effectiveType?: string;
  currentReadyState: number;
  currentIsBuffering: boolean;
}) {
  if (input.saveData || input.currentIsBuffering || input.currentReadyState < 3) return false;
  return !['slow-2g', '2g'].includes(input.effectiveType ?? '');
}
