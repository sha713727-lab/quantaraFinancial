import Link from "next/link";

import { sitePaths } from "@/constants/site-paths";
import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function NotFoundView() {
  return (
    <>
      <InnerPageHero
        title="Page not found"
        description="That address is not a page on Quantara Financial. Return home or open services, blogs, or contact."
      />
      <section className="hero-cream pb-16 sm:pb-20">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3 px-5 sm:flex-row sm:justify-center md:px-8">
          <Link
            href={sitePaths.home}
            className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white inline-flex min-h-12 w-full items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
          >
            Return home
          </Link>
          <Link
            href={sitePaths.services}
            className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-cream focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white inline-flex min-h-12 w-full items-center justify-center rounded-sm border px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none sm:w-auto"
          >
            Explore Our Services
          </Link>
        </div>
      </section>
    </>
  );
}
