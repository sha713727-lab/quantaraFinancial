import type { Metadata } from "next";

import { ConsultationView } from "@/features/landing/consultation-view";
import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Consult Quantara Financial on audit, UAE UK and USA tax, advisory, outsourcing, and Odoo ERP. Email or call to start.",
  alternates: {
    canonical: "/consultation",
  },
  openGraph: {
    title: "Book a Consultation",
    description:
      "Consult Quantara Financial on audit, UAE UK and USA tax, advisory, outsourcing, and Odoo ERP.",
    url: "/consultation",
    type: "website",
  },
};

export default function ConsultationPage() {
  return (
    <PageShell>
      <ConsultationView />
      <InnerPageEndMatter />
    </PageShell>
  );
}
