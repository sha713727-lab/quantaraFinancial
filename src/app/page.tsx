import type { Metadata } from "next";

import { LandingPage } from "@/features/landing/landing-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  twitter: {
    title: "Quantara Financial | Your Secure And Trusted Financial Partner",
    description:
      "Audit, taxation, ERP, corporate advisory, outsourcing, and risk advisory. A specialized practice of Shahbaz Hannan & Co. Chartered Accountants.",
  },
};

export default function Home() {
  return <LandingPage />;
}
