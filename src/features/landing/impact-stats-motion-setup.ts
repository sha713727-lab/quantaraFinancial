import {
  IMPACT_CARD_Y_DESKTOP,
  IMPACT_CARD_Y_MOBILE,
  IMPACT_HEADING_ROW_MARGIN_RATIO,
  IMPACT_HEADING_Y_DESKTOP,
  IMPACT_HEADING_Y_MOBILE,
  IMPACT_MOBILE_CARD_MARGIN_RATIO,
  impactRootMarginBottom,
  isAboveTriggerLine,
  isImpactMobileViewport,
} from "@/features/landing/impact-stats-motion";
import {
  armImpactCounter,
  observeImpactOnce,
  setImpactArmedVisual,
  setImpactFinalVisual,
  settleImpactCounter,
} from "@/features/landing/impact-stats-motion-runtime";

type PlayedKey = "heading" | "card-0" | "card-1" | "card-2";

export function setupImpactObservers(options: {
  played: Set<PlayedKey>;
  observers: Set<IntersectionObserver>;
  headingObserve: HTMLElement | null;
  headingAnimate: HTMLElement | null;
  rowObserve: HTMLElement | null;
  cardObserves: HTMLElement[];
  cardAnimates: HTMLElement[];
  prefersReduced: () => boolean;
  settleAll: () => void;
  revealHeading: () => void;
  revealCard: (index: number, delay: number) => void;
  revealDesktopRow: () => void;
}): void {
  const {
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
  } = options;

  for (const observer of observers) {
    observer.disconnect();
  }
  observers.clear();

  if (prefersReduced()) {
    settleAll();
    return;
  }

  const mobile = isImpactMobileViewport(window.innerWidth);
  const headingY = mobile ? IMPACT_HEADING_Y_MOBILE : IMPACT_HEADING_Y_DESKTOP;
  const cardY = mobile ? IMPACT_CARD_Y_MOBILE : IMPACT_CARD_Y_DESKTOP;
  const vh = window.innerHeight;

  const observe = (target: HTMLElement, ratio: number, onHit: () => void) => {
    observeImpactOnce(
      target,
      impactRootMarginBottom(vh, ratio),
      observers,
      onHit,
    );
  };

  if (headingObserve && headingAnimate && !played.has("heading")) {
    const needsArm = !isAboveTriggerLine(
      headingObserve.getBoundingClientRect().top,
      vh,
      IMPACT_HEADING_ROW_MARGIN_RATIO,
    );
    if (needsArm) {
      setImpactArmedVisual(headingAnimate, headingY);
      observe(headingObserve, IMPACT_HEADING_ROW_MARGIN_RATIO, revealHeading);
    } else {
      played.add("heading");
      setImpactFinalVisual(headingAnimate);
    }
  }

  if (mobile) {
    cardObserves.forEach((observeEl, index) => {
      const key = `card-${index}` as PlayedKey;
      const animateEl = cardAnimates[index];
      if (!animateEl || played.has(key)) {
        return;
      }
      const needsArm = !isAboveTriggerLine(
        observeEl.getBoundingClientRect().top,
        vh,
        IMPACT_MOBILE_CARD_MARGIN_RATIO,
      );
      if (needsArm) {
        setImpactArmedVisual(animateEl, cardY);
        armImpactCounter(animateEl);
        observe(observeEl, IMPACT_MOBILE_CARD_MARGIN_RATIO, () => {
          revealCard(index, 0);
        });
      } else {
        played.add(key);
        setImpactFinalVisual(animateEl);
        settleImpactCounter(animateEl);
      }
    });
    return;
  }

  if (!rowObserve) {
    return;
  }

  const needsArm = !isAboveTriggerLine(
    rowObserve.getBoundingClientRect().top,
    vh,
    IMPACT_HEADING_ROW_MARGIN_RATIO,
  );
  let anyPending = false;
  cardAnimates.forEach((animateEl, index) => {
    const key = `card-${index}` as PlayedKey;
    if (played.has(key)) {
      return;
    }
    if (needsArm) {
      setImpactArmedVisual(animateEl, cardY);
      armImpactCounter(animateEl);
      anyPending = true;
    } else {
      played.add(key);
      setImpactFinalVisual(animateEl);
      settleImpactCounter(animateEl);
    }
  });
  if (anyPending) {
    observe(rowObserve, IMPACT_HEADING_ROW_MARGIN_RATIO, revealDesktopRow);
  }
}

export function reconcileImpactPending(options: {
  played: Set<PlayedKey>;
  headingObserve: HTMLElement | null;
  rowObserve: HTMLElement | null;
  cardObserves: HTMLElement[];
  prefersReduced: () => boolean;
  settleAll: () => void;
  revealHeading: () => void;
  revealCard: (index: number, delay: number) => void;
  revealDesktopRow: () => void;
  onAllPlayed?: () => void;
}): void {
  const {
    played,
    headingObserve,
    rowObserve,
    cardObserves,
    prefersReduced,
    settleAll,
    revealHeading,
    revealCard,
    revealDesktopRow,
    onAllPlayed,
  } = options;

  if (prefersReduced()) {
    settleAll();
    return;
  }

  const mobile = isImpactMobileViewport(window.innerWidth);
  const vh = window.innerHeight;

  if (
    !played.has("heading") &&
    headingObserve &&
    isAboveTriggerLine(
      headingObserve.getBoundingClientRect().top,
      vh,
      IMPACT_HEADING_ROW_MARGIN_RATIO,
    )
  ) {
    revealHeading();
  }

  if (mobile) {
    cardObserves.forEach((observeEl, index) => {
      if (played.has(`card-${index}` as PlayedKey)) {
        return;
      }
      if (
        isAboveTriggerLine(
          observeEl.getBoundingClientRect().top,
          vh,
          IMPACT_MOBILE_CARD_MARGIN_RATIO,
        )
      ) {
        revealCard(index, 0);
      }
    });
  } else if (
    !played.has("card-0") &&
    rowObserve &&
    isAboveTriggerLine(
      rowObserve.getBoundingClientRect().top,
      vh,
      IMPACT_HEADING_ROW_MARGIN_RATIO,
    )
  ) {
    revealDesktopRow();
  }

  if (
    played.has("heading") &&
    played.has("card-0") &&
    played.has("card-1") &&
    played.has("card-2")
  ) {
    onAllPlayed?.();
  }
}
