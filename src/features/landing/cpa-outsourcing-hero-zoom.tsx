"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

import { CpaAbstractArtwork } from "@/features/landing/cpa-outsourcing-artwork";
import { cpaOutsourcingPage } from "@/features/landing/cpa-outsourcing-content";
import { requestScrollSync } from "@/features/landing/scroll-sync.client";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSlowConnection } from "@/hooks/use-slow-connection";

/**
 * Desktop: CSS sticky stage inside a tall track; GSAP only scrubs text/media.
 * Mobile: normal flow (Tailwind max-md), no GSAP.
 * No GSAP pin / no layout remount — safe for mid-page refresh + scroll-up.
 */
export function CpaHeroZoom() {
  const page = cpaOutsourcingPage;
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isSlow = useSlowConnection();

  useLayoutEffect(() => {
    if (reduceMotion !== false || isSlow === true) {
      return;
    }

    const section = sectionRef.current;
    const text = textRef.current;
    const media = mediaRef.current;

    if (!section || !text || !media) {
      return;
    }

    const desktop = window.matchMedia("(min-width: 768px)");
    if (!desktop.matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          // Progress 0: section top hits viewport top (sticky engages).
          // Progress 1: section bottom hits viewport top (section fully left).
          start: "top top",
          end: "bottom top",
          // Instant scrub so deep refresh / jump-scroll never leaves stale mid-values.
          scrub: true,
          invalidateOnRefresh: true,
          anticipatePin: 0,
        },
      });

      timeline
        .fromTo(
          text,
          { opacity: 1, y: 0 },
          { opacity: 0, y: -36, duration: 0.4 },
          0,
        )
        .fromTo(
          media,
          { scale: 0.94 },
          {
            scale: 1.04,
            duration: 1,
            transformOrigin: "50% 50%",
          },
          0,
        );

      requestScrollSync();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }, section);

    const onBreakpoint = () => {
      ScrollTrigger.refresh();
    };
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      desktop.removeEventListener("change", onBreakpoint);
      context.revert();
      gsap.set([text, media], { clearProps: "all" });
    };
  }, [isSlow, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative md:h-[220svh]"
      aria-label="CPA outsourcing introduction"
    >
      <div className="site-gutter relative flex flex-col pt-[calc(var(--site-header-h)+2.5rem)] pb-12 md:sticky md:top-0 md:h-svh md:overflow-hidden md:pb-8">
        <div
          ref={textRef}
          className="relative z-20 mx-auto w-full max-w-[1360px] shrink-0 text-center"
        >
          <h1 className="text-brand-navy mx-auto max-w-[24ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
            {page.hero.title}
          </h1>
          <p className="text-brand-muted mx-auto mt-5 max-w-xl text-base leading-7 sm:mt-6 sm:text-lg">
            {page.hero.body}
          </p>
        </div>

        <div className="relative z-10 mx-auto mt-10 flex min-h-0 w-full max-w-[1360px] flex-1 items-center justify-center sm:mt-12 md:mt-8">
          <div ref={mediaRef} className="overflow-hidden rounded-[4px]">
            <CpaAbstractArtwork
              className="h-[min(58svh,36rem)] w-auto max-w-[min(100vw-2.5rem,28rem)]"
              aspectClassName="aspect-[3/4]"
              imageSrc={page.heroArt.imageSrc}
              imageAlt={page.heroArt.panelTitle}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
