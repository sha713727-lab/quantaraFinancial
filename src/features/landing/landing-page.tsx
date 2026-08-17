import { BlogsSection } from "@/features/landing/blogs-section";
import { ComparisonSection } from "@/features/landing/comparison-section";
import { ContactSection } from "@/features/landing/contact-cta";
import { HeroSection } from "@/features/landing/hero-trust";
import { ImpactStatsSection } from "@/features/landing/impact-stats";
import { PageShell } from "@/features/landing/page-shell";
import { PartnersMarqueeSection } from "@/features/landing/partners-marquee";
import { PresenceGlobeSection } from "@/features/landing/presence-globe";
import { ProcessSection } from "@/features/landing/process-cta";
import { ServicesCarouselSection } from "@/features/landing/services-carousel";
import { ServicesFanSection } from "@/features/landing/services-fan";
import { TestimonialsMarqueeSection } from "@/features/landing/testimonials-marquee";

export function LandingPage() {
  return (
    <PageShell>
      <div className="hero-cream">
        <HeroSection />
        <ServicesFanSection />
      </div>
      <ServicesCarouselSection />
      <PresenceGlobeSection />
      <PartnersMarqueeSection />
      <ImpactStatsSection />
      <ComparisonSection />
      <ProcessSection />
      <TestimonialsMarqueeSection />
      <BlogsSection />
      <ContactSection />
    </PageShell>
  );
}
