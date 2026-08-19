import { parentFirmName } from "@/constants/parent-firm";

export type LegalSection = {
  readonly heading: string;
  readonly paragraphs: readonly string[];
};

export const privacySections: readonly LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      `Quantara Financial is a specialized strategic partner of ${parentFirmName}. This policy describes how we handle personal information when you use quantarafinancial.info or contact us.`,
      "Questions about this policy can be sent to team@quantarafinancial.info or by telephone to +1 (877) 963-6280.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "The contact form on this website collects first name, last name, email address, telephone number, organisation name, the practice area selected, and the message you submit. If you email or telephone us instead, we receive the details you choose to send — typically your name, email address, telephone number, organisation, and the content of your enquiry.",
      "Our servers may record technical data required to deliver the site and to protect the contact form, such as IP address, browser type, and the pages requested. We do not use advertising cookies or analytics pixels on this site.",
    ],
  },
  {
    heading: "How we use information",
    paragraphs: [
      "We use enquiry details to respond, to assess whether we can take on the work, and to keep records required for professional and legal obligations. Form submissions are emailed to team@quantarafinancial.info using authenticated SMTP. We do not sell personal information.",
    ],
  },
  {
    heading: "Sharing",
    paragraphs: [
      `Information may be shared with ${parentFirmName} where that is required to deliver the engagement, and with service providers who host this website, solely to operate it. We may disclose information if required by law or a professional regulator.`,
    ],
  },
  {
    heading: "Retention and your rights",
    paragraphs: [
      "Enquiry records are kept for as long as needed to handle the matter and to meet professional, tax, and legal retention duties. You may ask what personal information we hold, request a correction, or ask us to delete it where we are not required to keep it. Contact team@quantarafinancial.info.",
    ],
  },
  {
    heading: "Changes",
    paragraphs: [
      "We may update this policy when our practices or the law change. The revised policy will be posted on this page with an updated date.",
    ],
  },
];

export const termsSections: readonly LegalSection[] = [
  {
    heading: "About this website",
    paragraphs: [
      `These terms govern use of quantarafinancial.info, operated by Quantara Financial, a specialized strategic partner of ${parentFirmName}. By using the site you agree to these terms.`,
    ],
  },
  {
    heading: "Information only",
    paragraphs: [
      "Content on this site is general information about our practice areas. It is not tax, audit, legal, or investment advice and is not an offer to accept an engagement. Professional work starts only when both parties have agreed the scope in writing.",
    ],
  },
  {
    heading: "Engagements",
    paragraphs: [
      "Audit, tax, advisory, outsourcing, and ERP work is provided under a separate engagement letter or contract. That document, not these website terms, governs fees, confidentiality, liability, and the work itself.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The site design, text, and graphics are owned by Quantara Financial or used with permission. You may not copy, scrape, or republish them for commercial use without prior written consent.",
    ],
  },
  {
    heading: "Accuracy and availability",
    paragraphs: [
      "We take care with what we publish, but we do not warrant that the site is complete, current, or uninterrupted. We may change or withdraw pages at any time.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      `To the extent permitted by law, Quantara Financial and ${parentFirmName} are not liable for loss arising from use of this website or reliance on its content. This does not affect liability that cannot be excluded, or liability under a signed engagement.`,
    ],
  },
  {
    heading: "Changes and contact",
    paragraphs: [
      "We may update these terms by posting a new version on this page. Continued use of the site after a change means you accept the new terms. Contact team@quantarafinancial.info or +1 (877) 963-6280.",
    ],
  },
];
