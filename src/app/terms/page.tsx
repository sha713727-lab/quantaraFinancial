import type { Metadata } from "next";

import { termsSections } from "@/features/landing/legal-content";
import { LegalDocumentView } from "@/features/landing/legal-document-view";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms that govern use of the Quantara Financial website. Professional work is provided under a separate engagement.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Use",
    description:
      "Terms that govern use of the Quantara Financial website. Professional work is provided under a separate engagement.",
    url: "/terms",
    type: "website",
  },
  twitter: {
    title: "Terms of Use",
    description:
      "Terms that govern use of the Quantara Financial website. Professional work is provided under a separate engagement.",
  },
};

export default function TermsPage() {
  return (
    <PageShell>
      <LegalDocumentView
        title="Terms of Use"
        description="How this website may be used, and how it relates to a professional engagement with Quantara Financial."
        updatedOn="16 August 2026"
        sections={termsSections}
      />
    </PageShell>
  );
}
