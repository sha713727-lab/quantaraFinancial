import {
  BarChart3,
  Building2,
  CircleDollarSign,
  FileCheck2,
  Landmark,
  Scale,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  specialtyParentBySlug,
  specialtyServices,
} from "@/features/landing/specialty-services";

export type Service = {
  readonly slug: string;
  readonly number: string;
  readonly category: string;
  readonly title: string;
  readonly description: string;
  readonly headline: string;
  readonly statement: string;
  readonly body: string;
  readonly highlights: readonly [string, string, string];
  readonly ctaLabel: string;
  readonly icon: LucideIcon;
  readonly image: string;
  readonly imageAlt: string;
};

export type ProcessStep = {
  readonly number: string;
  readonly title: string;
  readonly description: string;
};

export const services: readonly Service[] = [
  {
    slug: "accounting-outsourcing",
    number: "01",
    category: "Outsourcing",
    title: "Accounting & Bookkeeping",
    description:
      "Bookkeeping, reporting, and finance operations so you can focus on growth.",
    headline: "Accurate books, without the operational drag.",
    statement: "Let the numbers stay current while you run the business.",
    body: "Accounting and finance functions managed with accuracy and compliance, from daily bookkeeping to monthly reporting, receivables, payables, and financial statements. The work is built so leadership can focus on growing the business.",
    highlights: [
      "Bookkeeping and reconciliations",
      "Monthly financial reporting",
      "Accounts receivable and payable",
    ],
    ctaLabel: "Explore accounting outsourcing",
    icon: CircleDollarSign,
    image: "/services/accounting-outsourcing.jpg",
    imageAlt: "Ledger, invoices, and financial records on a desk",
  },
  {
    slug: "audit-assurance",
    number: "02",
    category: "Assurance",
    title: "Audit & Assurance",
    description:
      "Independent audits that strengthen transparency and stakeholder confidence.",
    headline: "Assurance that makes your reporting credible.",
    statement: "Confidence begins with numbers that hold up to review.",
    body: "Independent audits and assurance services that strengthen financial transparency and stakeholder confidence. The work is documented, risk-aware, and built to withstand scrutiny from leadership, lenders, and regulators.",
    highlights: [
      "Independent financial statement audits",
      "Risk and control observations",
      "Reporting prepared for scrutiny",
    ],
    ctaLabel: "Explore audit & assurance",
    icon: FileCheck2,
    image: "/services/audit-assurance.jpg",
    imageAlt: "Advisors reviewing financial statements together at a desk",
  },
  {
    slug: "taxation",
    number: "03",
    category: "Tax",
    title: "Taxation",
    description:
      "Strategic tax planning, compliance, and advisory across UAE, UK, and USA.",
    headline: "Tax positions built on discipline, not guesswork.",
    statement: "Planning early costs less than correcting later.",
    body: "Strategic tax planning, compliance, and advisory to help you minimize liabilities and stay compliant. Support covers VAT and corporate tax, filings, and bookkeeping for businesses operating in the UAE, UK, and USA.",
    highlights: [
      "UAE VAT, filing, and accounting",
      "UK VAT, corporation tax, and bookkeeping",
      "USA federal, state, and entity filings",
    ],
    ctaLabel: "Explore taxation",
    icon: Scale,
    image: "/services/taxation.jpg",
    imageAlt: "Tax documents, calculator, and pen arranged on a desk",
  },
  {
    slug: "erp-solutions",
    number: "04",
    category: "ERP",
    title: "ERP Solutions",
    description:
      "Odoo implementation, migration, customization, and ongoing support.",
    headline: "Operations running on one connected system.",
    statement: "Better decisions start with a single source of truth.",
    body: "Tailored Odoo ERP solutions that integrate finance, sales, inventory, payroll, and operations. Functional and technical consultants work from consultation through implementation, training, and ongoing support.",
    highlights: [
      "Implementation, migration, and integration",
      "Customization, training, and support",
      "Odoo bookkeeping and consultancy",
    ],
    ctaLabel: "Explore ERP solutions",
    icon: Building2,
    image: "/services/erp-solutions.jpg",
    imageAlt: "Business operations dashboard on a laptop screen",
  },
  {
    slug: "corporate-advisory",
    number: "05",
    category: "Advisory",
    title: "Corporate Advisory",
    description:
      "Guidance on strategy, restructuring, mergers, acquisitions, and governance.",
    headline: "Guidance for the decisions that shape the business.",
    statement: "The right question matters more than the fastest answer.",
    body: "Expert guidance on business strategy, restructuring, mergers, acquisitions, and corporate governance. We frame the question, review the financial picture behind it, and set out options leadership can weigh.",
    highlights: [
      "Strategy and restructuring",
      "Mergers and acquisitions support",
      "Corporate governance advice",
    ],
    ctaLabel: "Explore corporate advisory",
    icon: Landmark,
    image: "/services/corporate-advisory.jpg",
    imageAlt: "Two professionals shaking hands in an office meeting room",
  },
  {
    slug: "risk-advisory",
    number: "06",
    category: "Risk",
    title: "Risk Advisory",
    description:
      "Identify, assess, and mitigate risk through controls and tailored strategy.",
    headline: "Risk seen early enough to act on.",
    statement:
      "Controls only work when they match how the business actually runs.",
    body: "Identifying, assessing, and mitigating business risks through tailored strategies and robust internal controls. The work connects compliance, reporting, and operations so exposure is managed before it becomes a loss.",
    highlights: [
      "Risk identification and assessment",
      "Internal control design",
      "Mitigation strategies leadership can apply",
    ],
    ctaLabel: "Explore risk advisory",
    icon: BarChart3,
    image: "/services/risk-advisory.jpg",
    imageAlt: "Risk review notes and financial charts on a conference table",
  },
];

export const allPracticePages: readonly Service[] = [
  ...services,
  ...specialtyServices,
];

export type ComparisonPoint = {
  readonly other: string;
  readonly quantara: string;
};

export const comparisonPoints: readonly ComparisonPoint[] = [
  {
    other: "Tax advice that stops at one jurisdiction",
    quantara: "UAE, UK, and USA tax and accounting in one practice",
  },
  {
    other: "Founders left to keep their own books",
    quantara: "Accounting and finance outsourcing that stays current",
  },
  {
    other: "ERP handed to a separate vendor",
    quantara: "Odoo implementation, training, and support with the same team",
  },
  {
    other: "Generic audit checklists without context",
    quantara: "Independent assurance that strengthens stakeholder confidence",
  },
  {
    other: "Advisory that ends when the slides are delivered",
    quantara: "Consult, deliver, and stay with the business",
  },
  {
    other: "Risk noticed only after the event",
    quantara: "Risk advisory and internal controls built into the work",
  },
  {
    other: "Template investor materials",
    quantara: "Investor-ready models, plans, and documentation",
  },
  {
    other: "Unclear compliance posture",
    quantara: "Chartered accountants with regulatory depth on every engagement",
  },
];

export type ImpactStat = {
  readonly value: string;
  readonly label: string;
  readonly description: string;
};

export const impactStats: readonly ImpactStat[] = [
  {
    value: "06",
    label: "Practice areas",
    description:
      "Audit, taxation, ERP, corporate advisory, outsourcing, and risk.",
  },
  {
    value: "03",
    label: "Tax jurisdictions",
    description: "UAE, UK, and USA tax, accounting, and compliance support.",
  },
  {
    value: "03",
    label: "Engagement stages",
    description:
      "Consult, deliver, and support — staying with the business through each phase.",
  },
];

export type Testimonial = {
  readonly name: string;
  readonly role: string;
  readonly photo: string;
  readonly quote: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    name: "Adil Khan",
    role: "Client",
    photo: "/testimonials/adilKhan.jpg",
    quote:
      "I recently had the privilege of working with Quantara, and I am beyond impressed with their services. From the moment I reached out, their team demonstrated a level of professionalism and expertise that immediately put me at ease.",
  },
  {
    name: "Mian Tanzeel",
    role: "Client",
    photo: "/testimonials/mianTanzeel.jpg",
    quote:
      "Quantara is a top-tier firm for taxation, audit, and advisory. I had a great experience with them. I highly recommend them for all your taxation, audit, and advisory services.",
  },
  {
    name: "Masood Khalid Mughal",
    role: "Client",
    photo: "/testimonials/masoodKhalidMughal.jpg",
    quote:
      "Quantara is a top-tier firm with expert chartered accountants. Their professionalism, detailed audits, smooth tax filing, business registrations, and exceptional accounting service are outstanding.",
  },
  {
    name: "Todd Thordinsky",
    role: "Ti Coat Inc, USA",
    photo: "/testimonials/toddThordinsky.jpg",
    quote:
      "Quantara provided us with a one-stop solution in Odoo for all our needs, from a custom quotation tool to our website, as well as invoicing and accounting management.",
  },
  {
    name: "John T Cox",
    role: "Chateau Montreux LLC, USA",
    photo: "/testimonials/johnTCox.jpg",
    quote:
      "The Quantara team has been instrumental in streamlining the accounting and procurement processes for my rental business.",
  },
];

export const processSteps: readonly ProcessStep[] = [
  {
    number: "01",
    title: "Consult",
    description:
      "Assess the business, obligations, and the right scope of work before any recommendation is made.",
  },
  {
    number: "02",
    title: "Deliver",
    description:
      "Carry out the accounting, tax, audit, advisory, or ERP work, then set the findings out clearly.",
  },
  {
    number: "03",
    title: "Support",
    description:
      "Stay with the business through filings, reporting, and the next questions as operations change.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return allPracticePages.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string): readonly Service[] {
  const parentSlug = specialtyParentBySlug[slug];
  const parent = parentSlug
    ? services.find((service) => service.slug === parentSlug)
    : undefined;
  const rest = services.filter(
    (service) => service.slug !== slug && service.slug !== parentSlug,
  );

  return parent ? [parent, ...rest] : rest;
}
