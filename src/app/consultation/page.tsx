import type { Metadata } from "next";

import { ConsultationView } from "@/features/landing/consultation-view";
import { PageShell } from "@/features/landing/page-shell";
import { resolveConsultationDefaults } from "@/schemas/contact-enquiry";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Consult Quantara Financial on audit, UAE UK and USA tax, advisory, bookkeeping, outsourcing, and Odoo ERP. Email or call to start.",
  alternates: {
    canonical: "/consultation",
  },
  openGraph: {
    title: "Book a Consultation",
    description:
      "Consult Quantara Financial on audit, UAE UK and USA tax, advisory, bookkeeping, outsourcing, and Odoo ERP.",
    url: "/consultation",
    type: "website",
  },
  twitter: {
    title: "Book a Consultation",
    description:
      "Consult Quantara Financial on audit, UAE UK and USA tax, advisory, bookkeeping, outsourcing, and Odoo ERP.",
  },
};

export default async function ConsultationPage({
  searchParams,
}: {
  readonly searchParams: Promise<{
    readonly service?: string | string[] | undefined;
    readonly source?: string | string[] | undefined;
  }>;
}) {
  const params = await searchParams;
  const defaults = resolveConsultationDefaults(params);

  return (
    <PageShell>
      <ConsultationView
        defaultService={defaults.service}
        defaultSource={defaults.source}
      />
    </PageShell>
  );
}
