import { ContactSection } from "@/features/landing/contact-cta";
import { TestimonialsMarqueeSection } from "@/features/landing/testimonials-marquee";

export function InnerPageEndMatter() {
  return (
    <>
      <TestimonialsMarqueeSection />
      <ContactSection />
    </>
  );
}
