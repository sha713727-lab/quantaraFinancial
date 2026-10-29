"use client";

import { Pause, Play } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { consultationHref } from "@/constants/site-paths";
import { CpaAbstractArtwork } from "@/features/landing/cpa-outsourcing-artwork";
import {
  cpaConsultationQuery,
  type CpaRailCard,
} from "@/features/landing/cpa-outsourcing-content";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const consultationUrl = consultationHref(cpaConsultationQuery);
const AUTO_SLIDE_MS = 4000;

const heightClass: Record<CpaRailCard["height"], string> = {
  tall: "min-h-[460px] md:min-h-[552px]",
  medium: "min-h-[340px] md:min-h-[358px]",
  compact: "min-h-[240px] md:min-h-[256px]",
};

function RailCard({ card }: { readonly card: CpaRailCard }) {
  if (card.kind === "visual") {
    return (
      <article
        className={cn(
          "relative w-[min(84vw,360px)] shrink-0 snap-start overflow-hidden rounded-[10px] md:w-[clamp(320px,28.9vw,459px)]",
          heightClass.tall,
        )}
      >
        <CpaAbstractArtwork
          className="absolute inset-0 !aspect-auto h-full min-h-full rounded-[10px]"
          aspectClassName="h-full min-h-full"
          imageSrc={card.imageSrc}
          glowX={card.glowX}
          glowY={card.glowY}
          panelTitle={card.title}
          panelLabel={card.caption}
          showCaptions
        />
      </article>
    );
  }

  if (card.kind === "dark") {
    return (
      <article
        className={cn(
          "bg-brand-navy text-brand-cream flex w-[min(84vw,360px)] shrink-0 snap-start flex-col justify-between rounded-[10px] p-6 md:w-[clamp(320px,28.9vw,459px)] md:p-8",
          heightClass.compact,
        )}
      >
        <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">
          {card.title}
        </h3>
        <p className="text-brand-cream/85 mt-6 text-sm leading-6">
          {card.body}
        </p>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "border-brand-navy/10 bg-brand-white text-brand-navy flex w-[min(84vw,360px)] shrink-0 snap-start flex-col justify-between rounded-[10px] border p-6 md:w-[clamp(320px,28.9vw,459px)] md:p-8",
        heightClass.medium,
      )}
    >
      <div>
        <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-2xl">
          {card.title}
        </h3>
        <p className="text-brand-muted mt-4 text-sm leading-6">{card.body}</p>
      </div>
      {card.actionLabel && card.actionHref === "consultation" ? (
        <Link
          href={consultationUrl}
          className="text-brand-navy decoration-brand-navy/40 hover:decoration-brand-navy focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream mt-8 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold underline underline-offset-4 transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          {card.actionLabel}
        </Link>
      ) : null}
    </article>
  );
}

const controlClassName =
  "border-brand-navy/20 text-brand-navy hover:bg-brand-navy hover:text-brand-cream focus-visible:ring-brand-navy inline-flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40";

export function CpaCredentialsRail({
  cards,
}: {
  readonly cards: readonly CpaRailCard[];
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const reduceMotion = usePrefersReducedMotion();

  const updateEdges = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 0) return;

    if (direction === 1 && el.scrollLeft >= max - 4) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      return;
    }

    if (direction === -1 && el.scrollLeft <= 4) {
      el.scrollTo({ left: max, behavior: "smooth" });
      return;
    }

    const amount = Math.min(el.clientWidth * 0.85, 420) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener("scroll", updateEdges, { passive: true });
    const ro = new ResizeObserver(updateEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateEdges);
      ro.disconnect();
    };
  }, [updateEdges]);

  useEffect(() => {
    if (reduceMotion === true || userPaused || paused) {
      return;
    }

    const timer = window.setInterval(() => {
      scrollByCard(1);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, scrollByCard, userPaused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="mb-4 flex justify-end gap-2 px-[clamp(1.25rem,3vw,4rem)]">
        {reduceMotion !== true ? (
          <button
            type="button"
            aria-pressed={userPaused}
            aria-label={
              userPaused
                ? "Play credentials card slideshow"
                : "Pause credentials card slideshow"
            }
            onClick={() => setUserPaused((value) => !value)}
            className={controlClassName}
          >
            {userPaused ? (
              <Play className="size-4" aria-hidden="true" />
            ) : (
              <Pause className="size-4" aria-hidden="true" />
            )}
          </button>
        ) : null}
        <button
          type="button"
          aria-label="Show previous credentials cards"
          disabled={!canPrev}
          onClick={() => scrollByCard(-1)}
          className={controlClassName}
        >
          <span aria-hidden="true">&larr;</span>
        </button>
        <button
          type="button"
          aria-label="Show next credentials cards"
          disabled={!canNext}
          onClick={() => scrollByCard(1)}
          className={controlClassName}
        >
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1.25rem,3vw,4rem)] pb-2 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <RailCard key={`${card.kind}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}
