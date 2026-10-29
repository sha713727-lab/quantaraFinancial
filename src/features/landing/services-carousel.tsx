"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

import { servicePath } from "@/constants/site-paths";
import { services } from "@/features/landing/content";
import { requestScrollSync } from "@/features/landing/scroll-sync.client";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const SCROLL_PER_CARD = 480;
const LAST_INDEX = services.length - 1;

function resolveActiveIndex(position: number, current: number): number {
  const lower = current - 0.55;
  const upper = current + 0.55;

  if (position >= upper && current < LAST_INDEX) {
    return Math.min(LAST_INDEX, current + 1);
  }

  if (position <= lower && current > 0) {
    return Math.max(0, current - 1);
  }

  return current;
}

export function ServicesCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
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
      { rootMargin: "240px 0px", threshold: 0.01 },
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

    let spacing = window.innerWidth < 640 ? 150 : 250;

    const context = gsap.context(() => {
      const render = (position: number) => {
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
            force3D: true,
            immediateRender: true,
          });
        });
      };

      render(activeIndexRef.current);

      const progress = { position: activeIndexRef.current };

      const tween = gsap.to(progress, {
        position: LAST_INDEX,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 5rem",
          end: `+=${SCROLL_PER_CARD * LAST_INDEX}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.35,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onRefresh: () => {
            spacing = window.innerWidth < 640 ? 150 : 250;
            render(progress.position);
          },
        },
        onUpdate: () => {
          render(progress.position);
          const next = resolveActiveIndex(
            progress.position,
            activeIndexRef.current,
          );
          if (next !== activeIndexRef.current) {
            activeIndexRef.current = next;
            setActiveIndex(next);
          }
        },
      });

      triggerRef.current = tween.scrollTrigger ?? null;
      requestScrollSync();
    }, section);

    const onResize = () => {
      spacing = window.innerWidth < 640 ? 150 : 250;
      requestScrollSync();
    };
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      triggerRef.current = null;
      context.revert();
    };
  }, [nearViewport, reduceMotion]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const goToChapter = (index: number) => {
    const trigger = triggerRef.current;

    if (!trigger) {
      const card = stageRef.current?.querySelectorAll("[data-carousel-card]")[
        index
      ];
      card?.scrollIntoView({ behavior: "smooth", inline: "center" });
      activeIndexRef.current = index;
      setActiveIndex(index);
      return;
    }

    const span = trigger.end - trigger.start;
    const target = trigger.start + (span * index) / LAST_INDEX;

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const onChapterKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToChapter(Math.min(activeIndex + 1, LAST_INDEX));
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
      className="stage-dark text-brand-cream relative z-10 scroll-mt-24 overflow-hidden"
    >
      <span className="stage-grain" aria-hidden="true" />
      <span
        className="bg-brand-navy pointer-events-none absolute inset-x-0 -top-px h-2"
        aria-hidden="true"
      />

      <p
        aria-hidden="true"
        className="ghost-index absolute right-4 -bottom-4 md:right-10"
      >
        {active.number}
      </p>

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-[1360px] flex-col justify-start px-5 pt-10 pb-12 md:px-8 md:pt-12">
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
            <div className="relative min-h-[8.5rem] sm:min-h-[9.25rem]">
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
                    className="bg-brand-cream/20 data-[active=true]:from-brand-cream data-[active=true]:to-brand-accent block h-0.5 w-4 rounded-full transition-[width,background-color] duration-300 data-[active=true]:w-10 data-[active=true]:bg-gradient-to-r"
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
                : "stage-3d relative h-[22rem] w-full transform-gpu sm:h-[24rem]"
            }
          >
            {services.map((service, index) => (
              <article
                key={service.slug}
                data-carousel-card
                className={
                  isStatic
                    ? "media-card aspect-3/4 w-[13rem] shrink-0 snap-center"
                    : "media-card absolute top-1/2 left-1/2 aspect-3/4 w-[13rem] will-change-transform backface-hidden sm:w-[16rem]"
                }
              >
                {nearViewport ? (
                  <Image
                    key={service.image}
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 640px) 16rem, 13rem"
                    priority={index < 3}
                    className="object-cover object-center"
                    onLoad={() => requestScrollSync()}
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
