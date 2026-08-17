import { ContactChannels } from "@/features/landing/contact-channels";
import { ContactForm } from "@/features/landing/contact-form";
import { processSteps } from "@/features/landing/content";
import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function ConsultationView() {
  return (
    <>
      <InnerPageHero
        title="Book a consultation"
        description="Tell Quantara what you need on audit, taxation, advisory, outsourcing, or ERP. We assess the business and the right scope before any recommendation is made."
      />

      <section
        aria-labelledby="consultation-steps-title"
        className="hero-cream pb-8 sm:pb-12"
      >
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <h2
            id="consultation-steps-title"
            className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            How the first conversation works
          </h2>
          <ol className="mt-10 space-y-6">
            {processSteps.map((step) => (
              <li key={step.number}>
                <p className="text-brand-accent text-[0.65rem] font-bold tracking-[0.22em] uppercase">
                  {step.number} — {step.title}
                </p>
                <p className="text-brand-muted mt-2 text-sm leading-7 sm:text-base">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="consultation-contact-title"
        className="hero-cream pb-8"
      >
        <div className="mx-auto w-full max-w-3xl px-5 pb-4 md:px-8">
          <h2
            id="consultation-contact-title"
            className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            Reach the team
          </h2>
          <ContactChannels tone="cream" />
          <ContactForm />
        </div>
      </section>
    </>
  );
}
