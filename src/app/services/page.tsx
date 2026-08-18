import type { Metadata } from "next";

import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";
import { ServicesIndex } from "@/features/landing/services-index";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Audit, taxation, ERP, corporate advisory, accounting outsourcing, and risk advisory from Quantara Financial.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services",
    description:
      "Audit, taxation, ERP, corporate advisory, accounting outsourcing, and risk advisory from Quantara Financial.",
    url: "/services",
    type: "website",
  },
  twitter: {
    title: "Services",
    description:
      "Audit, taxation, ERP, corporate advisory, accounting outsourcing, and risk advisory from Quantara Financial.",
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesIndex />
      <InnerPageEndMatter
        title="Discuss your requirements"
        description="Choose a practice area, or tell us the decision you need to make. We will take it from there."
        ctaLabel="Discuss Your Requirements"
      />
    </PageShell>
  );
}
