import type { Metadata } from "next";

import { ContactView } from "@/features/landing/contact-view";
import { PageShell } from "@/features/landing/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell Quantara what you need on audit, taxation, advisory, outsourcing, or ERP. Email, call, or send the form.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact",
    description:
      "Tell Quantara what you need on audit, taxation, advisory, outsourcing, or ERP. Email, call, or send the form.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    title: "Contact",
    description:
      "Tell Quantara what you need on audit, taxation, advisory, outsourcing, or ERP. Email, call, or send the form.",
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <ContactView />
    </PageShell>
  );
}
