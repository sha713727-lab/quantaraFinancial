import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quantarafinancial.info"),
  title: {
    default: "Quantara Financial | Your Secure And Trusted Financial Partner",
    template: "%s | Quantara Financial",
  },
  description:
    "Expert financial and accounting solutions — audit, taxation, corporate advisory, outsourcing, risk advisory, and Odoo ERP. A specialized practice of Shahbaz Hannan & Co. Chartered Accountants.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Quantara Financial | Your Secure And Trusted Financial Partner",
    description:
      "Expert financial and accounting solutions designed to elevate your business.",
    url: "https://quantarafinancial.info/",
    siteName: "Quantara Financial",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} h-full overflow-x-hidden antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
