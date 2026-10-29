"use client";

import {
  TiltedGridHero,
  type TiltedGridImage,
} from "@/components/ui/tilted-grid-hero";
import { Reveal } from "@/features/landing/motion-primitives";

const FAN_IMAGES: readonly TiltedGridImage[] = [
  {
    src: "/services/cards/accounting-outsourcing.jpg",
    alt: "Bookkeeping desk with spreadsheet, invoices, and calculator",
  },
  {
    src: "/services/cards/audit-assurance.jpg",
    alt: "Monthly report review with charts and calculator",
  },
  {
    src: "/services/cards/taxation.jpg",
    alt: "Tax consultation with profit and loss notes",
  },
  {
    src: "/services/cards/erp-solutions.jpg",
    alt: "Modern ERP workstation overlooking the city",
  },
  {
    src: "/services/cards/corporate-advisory.jpg",
    alt: "Boardroom roadmap presentation",
  },
  {
    src: "/services/cards/risk-advisory.jpg",
    alt: "Professional office workstation for risk review",
  },
  {
    src: "/services/cards/tax-planning.jpg",
    alt: "Strategy table with charts, sticky notes, and notebook",
  },
  {
    src: "/services/cards/advisory-consultancy.jpg",
    alt: "Executive conference room ready for advisory work",
  },
  {
    src: "/services/cards/enterprise-support.jpg",
    alt: "Enterprise meeting room with presentation screen",
  },
  {
    src: "/services/cards/growth-strategies.jpg",
    alt: "Evening desk setup for focused planning work",
  },
  {
    src: "/services/cards/specialty-services.jpg",
    alt: "Analytics monitor at a city-view desk",
  },
];

export function ServicesFanSection() {
  return (
    <section
      id="services-overview"
      aria-labelledby="services-fan-title"
      className="relative z-0 flex h-[calc(100vh-5rem)] min-h-[32rem] w-full flex-col overflow-hidden"
    >
      <div className="relative flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden px-5 pt-8 pb-6 md:px-8 md:pt-10 md:pb-8">
        <Reveal className="relative z-20 mx-auto w-full max-w-5xl shrink-0 text-center">
          <h2
            id="services-fan-title"
            className="mx-auto max-w-full text-[clamp(0.72rem,calc((100vw-2.75rem)/22),2.65rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic"
          >
            <span className="text-brand-navy/80 block">
              Audit, Tax, Advisory & Book Keeping
            </span>
            <span className="text-brand-navy block min-[360px]:whitespace-nowrap">
              For Growing Businesses
            </span>
          </h2>
          <p className="text-brand-muted mx-auto mt-3 max-w-xl px-1 text-sm leading-6 sm:text-base sm:leading-7">
            Independent assurance, taxation, corporate advisory, bookkeeping,
            outsourcing, and ERP for corporates, SMEs, and founders.
          </p>
        </Reveal>

        <TiltedGridHero
          images={FAN_IMAGES}
          className="relative mt-6 min-h-0 w-full flex-1"
          tileHeight={58}
          aspectRatio={3 / 4}
          axis={50}
          curve={72}
          fade={10}
          speed={4.5}
        />
      </div>
    </section>
  );
}
