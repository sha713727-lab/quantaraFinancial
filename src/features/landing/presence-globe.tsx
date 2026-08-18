import { FileCheck2, Scale } from "lucide-react";

import { parentFirmName } from "@/constants/parent-firm";
import { Reveal } from "@/features/landing/motion-primitives";
import { PresenceGlobeCanvas } from "@/features/landing/presence-globe-canvas";

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
              <span className="text-brand-navy/80 block">
                Tailored Financial
              </span>
              <span className="text-brand-navy mt-1 block">
                Solutions For Growth
              </span>
            </h2>
            <p className="text-brand-muted mt-4 max-w-md text-sm leading-7">
              Quantara is a specialized strategic practice of {parentFirmName},
              working with businesses to optimize financial efficiency,
              streamline compliance, and unlock real potential.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[36rem]">
          <div
            className="pointer-events-none absolute inset-[6%] rounded-full bg-[radial-gradient(circle,rgb(110_145_185/0.22)_0%,transparent_68%)]"
            aria-hidden="true"
          />
          <div className="bg-brand-navy absolute inset-[8%] overflow-hidden rounded-full">
            <PresenceGlobeCanvas />
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
            <p className="text-brand-cream/85 mt-1.5 text-xs leading-5">
              Planning, compliance, and advisory across UAE, UK, and USA.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
