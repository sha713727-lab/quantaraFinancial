import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogArticles, getBlogBySlug } from "@/features/landing/blog-articles";
import { BlogArticleView } from "@/features/landing/blog-article-view";
import { ContactSection } from "@/features/landing/contact-cta";
import { PageShell } from "@/features/landing/page-shell";
import { JsonLd } from "@/lib/json-ld";

type BlogArticleParams = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticleParams): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blogs/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `/blogs/${article.slug}`,
      type: "article",
    },
    twitter: {
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticleParams) {
  const { slug } = await params;
  const article = getBlogBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageShell>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt,
          url: `https://quantarafinancial.info/blogs/${article.slug}`,
          publisher: {
            "@type": "Organization",
            name: "Quantara Financial",
            url: "https://quantarafinancial.info",
          },
        }}
      />
      <BlogArticleView article={article} />
      <ContactSection
        title="Talk to a financial advisor"
        description="If this article raises a live tax, audit, or reporting question, bring it to the practice."
        ctaLabel="Talk to a Financial Advisor"
      />
    </PageShell>
  );
}
