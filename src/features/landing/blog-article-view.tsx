import Link from "next/link";

import { blogPath, sitePaths } from "@/constants/site-paths";
import type { BlogArticle } from "@/features/landing/blog-articles";
import { blogArticles } from "@/features/landing/blog-articles";
import { HeroGlowBackdrop } from "@/features/landing/inner-page-hero";

export function BlogArticleView({
  article,
}: {
  readonly article: BlogArticle;
}) {
  const related = blogArticles.filter((item) => item.slug !== article.slug);

  return (
    <article className="hero-cream">
      <header className="relative">
        <HeroGlowBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pt-16 pb-10 sm:px-8 sm:pt-20">
          <h1 className="text-brand-navy text-[clamp(1.65rem,4vw,2.75rem)] leading-[1.15] font-semibold tracking-[-0.03em] uppercase italic">
            {article.title}
          </h1>
          <p className="text-brand-muted mt-5 text-sm leading-7 sm:text-base">
            {article.excerpt}
          </p>
        </div>
      </header>

      <div className="mx-auto w-full max-w-3xl px-5 pb-12 sm:px-8 sm:pb-16">
        {article.sections.map((section, index) => {
          if (section.type === "heading") {
            return (
              <h2
                key={`${section.type}-${index}`}
                className="text-brand-navy mt-10 text-xl font-bold tracking-[-0.02em] uppercase italic sm:text-2xl"
              >
                {section.text}
              </h2>
            );
          }

          if (section.type === "list") {
            return (
              <ul
                key={`${section.type}-${index}`}
                className="text-brand-muted mt-4 list-disc space-y-2 pl-5 text-sm leading-7 sm:text-base"
              >
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          }

          return (
            <p
              key={`${section.type}-${index}`}
              className="text-brand-muted mt-4 text-sm leading-7 sm:text-base"
            >
              {section.text}
            </p>
          );
        })}

        <Link
          href={sitePaths.consultation}
          className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream mt-10 inline-flex min-h-12 items-center justify-center rounded-sm px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(7,20,38,0.28)] focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          Talk to an Advisor
        </Link>
      </div>

      <section
        aria-labelledby="related-blogs-title"
        className="border-brand-navy/10 border-t py-16 sm:py-20"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
          <h2
            id="related-blogs-title"
            className="text-brand-navy text-center text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
          >
            More from the journal
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={blogPath(item.slug)}
                  className="border-brand-navy/10 bg-brand-cream-soft focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream flex h-full flex-col rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                >
                  <h3 className="text-brand-navy text-base font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h3>
                  <p className="text-brand-muted mt-3 flex-1 text-sm leading-6">
                    {item.excerpt}
                  </p>
                  <span className="text-brand-navy mt-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
