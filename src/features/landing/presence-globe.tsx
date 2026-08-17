import { FileCheck2, Scale } from "lucide-react";

import { Reveal } from "@/features/landing/motion-primitives";

function PresenceMark() {
  return (
    <svg
      viewBox="0 0 320 320"
      className="size-full"
      role="img"
      aria-label="Global tax and assurance coverage"
    >
      <circle cx="160" cy="160" r="148" fill="#071426" />
      <circle
        cx="160"
        cy="160"
        r="132"
        fill="none"
        stroke="#f7f0df"
        strokeOpacity="0.28"
        strokeWidth="1.2"
      />
      <ellipse
        cx="160"
        cy="160"
        rx="48"
        ry="132"
        fill="none"
        stroke="#f7f0df"
        strokeOpacity="0.22"
        strokeWidth="1"
      />
      <ellipse
        cx="160"
        cy="160"
        rx="96"
        ry="132"
        fill="none"
        stroke="#f7f0df"
        strokeOpacity="0.18"
        strokeWidth="1"
      />
      <ellipse
        cx="160"
        cy="160"
        rx="132"
        ry="48"
        fill="none"
        stroke="#f7f0df"
        strokeOpacity="0.2"
        strokeWidth="1"
      />
      <ellipse
        cx="160"
        cy="160"
        rx="132"
        ry="96"
        fill="none"
        stroke="#f7f0df"
        strokeOpacity="0.16"
        strokeWidth="1"
      />
      <circle cx="118" cy="92" r="3.2" fill="#f7f0df" />
      <circle cx="214" cy="108" r="3.2" fill="#6e91b9" />
      <circle cx="168" cy="168" r="3.2" fill="#f7f0df" />
      <circle cx="96" cy="186" r="3.2" fill="#6e91b9" />
      <circle cx="236" cy="198" r="3.2" fill="#f7f0df" />
    </svg>
  );
}

export function PresenceGlobeSection() {
  return (
    <section
      id="about"
      aria-labelledby="presence-title"
      className="hero-cream relative scroll-mt-24 overflow-hidden"
    >
      <div
        className="hero-glow hero-glow-primary top-10 -left-32 size-[28rem] opacity-70 sm:size-[36rem]"
        aria-hidden="true"
      />
      <div
        className="hero-glow hero-glow-secondary right-[-10%] bottom-0 size-[26rem] sm:size-[32rem]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-[1360px] items-center gap-8 px-5 py-16 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6 lg:py-20">
        <div className="relative z-10">
          <Reveal>
            <h2
              id="presence-title"
              className="max-w-xl text-[clamp(0.78rem,calc((100vw-2.75rem)/20),2.65rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic"
            >
              <span className="text-brand-navy/55 block">
                Tailored Financial
              </span>
              <span className="text-brand-accent mt-1 block">
                Solutions For Growth
              </span>
            </h2>
            <p className="text-brand-muted mt-4 max-w-md text-sm leading-7">
              Quantara is a specialized strategic practice of Shahbaz Hannan
              &amp; Co. Chartered Accountants, working with businesses to
              optimize financial efficiency, streamline compliance, and unlock
              real potential.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[36rem]">
          <div
            className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgb(110_145_185/0.22)_0%,transparent_68%)]"
            aria-hidden="true"
          />
          <div className="absolute inset-[8%]">
            <PresenceMark />
          </div>

          <article className="border-brand-navy/10 bg-brand-cream/88 absolute top-[8%] left-0 z-20 w-[min(15.5rem,78%)] rounded-[1.25rem] border p-4 shadow-[0_18px_40px_-20px_rgba(7,20,38,0.35)] backdrop-blur-xl sm:left-[-4%] sm:p-5">
            <span className="bg-brand-navy/8 grid size-8 place-items-center rounded-full">
              <FileCheck2
                className="text-brand-accent size-3.5"
                aria-hidden="true"
              />
            </span>
            <h3 className="text-brand-navy mt-3 text-xs font-bold tracking-[0.14em] uppercase">
              Audit &amp; Assurance
            </h3>
            <p className="text-brand-muted mt-1.5 text-xs leading-5">
              Independent audits that strengthen transparency and confidence.
            </p>
          </article>

          <article className="border-brand-navy/10 bg-brand-navy/92 absolute right-0 bottom-[10%] z-20 w-[min(16.5rem,82%)] rounded-[1.25rem] border p-4 shadow-[0_18px_40px_-18px_rgba(7,20,38,0.45)] backdrop-blur-xl sm:right-[-2%] sm:p-5">
            <span className="bg-brand-cream/12 grid size-8 place-items-center rounded-full">
              <Scale className="text-brand-cream size-3.5" aria-hidden="true" />
            </span>
            <h3 className="text-brand-cream mt-3 text-xs font-bold tracking-[0.14em] uppercase">
              Taxation
            </h3>
            <p className="text-brand-cream/65 mt-1.5 text-xs leading-5">
              Planning, compliance, and advisory across UAE, UK, and USA.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
