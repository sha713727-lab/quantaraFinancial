import Link from "next/link";

import { sitePaths } from "@/constants/site-paths";
import { FinancialVisual } from "@/features/landing/hero-visual";
import { Reveal } from "@/features/landing/motion-primitives";

export function HeroSection() {
  return (
    <section id="top" className="relative scroll-mt-24 overflow-x-clip">
      <div
        className="hero-glow hero-glow-primary -top-40 -left-44 size-[34rem] sm:-top-48 sm:-left-52 sm:size-[44rem]"
        aria-hidden="true"
      />
      <div
        className="hero-glow hero-glow-secondary top-32 -right-28 size-[24rem] sm:top-16 sm:size-[32rem]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl flex-col items-center justify-start gap-4 px-5 pt-16 pb-10 text-center sm:px-8 sm:pt-20 sm:pb-12 lg:pt-24">
        <Reveal className="relative z-20 mx-auto w-full max-w-5xl">
          <h1 className="text-brand-navy mx-auto max-w-full text-[clamp(0.78rem,calc((100vw-2.75rem)/17.2),2.85rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic">
            <span className="block whitespace-nowrap">
              Your Secure And Trusted
            </span>
            <span className="block whitespace-nowrap">Financial Partner</span>
          </h1>
          <p className="text-brand-muted mx-auto mt-5 max-w-2xl px-1 text-sm leading-6 sm:text-base sm:leading-7">
            Quantara Financial delivers expert financial and accounting
            solutions designed to elevate your business. Partner with us for
            strategic growth and lasting financial success.
          </p>
          <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={sitePaths.consultation}
              className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream inline-flex min-h-12 w-full items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(7,20,38,0.28)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
            >
              Talk to an Advisor
            </Link>
            <Link
              href={sitePaths.services}
              className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-cream focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream inline-flex min-h-12 w-full items-center justify-center rounded-sm border bg-transparent px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
            >
              Explore Our Services
            </Link>
          </div>
        </Reveal>

        <div className="relative z-0 mt-4 w-full">
          <FinancialVisual />
        </div>
      </div>
    </section>
  );
}
