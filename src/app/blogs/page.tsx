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
};

export default function BlogsPage() {
  return (
    <PageShell>
      <BlogsIndex />
      <InnerPageEndMatter />
    </PageShell>
  );
}
