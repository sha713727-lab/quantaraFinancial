import Link from "next/link";

import { consultationHref } from "@/constants/site-paths";
import {
  cpaConsultationQuery,
  cpaOutsourcingPage,
} from "@/features/landing/cpa-outsourcing-content";
import { CpaOutsourcingDetails } from "@/features/landing/cpa-outsourcing-details";
import { CpaHeroZoom } from "@/features/landing/cpa-outsourcing-hero-zoom";
import { CpaPortraitPair } from "@/features/landing/cpa-outsourcing-portrait-pair";
import { CpaCredentialsRail } from "@/features/landing/cpa-outsourcing-rail";
import {
  CpaReveal,
  CpaScrollRoot,
} from "@/features/landing/cpa-outsourcing-scroll.client";
import { LandingScrollSync } from "@/features/landing/scroll-sync.client";

const consultationUrl = consultationHref(cpaConsultationQuery);

const editorial = "site-gutter mx-auto w-full max-w-[1100px]";
const sectionY = "site-section";
const sectionYLg = "site-section-lg";

export function CpaOutsourcingView() {
  const page = cpaOutsourcingPage;

  return (
    <div className="hero-cream text-brand-navy">
      <LandingScrollSync />
      <CpaHeroZoom />

      <CpaScrollRoot>
        <section
          aria-labelledby="cpa-story-title"
          className={`${editorial} ${sectionY}`}
        >
          <div className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-[0.45fr_0.49fr] min-[900px]:gap-[clamp(2rem,6vw,6%)]">
            <CpaReveal>
              <h2
                id="cpa-story-title"
                className="text-brand-navy flex items-center gap-3 text-sm font-semibold tracking-[0.04em]"
              >
                <span
                  className="bg-brand-accent size-1.5 shrink-0 rounded-full"
                  aria-hidden="true"
                />
                {page.story.heading}
              </h2>
            </CpaReveal>
            <CpaReveal delay={120}>
              {page.story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-brand-muted mt-0 mb-5 text-base leading-7 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                href={page.story.linkHref}
                className="text-brand-navy hover:text-brand-accent focus-visible:ring-brand-navy mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
              >
                {page.story.linkLabel}
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </CpaReveal>
          </div>
        </section>

        <section
          aria-label="Bookkeeping, reconciliation, year-end preparation, and reporting"
          className={sectionY}
        >
          <CpaReveal y={36}>
            <CpaPortraitPair
              left={page.portraitPairA.left}
              right={page.portraitPairA.right}
            />
          </CpaReveal>
          <div className="mt-12 sm:mt-16">
            <CpaReveal y={36}>
              <CpaPortraitPair
                left={page.portraitPairB.left}
                right={page.portraitPairB.right}
              />
            </CpaReveal>
          </div>
        </section>

        <section
          aria-labelledby="cpa-process-title"
          className={`${editorial} ${sectionY}`}
        >
          <CpaReveal>
            <h2
              id="cpa-process-title"
              className="text-brand-navy text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
            >
              {page.process.heading}
            </h2>
          </CpaReveal>
          <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3 sm:mt-12">
            {page.process.steps.map((step, index) => (
              <li key={step.number}>
                <CpaReveal delay={100 * index} y={32}>
                  <p className="text-brand-navy text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] font-semibold tracking-[-0.04em]">
                    {step.number}
                    <span className="text-brand-accent">.</span>
                  </p>
                  <h3 className="text-brand-navy mt-4 text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted mt-3 text-sm leading-6 sm:text-base sm:leading-7">
                    {step.body}
                  </p>
                </CpaReveal>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="cpa-related-title"
          className={`${editorial} ${sectionY} text-center`}
        >
          <CpaReveal>
            <h2
              id="cpa-related-title"
              className="text-brand-navy mx-auto max-w-[18ch] text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
            >
              {page.related.heading}
            </h2>
            <p className="text-brand-muted mx-auto mt-5 max-w-xl text-base leading-7">
              {page.related.body}
            </p>
          </CpaReveal>
          <CpaReveal delay={140}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {page.related.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-brand-navy hover:text-brand-accent focus-visible:ring-brand-navy inline-flex min-h-11 items-center text-sm font-semibold underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CpaReveal>
        </section>

        <section
          aria-labelledby="cpa-cream-title"
          className={`bg-brand-cream-soft border-brand-navy/10 text-brand-navy border-y ${sectionYLg}`}
        >
          <CpaReveal className="site-shell mb-10 sm:mb-14">
            <p className="text-brand-accent text-[0.65rem] font-bold tracking-[0.22em] uppercase">
              {page.creamBand.eyebrow}
            </p>
            <h2
              id="cpa-cream-title"
              className="text-brand-navy mt-4 max-w-[16ch] text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
            >
              {page.creamBand.heading}
            </h2>
            <p className="text-brand-muted mt-5 max-w-2xl text-base leading-7">
              {page.creamBand.body}
            </p>
          </CpaReveal>

          <CpaReveal y={40} delay={80}>
            <CpaCredentialsRail cards={page.railCards} />
          </CpaReveal>
          <CpaReveal delay={120}>
            <CpaOutsourcingDetails />
          </CpaReveal>
        </section>

        <section
          aria-labelledby="cpa-closing-title"
          className={`bg-brand-navy text-brand-cream relative overflow-hidden ${sectionY}`}
        >
          <div
            className={`${editorial} grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-end`}
          >
            <CpaReveal>
              <p className="text-brand-accent text-[0.65rem] font-bold tracking-[0.22em] uppercase">
                {page.closingCta.eyebrow}
              </p>
              <h2
                id="cpa-closing-title"
                className="text-brand-cream mt-4 text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
              >
                {page.closingCta.heading}
              </h2>
            </CpaReveal>
            <CpaReveal delay={140}>
              <p className="text-brand-cream/85 text-base leading-7">
                {page.closingCta.body}
              </p>
              <Link
                href={consultationUrl}
                className="bg-brand-cream text-brand-navy hover:bg-brand-gold-mid focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy mt-8 inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                {page.closingCta.buttonLabel}
              </Link>
            </CpaReveal>
          </div>
        </section>
      </CpaScrollRoot>
    </div>
  );
}
