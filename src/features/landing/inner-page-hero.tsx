export function HeroGlowBackdrop() {
  return (
    <>
      <div
        className="hero-glow hero-glow-primary -top-24 -left-28 size-[30rem] sm:-top-28 sm:-left-32 sm:size-[38rem]"
        aria-hidden="true"
      />
      <div
        className="hero-glow hero-glow-secondary top-16 -right-24 size-[20rem] sm:top-10 sm:size-[26rem]"
        aria-hidden="true"
      />
      <div
        className="via-brand-white/70 to-brand-white pointer-events-none absolute inset-x-0 -bottom-px z-[1] h-36 bg-gradient-to-b from-transparent"
        aria-hidden="true"
      />
    </>
  );
}

export function InnerPageHero({
  title,
  description,
}: {
  readonly title: string;
  readonly description: string;
}) {
  return (
    <section className="hero-cream relative">
      <HeroGlowBackdrop />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pt-16 pb-12 text-center sm:px-8 sm:pt-20 sm:pb-16">
        <h1 className="text-brand-navy text-[clamp(1.65rem,4.2vw,3rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic">
          {title}
        </h1>
        <p className="text-brand-muted mx-auto mt-5 max-w-2xl text-sm leading-7 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
