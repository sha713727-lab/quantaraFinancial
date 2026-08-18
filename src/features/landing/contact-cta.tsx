import { sitePaths } from "@/constants/site-paths";
import { MagneticLink } from "@/features/landing/magnetic-link";

function CueArrow() {
  return (
    <svg
      viewBox="0 0 200 120"
      className="text-brand-cream/85 h-24 w-40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M28 16c42 8 72 28 98 58 10 12 18 26 24 40"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M132 98l18 16 8-20"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ContactSection({
  title = "Discuss your requirements",
  description = "Talk to Quantara about audit, taxation, advisory, outsourcing, or ERP. We assess the work before we recommend a scope.",
  ctaLabel = "Talk to an Advisor",
}: {
  readonly title?: string;
  readonly description?: string;
  readonly ctaLabel?: string;
}) {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="hero-cream relative scroll-mt-24 py-16 font-sans sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <div className="bg-brand-navy text-brand-cream relative rounded-[1.75rem] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div
            className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_18%_20%,rgb(247_240_223/0.08),transparent_42%)]"
            aria-hidden="true"
          />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <div className="max-w-xl">
              <h2
                id="contact-title"
                className="text-brand-cream text-[clamp(1.6rem,3.8vw,2.75rem)] leading-[1.1] font-bold tracking-[-0.04em] uppercase italic"
              >
                {title}
              </h2>
              <p className="text-brand-cream/85 mt-4 text-sm leading-7 sm:text-base">
                {description}
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
              <div className="pr-2 sm:pr-4">
                <CueArrow />
              </div>
              <MagneticLink
                href={sitePaths.consultation}
                className="bg-brand-cream text-brand-navy focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl px-8 text-[0.7rem] font-bold tracking-[0.16em] whitespace-nowrap uppercase transition-transform duration-200 ease-out will-change-transform hover:shadow-[0_14px_32px_rgba(2,7,18,0.35)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                {ctaLabel}
              </MagneticLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
