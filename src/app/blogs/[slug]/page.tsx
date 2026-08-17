import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { blogArticles, getBlogBySlug } from "@/features/landing/blog-articles";
import { BlogArticleView } from "@/features/landing/blog-article-view";
import { ContactSection } from "@/features/landing/contact-cta";
import { PageShell } from "@/features/landing/page-shell";

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
      <BlogArticleView article={article} />
      <ContactSection />
    </PageShell>
  );
}
