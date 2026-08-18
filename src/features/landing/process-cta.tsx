"use client";

import { useEffect, useRef, useState } from "react";

import { processSteps } from "@/features/landing/content";

function ProcessCard({
  step,
  index,
}: {
  readonly step: (typeof processSteps)[number];
  readonly index: number;
}) {
  const isAccent = index % 2 === 1;

  return (
    <article
      className={
        isAccent
          ? "from-brand-cream via-brand-gold-mid to-brand-gold text-brand-navy relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.75rem] bg-gradient-to-br p-7 sm:min-h-[20rem] sm:p-8"
          : "bg-brand-navy text-brand-cream relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-[1.75rem] p-7 sm:min-h-[20rem] sm:p-8"
      }
    >
      <span
        aria-hidden="true"
        className={
          isAccent
            ? "text-brand-navy/55 pointer-events-none absolute -top-3 -left-1 text-[clamp(6.5rem,14vw,8.5rem)] leading-none font-bold tracking-[-0.06em] select-none"
            : "text-brand-cream/40 pointer-events-none absolute -top-3 -left-1 text-[clamp(6.5rem,14vw,8.5rem)] leading-none font-bold tracking-[-0.06em] select-none"
        }
      >
        {step.number}
      </span>

      <div className="relative z-10 mt-auto flex flex-col justify-end pt-16">
        <h3 className="text-xl font-bold tracking-[-0.02em] uppercase sm:text-2xl">
          {step.title}
        </h3>
        <p
          className={
            isAccent
              ? "text-brand-navy/70 mt-4 max-w-[18rem] text-sm leading-7"
              : "text-brand-cream/85 mt-4 max-w-[18rem] text-sm leading-7"
          }
        >
          {step.description}
        </p>
      </div>
    </article>
  );
}

export function ProcessSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const updateActive = () => {
      const cards = scroller.querySelectorAll<HTMLElement>(
        "[data-process-card]",
      );
      const scrollerCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(cardCenter - scrollerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
    };

    updateActive();
    scroller.addEventListener("scroll", updateActive, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", updateActive);
    };
  }, []);

  const scrollToCard = (index: number) => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelectorAll<HTMLElement>("[data-process-card]")[
      index
    ];

    card?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="hero-cream relative overflow-hidden py-20 font-sans sm:py-28"
    >
      <div className="mx-auto w-full max-w-[1360px] px-5 md:px-8">
        <div className="relative text-center">
          <h2
            id="process-title"
            className="text-brand-navy relative text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.03em] uppercase"
          >
            How the work moves
          </h2>
        </div>

        <div className="mt-12 hidden gap-5 lg:mt-14 lg:grid lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <ProcessCard key={step.title} step={step} index={index} />
          ))}
        </div>

        <div className="mt-10 lg:hidden">
          <div
            ref={scrollerRef}
            className="process-mobile-scroller -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
            aria-label="Process steps"
          >
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                data-process-card
                className="w-[82%] max-w-[22rem] shrink-0 snap-center"
              >
                <ProcessCard step={step} index={index} />
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {processSteps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                aria-label={`Go to ${step.title}`}
                aria-current={activeIndex === index ? true : undefined}
                onClick={() => scrollToCard(index)}
                className="focus-visible:ring-brand-navy grid size-12 place-items-center rounded-full focus-visible:ring-2 focus-visible:outline-none"
              >
                <span
                  className={
                    activeIndex === index
                      ? "bg-brand-navy h-2 w-6 rounded-full"
                      : "bg-brand-navy/40 size-2 rounded-full"
                  }
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
