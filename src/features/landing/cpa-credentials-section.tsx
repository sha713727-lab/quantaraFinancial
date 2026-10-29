import Link from "next/link";

import { sitePaths } from "@/constants/site-paths";
import { cpaCredentialsSection } from "@/features/landing/cpa-credentials-content";
import { Reveal } from "@/features/landing/motion-primitives";

export function CpaCredentialsSection() {
  const content = cpaCredentialsSection;

  return (
    <section
      id="cpa-credentials"
      aria-labelledby="cpa-credentials-title"
      className="hero-cream relative overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <p className="text-brand-navy text-center text-[0.65rem] font-bold tracking-[0.22em] uppercase">
            {content.eyebrow}
          </p>
          <h2
            id="cpa-credentials-title"
            className="text-brand-navy mx-auto mt-4 max-w-3xl text-center text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            {content.heading}
          </h2>
          <p className="text-brand-muted mx-auto mt-5 max-w-2xl text-center text-sm leading-7 sm:text-base">
            {content.introduction}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {content.cards.map((card, index) => (
            <Reveal
              key={card.title}
              as="li"
              delayMs={90 * (index + 1)}
              className="border-brand-navy/10 bg-brand-cream-soft flex h-full flex-col rounded-2xl border p-6 sm:p-7"
            >
              <h3 className="text-brand-navy text-base font-semibold tracking-[-0.02em]">
                {card.title}
              </h3>
              <p className="text-brand-muted mt-3 flex-1 text-sm leading-6">
                {card.body}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex justify-center" delayMs={200}>
          <Link
            href={sitePaths.cpaOutsourcing}
            className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(7,20,38,0.28)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            {content.ctaLabel}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
