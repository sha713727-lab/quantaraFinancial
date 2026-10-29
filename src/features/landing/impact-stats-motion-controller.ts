import {
  IMPACT_CARD_DELAYS_DESKTOP,
  IMPACT_CARD_DURATION_DESKTOP,
  IMPACT_CARD_DURATION_MOBILE,
  IMPACT_CARD_Y_DESKTOP,
  IMPACT_CARD_Y_MOBILE,
  IMPACT_HEADING_DURATION_DESKTOP,
  IMPACT_HEADING_DURATION_MOBILE,
  IMPACT_HEADING_Y_DESKTOP,
  IMPACT_HEADING_Y_MOBILE,
  isImpactMobileViewport,
} from "@/features/landing/impact-stats-motion";
import {
  createImpactCounterLoop,
  runImpactReveal,
  setImpactFinalVisual,
  settleImpactCounter,
  type ImpactCounterJob,
} from "@/features/landing/impact-stats-motion-runtime";
import {
  reconcileImpactPending,
  setupImpactObservers,
} from "@/features/landing/impact-stats-motion-setup";

type PlayedKey = "heading" | "card-0" | "card-1" | "card-2";

export function bindImpactStatsMotion(root: HTMLElement): () => void {
  const played = new Set<PlayedKey>();
  const animations = new Set<Animation>();
  const observers = new Set<IntersectionObserver>();
  const counters = new Set<ImpactCounterJob>();
  let disposed = false;
  let settleRafId = 0;
  let resizeTimer = 0;
  let scrollListening = false;

  const headingObserve = root.querySelector<HTMLElement>(
    "[data-impact-observe='heading']",
  );
  const headingAnimate = root.querySelector<HTMLElement>(
    "[data-impact-animate='heading']",
  );
  const rowObserve = root.querySelector<HTMLElement>(
    "[data-impact-observe='row']",
  );
  const cardObserves = Array.from(
    root.querySelectorAll<HTMLElement>("[data-impact-observe='card']"),
  );
  const cardAnimates = Array.from(
    root.querySelectorAll<HTMLElement>("[data-impact-animate='card']"),
  );

  const prefersReduced = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const counterLoop = createImpactCounterLoop({
    counters,
    isDisposed: () => disposed,
  });

  const allPlayed = () =>
    played.has("heading") &&
    played.has("card-0") &&
    played.has("card-1") &&
    played.has("card-2");

  const disconnectObservers = () => {
    for (const observer of observers) {
      observer.disconnect();
    }
    observers.clear();
  };

  const onScroll = () => {
    if (settleRafId || disposed) {
      return;
    }
    settleRafId = requestAnimationFrame(() => {
      settleRafId = 0;
      reconcilePending();
    });
  };

  const maybeStopScrollListen = () => {
    if (!scrollListening || !allPlayed()) {
      return;
    }
    window.removeEventListener("scroll", onScroll);
    scrollListening = false;
    disconnectObservers();
  };

  const ensureScrollListen = () => {
    if (scrollListening || allPlayed()) {
      return;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    scrollListening = true;
  };

  const settleAll = () => {
    counterLoop.stop();
    counterLoop.clearTimeouts();
    for (const animation of animations) {
      animation.cancel();
    }
    animations.clear();
    if (headingAnimate) {
      setImpactFinalVisual(headingAnimate);
      played.add("heading");
    }
    cardAnimates.forEach((el, index) => {
      setImpactFinalVisual(el);
      settleImpactCounter(el);
      played.add(`card-${index}` as PlayedKey);
    });
    maybeStopScrollListen();
  };

  const revealOpts = () => {
    const mobile = isImpactMobileViewport(window.innerWidth);
    return {
      prefersReduced: prefersReduced(),
      animations,
      isDisposed: () => disposed,
      mobile,
    };
  };

  const revealHeading = () => {
    if (played.has("heading") || !headingAnimate) {
      return;
    }
    played.add("heading");
    const { mobile, ...runtime } = revealOpts();
    runImpactReveal(
      headingAnimate,
      {
        y: mobile ? IMPACT_HEADING_Y_MOBILE : IMPACT_HEADING_Y_DESKTOP,
        duration: mobile
          ? IMPACT_HEADING_DURATION_MOBILE
          : IMPACT_HEADING_DURATION_DESKTOP,
        delay: 0,
      },
      runtime,
    );
    maybeStopScrollListen();
  };

  const revealCard = (index: number, delay: number) => {
    const key = `card-${index}` as PlayedKey;
    if (played.has(key)) {
      return;
    }
    played.add(key);
    const el = cardAnimates[index];
    if (!el) {
      return;
    }
    const { mobile, ...runtime } = revealOpts();
    runImpactReveal(
      el,
      {
        y: mobile ? IMPACT_CARD_Y_MOBILE : IMPACT_CARD_Y_DESKTOP,
        duration: mobile
          ? IMPACT_CARD_DURATION_MOBILE
          : IMPACT_CARD_DURATION_DESKTOP,
        delay,
      },
      runtime,
    );
    counterLoop.start(el, runtime.prefersReduced);
    maybeStopScrollListen();
  };

  const revealDesktopRow = () => {
    IMPACT_CARD_DELAYS_DESKTOP.forEach((delay, index) => {
      revealCard(index, delay);
    });
  };

  const reconcilePending = () => {
    reconcileImpactPending({
      played,
      headingObserve,
      rowObserve,
      cardObserves,
      prefersReduced,
      settleAll,
      revealHeading,
      revealCard,
      revealDesktopRow,
      onAllPlayed: maybeStopScrollListen,
    });
  };

  const setup = () => {
    setupImpactObservers({
      played,
      observers,
      headingObserve,
      headingAnimate,
      rowObserve,
      cardObserves,
      cardAnimates,
      prefersReduced,
      settleAll,
      revealHeading,
      revealCard,
      revealDesktopRow,
    });
    ensureScrollListen();
    reconcilePending();
  };

  setup();

  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMotionChange = () => {
    if (media.matches) {
      settleAll();
      disconnectObservers();
    }
  };
  media.addEventListener("change", onMotionChange);

  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (disposed) {
        return;
      }
      for (const animation of [...animations]) {
        animation.finish();
      }
      counterLoop.stop();
      cardAnimates.forEach((el, index) => {
        if (played.has(`card-${index}` as PlayedKey)) {
          settleImpactCounter(el);
        }
      });
      setup();
    }, 120);
  };
  window.addEventListener("resize", onResize);

  const onVisibility = () => {
    if (document.visibilityState === "hidden") {
      for (const animation of [...animations]) {
        animation.finish();
      }
      counterLoop.stop();
      cardAnimates.forEach((el, index) => {
        if (played.has(`card-${index}` as PlayedKey)) {
          settleImpactCounter(el);
          setImpactFinalVisual(el);
        }
      });
      if (headingAnimate && played.has("heading")) {
        setImpactFinalVisual(headingAnimate);
      }
    } else {
      reconcilePending();
    }
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onPageShow = (event: PageTransitionEvent) => {
    if (event.persisted) {
      settleAll();
      disconnectObservers();
    }
  };
  window.addEventListener("pageshow", onPageShow);

  return () => {
    disposed = true;
    window.clearTimeout(resizeTimer);
    if (settleRafId) {
      cancelAnimationFrame(settleRafId);
    }
    counterLoop.stop();
    counterLoop.clearTimeouts();
    disconnectObservers();
    for (const animation of animations) {
      animation.cancel();
    }
    animations.clear();
    if (scrollListening) {
      window.removeEventListener("scroll", onScroll);
    }
    media.removeEventListener("change", onMotionChange);
    window.removeEventListener("resize", onResize);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pageshow", onPageShow);
  };
}
