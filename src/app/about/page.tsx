import type { Metadata } from "next";

import { AboutView } from "@/features/landing/about-view";
import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "About",
  description:
    "Quantara Financial is a specialized strategic practice of Shahbaz Hannan & Co. Chartered Accountants, delivering tailored financial and accounting solutions.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutView />
      <InnerPageEndMatter />
    </PageShell>
  );
}
