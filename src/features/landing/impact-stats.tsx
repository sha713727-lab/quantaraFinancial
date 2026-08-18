import { impactStats } from "@/features/landing/content";
import { Reveal } from "@/features/landing/motion-primitives";

export function ImpactStatsSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-title"
      className="hero-cream relative overflow-hidden py-12 font-sans sm:py-16"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <Reveal>
          <h2
            id="impact-title"
            className="text-brand-navy mx-auto max-w-2xl text-center font-sans text-[clamp(1.5rem,3.6vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase"
          >
            Clear financial direction for businesses ready to grow
          </h2>
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {impactStats.map((stat) => (
            <li
              key={stat.label}
              className="impact-stat-card flex min-h-[15rem] flex-col justify-between rounded-[1.5rem] px-7 py-7 sm:min-h-[16.5rem] sm:px-8 sm:py-8"
            >
              <div>
                <p className="text-brand-cream/85 font-sans text-[0.65rem] font-bold tracking-[0.2em] uppercase">
                  {stat.label}
                </p>
                <p className="text-brand-cream mt-4 font-sans text-[clamp(2.5rem,4.5vw,3.25rem)] leading-none font-bold tracking-[-0.05em]">
                  {stat.value}
                </p>
              </div>

              <div className="mt-6">
                <div
                  className="bg-brand-cream/25 mb-4 h-px w-10"
                  aria-hidden="true"
                />
                <p className="text-brand-cream/85 max-w-[17rem] font-sans text-sm leading-6 font-normal">
                  {stat.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
