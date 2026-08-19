import Link from "next/link";

import { blogPath } from "@/constants/site-paths";
import { blogArticles } from "@/features/landing/blog-articles";
import { InnerPageHero } from "@/features/landing/inner-page-hero";

export function BlogsIndex() {
  return (
    <>
      <InnerPageHero
        title="Our Blogs"
        description="Expert insights on international taxation, financial modeling, and business planning."
      />

      <section
        aria-labelledby="blogs-index-title"
        className="hero-cream relative pb-16 sm:pb-20"
      >
        <h2 id="blogs-index-title" className="sr-only">
          Articles
        </h2>
        <ul className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-5 md:grid-cols-3 md:gap-5 md:px-8">
          {blogArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={blogPath(article.slug)}
                className="border-brand-navy/10 bg-brand-cream-soft focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white flex h-full flex-col rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                <h3 className="text-brand-navy text-base font-semibold tracking-[-0.02em]">
                  {article.title}
                </h3>
                <p className="text-brand-muted mt-3 flex-1 text-sm leading-6">
                  {article.excerpt}
                </p>
                <span className="text-brand-navy mt-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                  Read more <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
