import Link from "next/link";

import { blogPath, sitePaths } from "@/constants/site-paths";
import { blogPosts } from "@/features/landing/blog-articles";

export function BlogsSection() {
  return (
    <section
      id="blogs"
      aria-labelledby="blogs-title"
      className="hero-cream relative scroll-mt-24 py-16 font-sans sm:py-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        <h2
          id="blogs-title"
          className="text-brand-navy text-center font-sans text-[clamp(1.65rem,3.8vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.03em] uppercase italic"
        >
          Our Blogs
        </h2>
        <p className="text-brand-muted mx-auto mt-4 max-w-2xl text-center text-sm leading-7">
          Expert insights on international taxation, financial modeling, and
          business planning.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 md:grid-cols-3 md:gap-5">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={blogPath(post.slug)}
                className="border-brand-navy/10 bg-brand-cream-soft focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream flex h-full flex-col rounded-2xl border p-6 transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
              >
                <h3 className="text-brand-navy font-sans text-base font-semibold tracking-[-0.02em]">
                  {post.title}
                </h3>
                <p className="text-brand-muted mt-3 flex-1 text-sm leading-6">
                  {post.excerpt}
                </p>
                <span className="text-brand-navy mt-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase">
                  Read more <span aria-hidden="true">&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <Link
            href={sitePaths.blogs}
            className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-cream focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream inline-flex min-h-11 items-center justify-center rounded-sm border px-8 text-xs font-bold tracking-[0.12em] uppercase transition-[transform,background-color,color] duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
          >
            View more
          </Link>
        </div>
      </div>
    </section>
  );
}
