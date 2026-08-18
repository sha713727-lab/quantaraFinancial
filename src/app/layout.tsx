import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";

import { organizationJsonLd } from "@/constants/organization-json-ld";
import { JsonLd } from "@/lib/json-ld";

import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quantarafinancial.info"),
  title: {
    default: "Quantara Financial | Your Secure And Trusted Financial Partner",
    template: "%s | Quantara Financial",
  },
  description:
    "Audit, taxation, ERP, corporate advisory, accounting outsourcing, and risk advisory for businesses in the UAE, UK, and USA. A specialized practice of Shahbaz Hannan & Co. Chartered Accountants.",
  openGraph: {
    title: "Quantara Financial | Your Secure And Trusted Financial Partner",
    description:
      "Audit, taxation, ERP, corporate advisory, outsourcing, and risk advisory. A specialized practice of Shahbaz Hannan & Co. Chartered Accountants.",
    url: "https://quantarafinancial.info/",
    siteName: "Quantara Financial",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd} />
        {children}
      </body>
    </html>
  );
}
