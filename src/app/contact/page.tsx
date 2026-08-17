import type { Metadata } from "next";

import { ContactView } from "@/features/landing/contact-view";
import { InnerPageEndMatter } from "@/features/landing/inner-page-end-matter";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Email or call Quantara Financial for audit, taxation, advisory, outsourcing, and ERP.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactView />
      <InnerPageEndMatter />
    </PageShell>
  );
}
