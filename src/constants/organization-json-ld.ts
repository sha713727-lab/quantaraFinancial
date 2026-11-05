import { contactEmail, contactPhoneE164 } from "@/constants/contact-email";
import { parentFirmName } from "@/constants/parent-firm";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Quantara Financial",
  url: "https://quantarafinancial.info",
  email: contactEmail,
  telephone: contactPhoneE164,
  description: `Audit, taxation, ERP, corporate advisory, bookkeeping, accounting outsourcing, and risk advisory. A specialized strategic partner of ${parentFirmName}.`,
  parentOrganization: {
    "@type": "Organization",
    name: parentFirmName,
  },
  areaServed: ["AE", "GB", "US"],
} as const;
