import { contactEmail, contactPhone } from "@/constants/contact-email";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Quantara Financial",
  url: "https://quantarafinancial.info",
  email: contactEmail,
  telephone: contactPhone,
  description:
    "Audit, taxation, ERP, corporate advisory, accounting outsourcing, and risk advisory. A specialized strategic practice of Shahbaz Hannan & Co. Chartered Accountants.",
  parentOrganization: {
    "@type": "Organization",
    name: "Shahbaz Hannan & Co. Chartered Accountants",
  },
  areaServed: ["AE", "GB", "US"],
} as const;
