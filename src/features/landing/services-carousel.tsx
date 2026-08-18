"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { servicePath } from "@/constants/site-paths";
import { services } from "@/features/landing/content";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SCROLL_PER_CARD = 480;

export function ServicesCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const reduceMotion = usePrefersReducedMotion();
  const isStatic = reduceMotion === true;
  const [nearViewport, setNearViewport] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true);
        }
      },
      { rootMargin: "0px", threshold: 0.01 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!nearViewport || reduceMotion !== false) {
      return;
    }

    const section = sectionRef.current;
    const stage = stageRef.current;

    if (!section || !stage) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const cards = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-carousel-card]"),
    );

    const context = gsap.context(() => {
      const render = (position: number) => {
        const spacing = window.innerWidth < 640 ? 150 : 250;

        cards.forEach((card, index) => {
          const distance = index - position;
          const magnitude = Math.abs(distance);

          gsap.set(card, {
            xPercent: -50,
            yPercent: -50,
            x: distance * spacing,
            z: -magnitude * 260,
            rotateY: -distance * 26,
            opacity: Math.max(0, 1 - magnitude * 0.42),
            zIndex: 100 - Math.round(magnitude * 10),
          });
        });
      };

      render(0);

      const progress = { position: 0 };

      const tween = gsap.to(progress, {
        position: services.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 5rem",
          end: `+=${SCROLL_PER_CARD * (services.length - 1)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          render(progress.position);
          setActiveIndex(Math.round(progress.position));
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;
    }, section);

    return () => {
      triggerRef.current = null;
      context.revert();
    };
  }, [nearViewport, reduceMotion]);

  const goToChapter = (index: number) => {
    const trigger = triggerRef.current;

    if (!trigger) {
      const card = stageRef.current?.querySelectorAll("[data-carousel-card]")[
        index
      ];
      card?.scrollIntoView({ behavior: "smooth", inline: "center" });
      setActiveIndex(index);
      return;
    }

    const span = trigger.end - trigger.start;
    const target = trigger.start + (span * index) / (services.length - 1);

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const onChapterKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToChapter(Math.min(activeIndex + 1, services.length - 1));
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToChapter(Math.max(activeIndex - 1, 0));
    }
  };

  const active = services[activeIndex] ?? services[0];

  if (!active) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="practice-areas-title"
      className="stage-dark text-brand-cream relative scroll-mt-24 overflow-hidden"
    >
      <span className="stage-grain" aria-hidden="true" />

      <p
        aria-hidden="true"
        className="ghost-index absolute right-4 -bottom-4 md:right-10"
      >
        {active.number}
      </p>

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1360px] flex-col justify-start px-5 pt-10 pb-12 md:px-8 md:pt-12">
        <div className="relative text-center">
          <h2
            id="practice-areas-title"
            className="mx-auto max-w-full text-[clamp(0.72rem,calc((100vw-2.75rem)/22),2.65rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic"
          >
            <span className="text-brand-cream/85 block min-[360px]:whitespace-nowrap">
              Accounting &amp; Advisory
            </span>
            <span className="text-brand-cream block min-[360px]:whitespace-nowrap">
              For Leadership Teams
            </span>
          </h2>
          <p className="text-brand-cream/85 mx-auto mt-3 max-w-xl text-sm leading-7">
            From audit and taxation to ERP and outsourcing — scoped to the
            decision you need to make.
          </p>
        </div>

        <div className="mt-8 grid items-center gap-8 lg:mt-10 lg:grid-cols-[minmax(18rem,24rem)_1fr] lg:gap-10">
          <div>
            <div
              key={active.slug}
              className="animate-in fade-in-0 slide-in-from-bottom-3 duration-500"
            >
              <h3 className="text-2xl leading-[1.15] font-bold tracking-[-0.03em] sm:text-3xl">
                {active.headline}
              </h3>
              <p className="text-brand-cream/85 mt-3 text-sm leading-7 italic">
                {active.statement}
              </p>
            </div>

            <Link
              href={servicePath(active.slug)}
              className="bg-brand-cream text-brand-navy focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy mt-6 inline-flex min-h-12 items-center gap-2 rounded-full px-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {active.ctaLabel}
              <span aria-hidden="true">&rarr;</span>
            </Link>

            <nav
              aria-label="Practice areas"
              className="mt-7 flex items-center gap-2"
              onKeyDown={onChapterKeyDown}
            >
              {services.map((service, index) => (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => goToChapter(index)}
                  aria-current={index === activeIndex ? true : undefined}
                  className="focus-visible:ring-brand-cream grid size-12 place-items-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
                >
                  <span
                    data-active={index === activeIndex}
                    className="bg-brand-cream/20 group-hover:bg-brand-cream/50 group-focus-visible:ring-brand-cream data-[active=true]:from-brand-cream data-[active=true]:to-brand-accent block h-0.5 w-4 rounded-full transition-all duration-500 group-focus-visible:ring-2 data-[active=true]:w-10 data-[active=true]:bg-gradient-to-r"
                  />
                  <span className="sr-only">{service.title}</span>
                </button>
              ))}
            </nav>
          </div>

          <div
            ref={stageRef}
            className={
              isStatic
                ? "flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "stage-3d relative h-[22rem] w-full sm:h-[24rem]"
            }
          >
            {services.map((service) => (
              <article
                key={service.slug}
                data-carousel-card
                className={
                  isStatic
                    ? "media-card aspect-3/4 w-[13rem] shrink-0 snap-center"
                    : "media-card absolute top-1/2 left-1/2 aspect-3/4 w-[13rem] sm:w-[16rem]"
                }
              >
                {nearViewport ? (
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 640px) 16rem, 13rem"
                    loading="lazy"
                    className="object-cover"
                  />
                ) : (
                  <div
                    className="bg-deep absolute inset-0"
                    aria-hidden="true"
                  />
                )}
                <span className="media-card-gloss" aria-hidden="true" />
                <h3 className="sr-only">{service.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
