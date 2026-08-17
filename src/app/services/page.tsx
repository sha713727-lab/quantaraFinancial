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
};

export default function ServicesPage() {
  return (
    <PageShell>
      <ServicesIndex />
      <InnerPageEndMatter />
    </PageShell>
  );
}
