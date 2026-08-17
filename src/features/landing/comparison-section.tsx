"use client";

import { BadgeCheck, CircleAlert } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { comparisonPoints } from "@/features/landing/content";

function OtherFirmsCard() {
  return (
    <article className="bg-brand-navy h-full overflow-hidden rounded-2xl">
      <header className="border-brand-cream/12 border-b px-5 py-4">
        <p className="text-brand-cream/55 text-center text-[0.65rem] font-semibold tracking-[0.18em] uppercase italic">
          Other firms
        </p>
      </header>
      <ul>
        {comparisonPoints.map((point) => (
          <li
            key={point.other}
            className="border-brand-cream/8 flex items-start gap-3 border-b px-5 py-3.5 last:border-b-0"
          >
            <CircleAlert
              className="mt-0.5 size-4 shrink-0 text-white/55"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="text-sm leading-6 text-white/70">
              {point.other}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function QuantaraCard() {
  return (
    <article className="bg-brand-navy ring-brand-cream/20 h-full overflow-hidden rounded-2xl ring-1">
      <header className="border-brand-cream/16 bg-brand-navy-panel border-b px-5 py-4">
        <p className="flex items-center justify-center gap-2 text-[0.65rem] font-semibold tracking-[0.16em] text-white uppercase italic">
          <Image
            src="/brand/quantara-mark-cream.png"
            alt=""
            width={419}
            height={313}
            className="h-6 w-auto not-italic"
          />
          Quantara
        </p>
      </header>
      <ul>
        {comparisonPoints.map((point) => (
          <li
            key={point.quantara}
            className="border-brand-cream/8 flex items-start gap-3 border-b px-5 py-3.5 last:border-b-0"
          >
            <BadgeCheck
              className="mt-0.5 size-4 shrink-0 text-white"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <span className="text-sm leading-6 font-medium text-white">
              {point.quantara}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

const mobileCards = [
  { id: "other", label: "Other firms", node: <OtherFirmsCard /> },
  { id: "quantara", label: "Quantara", node: <QuantaraCard /> },
] as const;

export function ComparisonSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const updateActive = () => {
      const cards = scroller.querySelectorAll<HTMLElement>(
        "[data-comparison-card]",
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
    const card = scroller?.querySelectorAll<HTMLElement>(
      "[data-comparison-card]",
    )[index];

    card?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <section
      id="comparison"
      aria-labelledby="comparison-title"
      className="hero-cream relative overflow-hidden py-16 font-sans sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        <div className="text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <p className="text-brand-navy/40 text-[0.7rem] font-semibold tracking-[0.18em] uppercase italic">
              Other firms
            </p>
            <span className="text-brand-navy/35 text-xl font-semibold uppercase italic sm:text-2xl">
              vs
            </span>
            <p className="text-brand-navy flex items-center gap-2 text-[0.7rem] font-semibold tracking-[0.14em] uppercase italic">
              <Image
                src="/brand/quantara-mark-navy.png"
                alt=""
                width={419}
                height={313}
                className="h-6 w-auto not-italic"
              />
              Quantara
            </p>
          </div>

          <h2 id="comparison-title" className="sr-only">
            How Quantara compares with other firms
          </h2>
          <p className="text-brand-navy mx-auto mt-5 max-w-xl text-base leading-7 font-semibold tracking-[-0.02em] uppercase italic sm:text-lg">
            Clearer numbers, written findings, and support that stays with the
            business across audit, tax, advisory, and ERP.
          </p>
        </div>

        <div className="mt-10 hidden gap-5 sm:mt-12 lg:grid lg:grid-cols-2">
          <OtherFirmsCard />
          <QuantaraCard />
        </div>

        <div className="mt-10 lg:hidden">
          <div
            ref={scrollerRef}
            className="process-mobile-scroller -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2"
            aria-label="Comparison cards"
          >
            {mobileCards.map((card) => (
              <div
                key={card.id}
                data-comparison-card
                className="w-[88%] max-w-[26rem] shrink-0 snap-center"
              >
                {card.node}
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {mobileCards.map((card, index) => (
              <button
                key={card.id}
                type="button"
                aria-label={`Show ${card.label}`}
                aria-current={activeIndex === index ? "true" : "false"}
                onClick={() => scrollToCard(index)}
                className={
                  activeIndex === index
                    ? "bg-brand-navy h-2 w-6 rounded-full transition-all"
                    : "bg-brand-navy/25 size-2 rounded-full transition-all"
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
