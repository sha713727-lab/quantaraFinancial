import Image from "next/image";
import Link from "next/link";

import { servicePath, sitePaths } from "@/constants/site-paths";
import { getRelatedServices, type Service } from "@/features/landing/content";
import { HeroGlowBackdrop } from "@/features/landing/inner-page-hero";
import { getServiceOfferings } from "@/features/landing/service-offerings";

export function ServiceDetailView({ service }: { readonly service: Service }) {
  const offerings = getServiceOfferings(service.slug);
  const related = getRelatedServices(service.slug);

  return (
    <>
      <section className="hero-cream relative">
        <HeroGlowBackdrop />
        <div className="relative z-10 mx-auto grid w-full max-w-[1200px] gap-10 px-5 pt-12 pb-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14 lg:pt-16 lg:pb-20">
          <div className="bg-brand-navy relative aspect-4/5 overflow-hidden rounded-[1.75rem] sm:aspect-4/3 lg:aspect-4/5">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
            <span className="media-card-gloss" aria-hidden="true" />
          </div>

          <div>
            <h1 className="text-brand-navy text-[clamp(1.65rem,3.8vw,2.85rem)] leading-[1.12] font-semibold tracking-[-0.03em] uppercase italic">
              {service.title}
            </h1>
            <p className="text-brand-navy mt-4 text-base leading-7">
              {service.statement}
            </p>
            <p className="text-brand-muted mt-4 text-sm leading-7">
              {service.body}
            </p>
            <ul className="mt-6 space-y-2.5">
              {service.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="text-brand-navy flex gap-3 text-sm leading-6"
                >
                  <span className="text-brand-accent" aria-hidden="true">
                    &mdash;
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
            <Link
              href={sitePaths.consultation}
              className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream mt-8 inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(7,20,38,0.28)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>

      {offerings ? (
        <section
          aria-labelledby="service-offerings-title"
          className="hero-cream pb-8 sm:pb-12"
        >
          <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
            <h2
              id="service-offerings-title"
              className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
            >
              What the work covers
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
              {offerings.map((offering) => {
                const body = (
                  <>
                    <h3 className="text-brand-navy text-base font-semibold tracking-[-0.02em]">
                      {offering.title}
                    </h3>
                    <p className="text-brand-muted mt-3 text-sm leading-6">
                      {offering.description}
                    </p>
                    {offering.href ? (
                      <span className="text-brand-navy mt-5 inline-flex text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                        Read more <span aria-hidden="true">&rarr;</span>
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <li key={offering.title}>
                    {offering.href ? (
                      <Link
                        href={offering.href}
                        className="border-brand-navy/10 bg-brand-cream-soft focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream flex h-full flex-col rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                      >
                        {body}
                      </Link>
                    ) : (
                      <div className="border-brand-navy/10 bg-brand-cream-soft flex h-full flex-col rounded-2xl border p-6">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      <section
        aria-labelledby="related-services-title"
        className="hero-cream py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
          <h2
            id="related-services-title"
            className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            More practice areas
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={servicePath(item.slug)}
                  className="border-brand-navy/10 bg-brand-cream-soft focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream flex h-full flex-col rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <p className="text-brand-navy text-[0.65rem] font-bold tracking-[0.22em] uppercase">
                    {item.category}
                  </p>
                  <h3 className="text-brand-navy mt-3 text-base font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-brand-muted mt-3 flex-1 text-sm leading-6">
                    {item.description}
                  </p>
                  <span className="text-brand-navy mt-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                    {item.ctaLabel} <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
