import type { Metadata } from "next";

import { parentFirmName } from "@/constants/parent-firm";
import { AboutView } from "@/features/landing/about-view";
import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "About",
  description: `Quantara Financial is a specialized strategic partner of ${parentFirmName}, delivering tailored financial and accounting solutions.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About",
    description: `Quantara Financial is a specialized strategic partner of ${parentFirmName}, delivering tailored financial and accounting solutions.`,
    url: "/about",
    type: "website",
  },
  twitter: {
    title: "About",
    description: `Quantara Financial is a specialized strategic partner of ${parentFirmName}, delivering tailored financial and accounting solutions.`,
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <AboutView />
      <InnerPageEndMatter
        title="Work with Quantara"
        description="Talk to the practice about audit, tax, advisory, outsourcing, or ERP. We start with the problem, then the scope."
        ctaLabel="Work With Quantara"
      />
    </PageShell>
  );
}
