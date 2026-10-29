import {
  IMPACT_COUNTER_DELAY,
  IMPACT_COUNTER_DURATION,
  IMPACT_EASE,
  counterValueAt,
  formatImpactCounter,
} from "@/features/landing/impact-stats-motion";

export type ImpactCounterJob = {
  el: HTMLElement;
  target: number;
  start: number;
  last: number;
};

export function setImpactFinalVisual(el: HTMLElement): void {
  el.style.opacity = "1";
  el.style.transform = "none";
  el.style.willChange = "";
}

export function setImpactArmedVisual(el: HTMLElement, y: number): void {
  el.style.opacity = "0";
  el.style.transform = `translate3d(0, ${y}px, 0)`;
}

export function readImpactCounterTarget(card: HTMLElement): {
  el: HTMLElement;
  target: number;
} | null {
  const el = card.querySelector<HTMLElement>("[data-impact-counter]");
  if (!el) {
    return null;
  }
  const target = Number(el.dataset.impactCounter);
  if (!Number.isFinite(target)) {
    return null;
  }
  return { el, target };
}

export function writeImpactCounter(el: HTMLElement, value: number): void {
  el.textContent = formatImpactCounter(value);
}

export function armImpactCounter(card: HTMLElement): void {
  const found = readImpactCounterTarget(card);
  if (found) {
    writeImpactCounter(found.el, 0);
  }
}

export function settleImpactCounter(card: HTMLElement): void {
  const found = readImpactCounterTarget(card);
  if (found) {
    writeImpactCounter(found.el, found.target);
  }
}

export function createImpactCounterLoop(options: {
  counters: Set<ImpactCounterJob>;
  isDisposed: () => boolean;
}): {
  start: (card: HTMLElement, prefersReduced: boolean) => void;
  stop: () => void;
  clearTimeouts: () => void;
} {
  const { counters, isDisposed } = options;
  const timeouts = new Set<number>();
  let rafId = 0;

  const stop = () => {
    counters.clear();
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  const clearTimeouts = () => {
    for (const timeoutId of timeouts) {
      window.clearTimeout(timeoutId);
    }
    timeouts.clear();
  };

  const tick = (now: number) => {
    rafId = 0;
    for (const job of [...counters]) {
      const value = counterValueAt(
        job.target,
        now - job.start,
        IMPACT_COUNTER_DURATION,
      );
      if (value !== job.last) {
        job.last = value;
        writeImpactCounter(job.el, value);
      }
      if (value >= job.target) {
        writeImpactCounter(job.el, job.target);
        counters.delete(job);
      }
    }
    if (counters.size > 0) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const start = (card: HTMLElement, prefersReduced: boolean) => {
    const found = readImpactCounterTarget(card);
    if (!found) {
      return;
    }
    if (prefersReduced) {
      writeImpactCounter(found.el, found.target);
      return;
    }
    writeImpactCounter(found.el, 0);
    const timeoutId = window.setTimeout(() => {
      timeouts.delete(timeoutId);
      if (isDisposed()) {
        return;
      }
      counters.add({
        el: found.el,
        target: found.target,
        start: performance.now(),
        last: -1,
      });
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    }, IMPACT_COUNTER_DELAY);
    timeouts.add(timeoutId);
  };

  return { start, stop, clearTimeouts };
}

export function runImpactReveal(
  el: HTMLElement,
  opts: { y: number; duration: number; delay: number },
  options: {
    prefersReduced: boolean;
    animations: Set<Animation>;
    isDisposed: () => boolean;
  },
): void {
  if (options.prefersReduced) {
    setImpactFinalVisual(el);
    return;
  }
  el.style.willChange = "transform, opacity";
  const animation = el.animate(
    [
      { opacity: 0, transform: `translate3d(0, ${opts.y}px, 0)` },
      { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ],
    {
      duration: opts.duration,
      delay: opts.delay,
      easing: IMPACT_EASE,
      fill: "forwards",
    },
  );
  options.animations.add(animation);
  animation.finished
    .then(() => {
      options.animations.delete(animation);
      if (options.isDisposed()) {
        return;
      }
      setImpactFinalVisual(el);
      animation.cancel();
    })
    .catch(() => {
      options.animations.delete(animation);
      setImpactFinalVisual(el);
    });
}

export function observeImpactOnce(
  target: HTMLElement,
  rootMargin: string,
  observers: Set<IntersectionObserver>,
  onHit: () => void,
): void {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry?.isIntersecting) {
        return;
      }
      observer.disconnect();
      observers.delete(observer);
      onHit();
    },
    { root: null, threshold: 0, rootMargin },
  );
  observers.add(observer);
  observer.observe(target);
}
