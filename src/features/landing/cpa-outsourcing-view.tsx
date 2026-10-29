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

const consultationUrl = consultationHref(cpaConsultationQuery);

const widePad = "px-[clamp(1.25rem,3vw,4rem)]";
const sectionY = "py-[clamp(4.5rem,10vw,8.5rem)]";
const editorial = `mx-auto w-full max-w-[1100px] ${widePad}`;

export function CpaOutsourcingView() {
  const page = cpaOutsourcingPage;

  return (
    <div className="hero-cream text-brand-navy">
      <CpaHeroZoom />

      <section
        aria-labelledby="cpa-story-title"
        className={`${editorial} ${sectionY}`}
      >
        <div className="grid grid-cols-1 gap-6 min-[900px]:grid-cols-[0.45fr_0.49fr] min-[900px]:gap-[clamp(2rem,6vw,6%)]">
          <div>
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
          </div>
          <div>
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
          </div>
        </div>
      </section>

      <section aria-label="Bookkeeping and reconciliation" className={sectionY}>
        <CpaPortraitPair
          left={page.portraitPairA.left}
          right={page.portraitPairA.right}
          variant="a"
        />
      </section>

      <section
        aria-labelledby="cpa-process-title"
        className={`${editorial} ${sectionY}`}
      >
        <h2
          id="cpa-process-title"
          className="text-brand-navy text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
        >
          {page.process.heading}
        </h2>
        <ol className="mt-12 grid grid-cols-1 gap-x-[clamp(2rem,5vw,4.5rem)] gap-y-[clamp(2.75rem,5vw,4.5rem)] min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3">
          {page.process.steps.map((step) => (
            <li key={step.number}>
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
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-label="Reporting and year-end preparation"
        className={sectionY}
      >
        <CpaPortraitPair
          left={page.portraitPairB.left}
          right={page.portraitPairB.right}
          variant="b"
        />
      </section>

      <section
        aria-labelledby="cpa-related-title"
        className={`${editorial} ${sectionY} text-center`}
      >
        <h2
          id="cpa-related-title"
          className="text-brand-navy mx-auto max-w-[18ch] text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
        >
          {page.related.heading}
        </h2>
        <p className="text-brand-muted mx-auto mt-5 max-w-xl text-base leading-7">
          {page.related.body}
        </p>
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
      </section>

      <section
        aria-labelledby="cpa-cream-title"
        className="bg-brand-cream-soft border-brand-navy/10 text-brand-navy border-y py-[clamp(5rem,9vw,9.375rem)]"
      >
        <div className="mx-auto mb-[clamp(2.625rem,6vw,5.5rem)] w-full max-w-[min(100%-3rem,1320px)] px-[clamp(1.25rem,3vw,4rem)]">
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
        </div>

        <CpaCredentialsRail cards={page.railCards} />
        <CpaOutsourcingDetails />
      </section>

      <section
        aria-labelledby="cpa-closing-title"
        className="bg-brand-navy text-brand-cream relative overflow-hidden py-[clamp(4.5rem,10vw,8.5rem)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(110,145,185,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(110,145,185,0.25) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="pointer-events-none absolute top-[58%] left-1/2 size-[min(70vw,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(circle, rgba(110,145,185,0.45) 0%, transparent 70%)",
          }}
        />

        <div
          className={`relative z-10 ${editorial} grid grid-cols-1 gap-10 min-[900px]:grid-cols-2 min-[900px]:items-end`}
        >
          <div>
            <p className="text-brand-accent text-[0.65rem] font-bold tracking-[0.22em] uppercase">
              {page.closingCta.eyebrow}
            </p>
            <h2
              id="cpa-closing-title"
              className="text-brand-cream mt-4 text-[clamp(1.75rem,4vw,3.125rem)] leading-[1.15] font-semibold tracking-[-0.03em]"
            >
              {page.closingCta.heading}
            </h2>
          </div>
          <div>
            <p className="text-brand-cream/85 text-base leading-7">
              {page.closingCta.body}
            </p>
            <Link
              href={consultationUrl}
              className="bg-brand-cream text-brand-navy hover:bg-brand-gold-mid focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy mt-8 inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {page.closingCta.buttonLabel}
            </Link>
          </div>
        </div>

        <div
          className="pointer-events-none relative mx-auto mt-16 h-40 w-full max-w-md"
          aria-hidden="true"
        >
          <div className="border-brand-accent/30 absolute top-4 left-1/2 size-28 -translate-x-1/2 rounded-full border" />
          <div className="border-brand-accent/20 absolute top-10 left-[42%] size-16 rounded-full border" />
          <div className="bg-brand-deep/70 absolute bottom-2 left-[28%] h-16 w-40 rounded-[4px]" />
          <div className="bg-brand-deep/50 absolute right-[24%] bottom-6 h-12 w-28 rounded-[4px]" />
        </div>
      </section>
    </div>
  );
}
