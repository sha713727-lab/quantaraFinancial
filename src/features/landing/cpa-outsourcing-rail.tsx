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
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useSlowConnection } from "@/hooks/use-slow-connection";
import { cn } from "@/lib/utils";

const consultationUrl = consultationHref(cpaConsultationQuery);
const AUTO_SLIDE_MS = 5500;
const AUTO_SLIDE_MOBILE_MS = 8000;

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
          "flex w-[min(84vw,360px)] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] md:w-[clamp(320px,28.9vw,459px)]",
          heightClass.tall,
        )}
      >
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[10px]">
          <CpaAbstractArtwork
            className="absolute inset-0 !aspect-auto h-full min-h-full rounded-[10px]"
            aspectClassName="h-full min-h-full"
            imageSrc={card.imageSrc}
            imageAlt={card.title}
          />
        </div>
        <div className="bg-brand-cream-soft px-5 py-4">
          <p className="text-brand-accent text-[0.62rem] font-bold tracking-[0.2em] uppercase">
            {card.caption}
          </p>
          <p className="text-brand-navy mt-2 text-lg font-semibold tracking-[-0.02em]">
            {card.title}
          </p>
        </div>
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
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isSlow = useSlowConnection();

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
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.15 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Wait for motion preference; never autoplay on slow networks.
    if (reduceMotion !== false || userPaused || !inView || isSlow === true) {
      return;
    }

    const intervalMs = isMobile === true ? AUTO_SLIDE_MOBILE_MS : AUTO_SLIDE_MS;

    const timer = window.setInterval(() => {
      scrollByCard(1);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [inView, isMobile, isSlow, reduceMotion, scrollByCard, userPaused]);

  return (
    <div ref={rootRef} className="relative">
      <div className="site-gutter mb-4 flex justify-end gap-2">
        {reduceMotion !== true && isSlow !== true ? (
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
        className="site-gutter flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [scrollbar-width:none] md:gap-4 [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <RailCard key={`${card.kind}-${index}`} card={card} />
        ))}
      </div>
    </div>
  );
}
