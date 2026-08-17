import { InnerPageHero } from "@/features/landing/inner-page-hero";
import type { LegalSection } from "@/features/landing/legal-content";

export function LegalDocumentView({
  title,
  description,
  updatedOn,
  sections,
}: {
  readonly title: string;
  readonly description: string;
  readonly updatedOn: string;
  readonly sections: readonly LegalSection[];
}) {
  return (
    <>
      <InnerPageHero title={title} description={description} />
      <article className="hero-cream pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <p className="text-brand-muted text-xs tracking-[0.04em]">
            Last updated {updatedOn}
          </p>
          {sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-brand-navy text-xl font-bold tracking-[-0.02em] uppercase italic sm:text-2xl">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-brand-muted mt-4 text-sm leading-7 sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
