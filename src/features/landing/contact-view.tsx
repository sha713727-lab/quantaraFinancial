import { ContactChannels } from "@/features/landing/contact-channels";
import { ContactForm } from "@/features/landing/contact-form";
import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function ContactView() {
  return (
    <>
      <InnerPageHero
        title="Tell us what you are trying to solve"
        description="Share the audit, tax, advisory, bookkeeping, outsourcing, or ERP work you need. Email, call, or use the form — we will take it from there."
      />

      <section
        aria-labelledby="contact-details-title"
        className="hero-cream relative pb-8 sm:pb-4"
      >
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <h2
            id="contact-details-title"
            className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            Book a Consultation
          </h2>
          <ContactChannels tone="cream" />

          <ContactForm />
        </div>
      </section>
    </>
  );
}
