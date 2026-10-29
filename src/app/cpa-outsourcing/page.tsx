import type { Metadata } from "next";

import { CpaOutsourcingView } from "@/features/landing/cpa-outsourcing-view";
import { cpaOutsourcingPage } from "@/features/landing/cpa-outsourcing-content";
import { PageShell } from "@/features/landing/page-shell";

const title = cpaOutsourcingPage.metaTitle;
const description = cpaOutsourcingPage.metaDescription;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/cpa-outsourcing",
  },
  openGraph: {
    title,
    description,
    url: "/cpa-outsourcing",
    type: "website",
  },
  twitter: {
    title,
    description,
  },
};

export default function CpaOutsourcingPage() {
  return (
    <PageShell>
      <CpaOutsourcingView />
    </PageShell>
  );
}
