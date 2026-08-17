import Image from "next/image";
import Link from "next/link";

import { servicePath } from "@/constants/site-paths";
import { services } from "@/features/landing/content";
import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function ServicesIndex() {
  return (
    <>
      <InnerPageHero
        title="Our Services"
        description="Audit, taxation, ERP, corporate advisory, accounting outsourcing, and risk advisory — so the financial work of the business is handled with one practice."
      />

      <section
        aria-labelledby="services-index-title"
        className="hero-cream relative pb-16 sm:pb-20"
      >
        <h2 id="services-index-title" className="sr-only">
          Practice areas
        </h2>
        <ul className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 sm:grid-cols-2 sm:gap-5 md:px-8 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={servicePath(service.slug)}
                className="border-brand-navy/10 bg-brand-cream-soft focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream flex h-full flex-col overflow-hidden rounded-2xl border transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                <div className="bg-brand-navy relative aspect-16/10">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-brand-accent text-[0.65rem] font-bold tracking-[0.22em] uppercase">
                    {service.category} — {service.number}
                  </p>
                  <h3 className="text-brand-navy mt-3 text-lg font-semibold tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-brand-muted mt-3 flex-1 text-sm leading-6">
                    {service.description}
                  </p>
                  <span className="text-brand-navy mt-5 inline-flex items-center gap-2 text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                    {service.ctaLabel}
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
