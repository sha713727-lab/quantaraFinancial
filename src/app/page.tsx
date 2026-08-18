import type { Metadata } from "next";

import { parentFirmName } from "@/constants/parent-firm";
import { LandingPage } from "@/features/landing/landing-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  twitter: {
    title: "Quantara Financial | Your Secure And Trusted Financial Partner",
    description: `Audit, taxation, ERP, corporate advisory, outsourcing, and risk advisory. A specialized practice of ${parentFirmName}.`,
  },
};

export default function Home() {
  return <LandingPage />;
}
