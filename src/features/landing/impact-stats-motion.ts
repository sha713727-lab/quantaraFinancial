export const IMPACT_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export const IMPACT_MOBILE_MAX = 767;

/** Fraction of viewport height below which an element must sit to be “above” the trigger. */
export const IMPACT_HEADING_ROW_MARGIN_RATIO = 0.16;
export const IMPACT_MOBILE_CARD_MARGIN_RATIO = 0.1;

export const IMPACT_HEADING_DURATION_DESKTOP = 600;
export const IMPACT_HEADING_DURATION_MOBILE = 480;
export const IMPACT_HEADING_Y_DESKTOP = 24;
export const IMPACT_HEADING_Y_MOBILE = 16;

export const IMPACT_CARD_DURATION_DESKTOP = 700;
export const IMPACT_CARD_DURATION_MOBILE = 560;
export const IMPACT_CARD_Y_DESKTOP = 28;
export const IMPACT_CARD_Y_MOBILE = 20;
export const IMPACT_CARD_DELAYS_DESKTOP = [0, 120, 240] as const;

export const IMPACT_COUNTER_DURATION = 720;
export const IMPACT_COUNTER_DELAY = 160;

export function isImpactMobileViewport(width: number): boolean {
  return width <= IMPACT_MOBILE_MAX;
}

export function impactRootMarginBottom(
  viewportHeight: number,
  ratio: number,
): string {
  const px = Math.round(viewportHeight * ratio);
  return `0px 0px -${px}px 0px`;
}

export function formatImpactCounter(value: number): string {
  return String(value).padStart(2, "0");
}

export function easedCounterProgress(
  elapsedMs: number,
  durationMs: number,
): number {
  const p = Math.min(Math.max(elapsedMs / durationMs, 0), 1);
  return 1 - (1 - p) ** 3;
}

export function counterValueAt(
  target: number,
  elapsedMs: number,
  durationMs: number,
): number {
  if (elapsedMs >= durationMs) {
    return target;
  }
  const eased = easedCounterProgress(elapsedMs, durationMs);
  return Math.min(target, Math.floor(target * eased));
}

export function isAboveTriggerLine(
  elementTop: number,
  viewportHeight: number,
  marginRatio: number,
): boolean {
  const triggerY = viewportHeight * (1 - marginRatio);
  return elementTop <= triggerY;
}
