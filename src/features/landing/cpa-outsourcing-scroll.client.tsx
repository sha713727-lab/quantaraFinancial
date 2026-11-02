"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, type ReactNode } from "react";

import { requestScrollSync } from "@/features/landing/scroll-sync.client";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function CpaReveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
}) {
  return (
    <div
      className={cn(className)}
      data-cpa-reveal=""
      data-cpa-delay={delay}
      data-cpa-y={y}
    >
      {children}
    </div>
  );
}

export function CpaScrollRoot({ children }: { readonly children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion === null) {
      return;
    }

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-cpa-reveal]"),
    );

    if (reduceMotion === true) {
      nodes.forEach((node) => {
        node.style.opacity = "1";
        node.style.transform = "none";
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      nodes.forEach((node) => {
        const delay = Number(node.dataset.cpaDelay ?? 0) / 1000;
        const y = Number(node.dataset.cpaY ?? 28);

        node.style.willChange = "opacity, transform";

        gsap.fromTo(
          node,
          { opacity: 0, y: Number.isFinite(y) ? y : 28, force3D: true },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: Number.isFinite(delay) ? delay : 0,
            ease: "power3.out",
            overwrite: "auto",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              once: true,
              toggleActions: "play none none none",
            },
            onComplete: () => {
              gsap.set(node, { clearProps: "transform" });
              node.style.willChange = "auto";
            },
          },
        );
      });

      requestScrollSync();
    }, root);

    return () => {
      context.revert();
    };
  }, [reduceMotion]);

  return <div ref={rootRef}>{children}</div>;
}
