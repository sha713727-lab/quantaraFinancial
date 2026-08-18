import { ContactSection } from "@/features/landing/contact-cta";

export function InnerPageEndMatter({
  title,
  description,
  ctaLabel,
}: {
  readonly title: string;
  readonly description: string;
  readonly ctaLabel: string;
}) {
  return (
    <ContactSection
      title={title}
      description={description}
      ctaLabel={ctaLabel}
    />
  );
}
