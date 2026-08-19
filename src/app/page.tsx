import type { Metadata } from "next";

import { parentFirmName } from "@/constants/parent-firm";
import { LandingPage } from "@/features/landing/landing-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  twitter: {
    title: "Quantara Financial | Your Secure And Trusted Financial Partner",
    description: `Audit, taxation, ERP, corporate advisory, bookkeeping, outsourcing, and risk advisory. A specialized partner of ${parentFirmName}.`,
  },
};

export default function Home() {
  return <LandingPage />;
}
