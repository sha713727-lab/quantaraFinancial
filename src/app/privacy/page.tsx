import type { Metadata } from "next";

import { privacySections } from "@/features/landing/legal-content";
import { LegalDocumentView } from "@/features/landing/legal-document-view";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Quantara Financial handles personal information when you use this website or contact the team.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy",
    description:
      "How Quantara Financial handles personal information when you use this website or contact the team.",
    url: "/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <LegalDocumentView
        title="Privacy Policy"
        description="How we handle personal information when you use this website or contact Quantara Financial."
        updatedOn="16 August 2026"
        sections={privacySections}
      />
    </PageShell>
  );
}
