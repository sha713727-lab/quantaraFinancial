import { parentFirmName } from "@/constants/parent-firm";
import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function AboutView() {
  return (
    <>
      <InnerPageHero
        title="About Us"
        description={`Quantara Financial is a specialized strategic partner of ${parentFirmName} — audit, tax, advisory, bookkeeping, outsourcing, and ERP for businesses that need numbers they can stand behind.`}
      />

      <section
        aria-labelledby="about-body-title"
        className="hero-cream relative pb-16 sm:pb-20"
      >
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <h2
            id="about-body-title"
            className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            Who we are
          </h2>
          <p className="text-brand-muted mt-6 text-sm leading-7 sm:text-base">
            Quantara Financial provides audit and assurance, taxation, Odoo ERP,
            corporate advisory, bookkeeping, accounting and finance outsourcing,
            and risk advisory. The practice is built for businesses that operate
            across the UAE, UK, and USA and need one team that can keep the
            books, the filings, and the decisions aligned.
          </p>
          <p className="text-brand-muted mt-4 text-sm leading-7 sm:text-base">
            We work as a specialized strategic partner of {parentFirmName}. That
            affiliation means engagements are delivered with
            chartered-accountancy standards — documented work, professional
            judgement, and a clear scope — rather than as a generic bookkeeping
            shop.
          </p>
          <p className="text-brand-muted mt-4 text-sm leading-7 sm:text-base">
            The sequence is the same on every matter: consult first, deliver the
            work, then stay with the business through filings, reporting, and
            the next question as operations change.
          </p>
        </div>
      </section>
    </>
  );
}
