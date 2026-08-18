import type { Metadata } from "next";

import { BlogsIndex } from "@/features/landing/blogs-index";
import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Insights on international taxation, financial modeling, and business financial planning from Quantara Financial.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "Blogs",
    description:
      "Insights on international taxation, financial modeling, and business financial planning from Quantara Financial.",
    url: "/blogs",
    type: "website",
  },
  twitter: {
    title: "Blogs",
    description:
      "Insights on international taxation, financial modeling, and business financial planning from Quantara Financial.",
  },
};

export default function BlogsPage() {
  return (
    <PageShell>
      <BlogsIndex />
      <InnerPageEndMatter
        title="Talk to a financial advisor"
        description="If an article raises a live tax, audit, or reporting question, bring it to the practice."
        ctaLabel="Talk to a Financial Advisor"
      />
    </PageShell>
  );
}
