"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { services } from "@/features/landing/content";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const FAN_GEOMETRY = {
  mobile: { pivot: 720, step: 13, start: 28, end: -28 },
  desktop: { pivot: 1040, step: 9, start: 34, end: -34 },
} as const;

export function ServicesFanSection() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isStatic = reduceMotion === true;

  useEffect(() => {
    if (reduceMotion !== false) {
      return;
    }

    const runway = runwayRef.current;
    const fan = fanRef.current;

    if (!runway || !fan) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cards = Array.from(
      fan.querySelectorAll<HTMLElement>("[data-fan-card]"),
    );
    const inners = cards.map((card) =>
      card.querySelector<HTMLElement>("[data-fan-inner]"),
    );
    const lastIndex = Math.max(cards.length - 1, 1);

    const context = gsap.context(() => {
      let pivot: number = FAN_GEOMETRY.desktop.pivot;
      let step: number = FAN_GEOMETRY.desktop.step;
      let startAngle: number = FAN_GEOMETRY.desktop.start;
      let endAngle: number = FAN_GEOMETRY.desktop.end;

      const layout = () => {
        const geometry =
          window.innerWidth < 640 ? FAN_GEOMETRY.mobile : FAN_GEOMETRY.desktop;

        pivot = geometry.pivot;
        step = geometry.step;
        startAngle = geometry.start;
        endAngle = geometry.end;

        gsap.set(fan, { transformOrigin: `50% ${pivot}px` });
        cards.forEach((card, index) => {
          gsap.set(card, {
            xPercent: -50,
            transformOrigin: `50% ${pivot}px`,
            rotation: index * step,
          });
        });
      };

      const render = (progress: number) => {
        const spread = step * lastIndex;
        const fanRotation =
          startAngle + (endAngle - spread - startAngle) * progress;

        gsap.set(fan, { rotation: fanRotation });

        cards.forEach((_, index) => {
          const inner = inners[index];

          if (!inner) {
            return;
          }

          const worldAngle = fanRotation + index * step;
          const falloff = Math.min(Math.abs(worldAngle) / (step * 2.4), 1);

          gsap.set(inner, {
            autoAlpha: 1 - falloff * 0.78,
            scale: 1.06 - falloff * 0.2,
          });
        });
      };

      layout();
      render(0);

      const progress = { value: 0 };

      gsap.to(progress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            layout();
          },
        },
        onUpdate: () => render(progress.value),
      });
    }, runway);

    return () => context.revert();
  }, [reduceMotion]);

  return (
    <section
      id="services-fan"
      aria-labelledby="services-fan-title"
      className="relative overflow-x-clip"
    >
      <div
        ref={runwayRef}
        className={isStatic ? "relative" : "relative h-[460svh]"}
      >
        <div
          className={
            isStatic
              ? "relative overflow-hidden px-5 py-20 md:px-8"
              : "sticky top-20 flex flex-col overflow-x-clip overflow-y-visible px-5 pt-2 pb-8 md:px-8 md:pb-10"
          }
        >
          <div
            className="hero-glow hero-glow-primary top-40 -left-40 size-[32rem] sm:size-[42rem]"
            aria-hidden="true"
          />
          <div
            className="hero-glow hero-glow-secondary top-[22rem] -right-24 size-[24rem] sm:size-[32rem]"
            aria-hidden="true"
          />

          <div className="relative mx-auto w-full max-w-5xl text-center">
            <h2
              id="services-fan-title"
              className="mx-auto max-w-full text-[clamp(0.72rem,calc((100vw-2.75rem)/22),2.65rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic"
            >
              <span className="text-brand-navy/60 block whitespace-nowrap">
                Audit, Tax, Advisory
              </span>
              <span className="text-brand-accent block whitespace-nowrap">
                For Growing Businesses
              </span>
            </h2>
            <p className="text-brand-muted mx-auto mt-3 max-w-xl px-1 text-sm leading-6 sm:text-base sm:leading-7">
              Independent assurance, taxation, corporate advisory, outsourcing,
              and ERP for corporates, SMEs, and founders.
            </p>
            {!isStatic && (
              <p className="text-brand-muted/70 mt-3 text-[0.7rem] font-semibold tracking-[0.2em] uppercase sm:hidden">
                Scroll to fan through each service.
              </p>
            )}
          </div>

          <div
            ref={fanRef}
            className={
              isStatic
                ? "relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "relative mt-6 h-[20rem] w-full sm:mt-8 sm:h-[24rem]"
            }
          >
            {services.map((service) => (
              <article
                key={service.slug}
                data-fan-card
                className={
                  isStatic
                    ? "w-[13.5rem] shrink-0 snap-center sm:w-[16.5rem]"
                    : "absolute top-0 left-1/2 w-[13.5rem] sm:w-[16.5rem]"
                }
              >
                <div data-fan-inner>
                  <div className="media-card aspect-3/4">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 640px) 16.5rem, 13.5rem"
                      priority
                      className="object-cover"
                    />
                    <h3 className="sr-only">{service.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
