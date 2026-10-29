"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type Ref,
} from "react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "li";

function isNearViewport(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const vh = window.innerHeight || 0;
  return rect.top < vh * 0.92 && rect.bottom > vh * -0.05;
}

export function Reveal({
  children,
  className,
  delayMs = 0,
  y = 18,
  as = "div",
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delayMs?: number;
  readonly y?: number;
  readonly as?: RevealTag;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion === null) {
      return;
    }

    if (reduceMotion === true) {
      node.dataset.visible = "true";
      delete node.dataset.revealReady;
      return;
    }

    // Already on screen (or nearly): keep baseline visible, never arm-hide.
    if (isNearViewport(node)) {
      node.dataset.visible = "true";
      delete node.dataset.revealReady;
      return;
    }

    // Offscreen only: arm the entrance state after init.
    node.dataset.revealReady = "true";
    delete node.dataset.visible;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }
        node.dataset.visible = "true";
        delete node.dataset.revealReady;
        observer.disconnect();
        window.setTimeout(() => {
          node.style.willChange = "auto";
        }, 700);
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const style = {
    "--reveal-delay": `${delayMs}ms`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;

  const classNames = cn("reveal-on-scroll", className);

  if (as === "li") {
    return (
      <li ref={ref as Ref<HTMLLIElement>} style={style} className={classNames}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref as Ref<HTMLDivElement>} style={style} className={classNames}>
      {children}
    </div>
  );
}
