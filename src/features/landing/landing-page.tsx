import { BlogsSection } from "@/features/landing/blogs-section";
import { ComparisonSection } from "@/features/landing/comparison-section";
import { ContactSection } from "@/features/landing/contact-cta";
import { CpaCredentialsSection } from "@/features/landing/cpa-credentials-section";
import { HeroSection } from "@/features/landing/hero-trust";
import { ImpactStatsSection } from "@/features/landing/impact-stats";
import { PageShell } from "@/features/landing/page-shell";
import { PresenceGlobeSection } from "@/features/landing/presence-globe";
import { ProcessSection } from "@/features/landing/process-cta";
import { LandingScrollSync } from "@/features/landing/scroll-sync.client";
import { ServicesCarouselSection } from "@/features/landing/services-carousel";
import { ServicesFanSection } from "@/features/landing/services-fan";

export function LandingPage() {
  return (
    <PageShell>
      <LandingScrollSync />
      <div className="hero-cream">
        <HeroSection />
        <ServicesFanSection />
      </div>
      <ServicesCarouselSection />
      <PresenceGlobeSection />
      <ImpactStatsSection />
      <ComparisonSection />
      <ProcessSection />
      <CpaCredentialsSection />
      <BlogsSection />
      <ContactSection />
    </PageShell>
  );
}
