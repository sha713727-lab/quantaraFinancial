"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { CpaAbstractArtwork } from "@/features/landing/cpa-outsourcing-artwork";
import { cpaOutsourcingPage } from "@/features/landing/cpa-outsourcing-content";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function CpaHeroZoom() {
  const page = cpaOutsourcingPage;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mediaSlotRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reduceMotion !== false) {
      return;
    }

    const section = sectionRef.current;
    const pin = pinRef.current;
    const text = textRef.current;
    const slot = mediaSlotRef.current;
    const media = mediaRef.current;

    if (!section || !pin || !text || !slot || !media) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const placeMediaInSlot = () => {
        const pinBox = pin.getBoundingClientRect();
        const slotBox = slot.getBoundingClientRect();

        gsap.set(media, {
          top: slotBox.top - pinBox.top,
          left: slotBox.left - pinBox.left,
          width: slotBox.width,
          height: Math.max(slotBox.height, 220),
          borderRadius: 4,
        });
      };

      placeMediaInSlot();
      gsap.set(text, { opacity: 1, y: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.7,
          pin: pin,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: placeMediaInSlot,
        },
      });

      timeline
        .to(
          text,
          {
            opacity: 0,
            y: -40,
            ease: "none",
            duration: 0.35,
          },
          0,
        )
        .to(
          media,
          {
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 0,
            ease: "none",
            duration: 1,
          },
          0.05,
        );
    }, section);

    return () => {
      context.revert();
    };
  }, [reduceMotion]);

  const isStatic = reduceMotion !== false;

  const artwork = (
    <CpaAbstractArtwork
      {...(isStatic ? {} : { className: "h-full min-h-full" })}
      aspectClassName={
        isStatic ? "aspect-[3/2]" : "h-full min-h-full !aspect-auto"
      }
      imageSrc={page.heroArt.imageSrc}
      priority
      panelTitle={page.heroArt.panelTitle}
      panelLabel={page.heroArt.panelLabel}
    />
  );

  return (
    <section
      ref={sectionRef}
      className={isStatic ? "relative" : "relative h-[250svh]"}
      aria-label="CPA outsourcing introduction"
    >
      <div
        ref={pinRef}
        className={
          isStatic
            ? "relative px-[clamp(1.25rem,3vw,4rem)] pt-[clamp(7.5rem,14vw,10rem)] pb-[clamp(3rem,6vw,5rem)]"
            : "relative flex h-svh flex-col overflow-hidden px-[clamp(1.25rem,3vw,4rem)] pt-[clamp(5.5rem,10vw,7.5rem)] pb-8"
        }
      >
        <div
          ref={textRef}
          className="relative z-20 mx-auto w-full max-w-[1600px] shrink-0 text-center"
        >
          <h1 className="text-brand-navy mx-auto max-w-[24ch] text-[clamp(2rem,5vw,3.75rem)] leading-[1.12] font-semibold tracking-[-0.03em]">
            {page.hero.title}
          </h1>
          <p className="text-brand-muted mx-auto mt-6 max-w-xl text-base leading-7 sm:text-lg">
            {page.hero.body}
          </p>
        </div>

        <div
          ref={mediaSlotRef}
          className={
            isStatic
              ? "relative z-10 mx-auto mt-16 w-full max-w-[1600px] overflow-hidden rounded-[4px] sm:mt-20"
              : "pointer-events-none relative z-0 mx-auto mt-14 min-h-0 w-full max-w-[1600px] flex-1 sm:mt-20"
          }
          aria-hidden={!isStatic ? true : undefined}
        >
          {isStatic ? artwork : null}
        </div>

        {!isStatic ? (
          <div
            ref={mediaRef}
            className="pointer-events-none absolute z-10 overflow-hidden will-change-[width,height,top,left,border-radius]"
          >
            {artwork}
          </div>
        ) : null}
      </div>
    </section>
  );
}
