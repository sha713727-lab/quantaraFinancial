import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function AboutView() {
  return (
    <>
      <InnerPageHero
        title="About Us"
        description="Customized financial solutions and expert guidance to drive the business toward sustainable growth — delivered as a specialized strategic practice of Shahbaz Hannan & Co. Chartered Accountants."
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
            What Quantara is about
          </h2>
          <p className="text-brand-muted mt-6 text-sm leading-7 sm:text-base">
            Quantara Financial is dedicated to empowering businesses with expert
            financial and accounting services. We provide tailored solutions
            that optimize financial health, drive growth, and ensure compliance.
            Chartered Accountants offer strategic insight and personalized
            guidance, enabling informed decision-making and sustainable success.
          </p>
          <p className="text-brand-muted mt-4 text-sm leading-7 sm:text-base">
            Operating as a specialized strategic practice of Shahbaz Hannan
            &amp; Co. Chartered Accountants, we partner closely with businesses
            to optimize financial efficiency, streamline compliance, and unlock
            real potential. At Quantara, financial success is the core priority
            — and the work is to turn strategic goals into lasting results.
          </p>
        </div>
      </section>
    </>
  );
}
