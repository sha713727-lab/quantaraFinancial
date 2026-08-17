import { CircleDollarSign, Landmark, Scale } from "lucide-react";

import type { Service } from "@/features/landing/content";

export const specialtyParentBySlug: Readonly<Record<string, string>> = {
  "uae-tax": "taxation",
  "uk-tax": "taxation",
  "usa-tax": "taxation",
  bookkeeping: "accounting-outsourcing",
  "financial-modeling": "accounting-outsourcing",
  "investor-documentation": "corporate-advisory",
};

export const specialtyServices: readonly Service[] = [
  {
    slug: "uae-tax",
    number: "UAE",
    category: "Taxation",
    title: "UAE Tax & Accounting",
    description:
      "VAT, corporate tax, bookkeeping, payroll, and business establishment support in the UAE.",
    headline: "UAE tax handled with the books, not beside them.",
    statement:
      "Compliance in the Emirates starts with records that already stand up.",
    body: "UAE tax and accounting support for businesses operating in the Emirates — VAT and corporate tax advisory and filings, bookkeeping and payroll, and guidance on establishment and ongoing regulatory requirements. The work is scoped so filings and the ledgers stay aligned.",
    highlights: [
      "VAT and corporate tax advisory and filing",
      "Accounting, bookkeeping, and payroll",
      "Business establishment and ongoing compliance",
    ],
    ctaLabel: "Explore UAE tax & accounting",
    icon: Scale,
    image: "/services/taxation.jpg",
    imageAlt: "Tax documents, calculator, and pen arranged on a desk",
  },
  {
    slug: "uk-tax",
    number: "UK",
    category: "Taxation",
    title: "UK Tax & Accounting",
    description:
      "VAT, corporation tax, and bookkeeping for businesses with UK obligations.",
    headline: "UK filings built on books that are already current.",
    statement: "Corporation tax and VAT only hold if the records do.",
    body: "UK tax and accounting for companies and groups with UK obligations — VAT registration, filing and advisory, corporation tax planning and compliance, and bookkeeping aligned to UK rules. The same practice that keeps the books prepares the returns.",
    highlights: [
      "VAT registration, filing, and advisory",
      "Corporation tax planning and compliance",
      "Bookkeeping aligned to UK financial regulations",
    ],
    ctaLabel: "Explore UK tax & accounting",
    icon: Scale,
    image: "/services/taxation.jpg",
    imageAlt: "Tax documents, calculator, and pen arranged on a desk",
  },
  {
    slug: "usa-tax",
    number: "USA",
    category: "Taxation",
    title: "USA Tax & Accounting",
    description:
      "Federal, state, and entity filings including 1040, 1065, 1120, 1120S, 990, and FBAR.",
    headline: "US filings prepared for the forms you actually need.",
    statement: "Federal and state tax is a file, not a guess at year end.",
    body: "USA tax preparation and planning for individuals, partnerships, corporations, S corporations, NGOs, trusts, estates, and non-residents. Filings include 1040, 1040NR, 1040X, 1065, 1120, 1120S, 1120F, 990, 990EZ, 1041, 5471, 5472, 941, and FBAR, with federal, state, sales, and payroll tax support where the engagement requires it.",
    highlights: [
      "Individual, partnership, and corporate returns",
      "S corporation, NGO, trust, and non-resident filings",
      "FBAR and cross-border reporting where required",
    ],
    ctaLabel: "Explore USA tax & accounting",
    icon: Scale,
    image: "/services/taxation.jpg",
    imageAlt: "Tax documents, calculator, and pen arranged on a desk",
  },
  {
    slug: "bookkeeping",
    number: "01",
    category: "Outsourcing",
    title: "Accounting & Bookkeeping",
    description:
      "Ledgers, reconciliations, receivables, payables, payroll, and monthly reporting.",
    headline: "Books that stay current without the operational drag.",
    statement: "Let the numbers stay accurate while you run the business.",
    body: "Accounting and bookkeeping designed to keep records accurate and up to date — daily transactions, ledgers, bank reconciliations, accounts receivable and payable, payroll, and monthly financial reporting. The work is built so leadership can focus on growth with a clear financial picture.",
    highlights: [
      "Transaction recording and ledger maintenance",
      "Bank reconciliation, receivables, and payables",
      "Monthly reporting and payroll",
    ],
    ctaLabel: "Explore bookkeeping",
    icon: CircleDollarSign,
    image: "/services/accounting-outsourcing.jpg",
    imageAlt: "Ledger, invoices, and financial records on a desk",
  },
  {
    slug: "financial-modeling",
    number: "02",
    category: "Outsourcing",
    title: "Financial Modeling & Budgeting",
    description:
      "Forecasts, budgets, scenario analysis, and investor-ready models.",
    headline: "A model you can actually run the business on.",
    statement: "Planning is cheaper than correcting a decision already made.",
    body: "Financial models and budgets that reflect how the business performs — revenue and expense forecasts, cash flow, profit and loss, balance sheet, sensitivity and breakeven analysis, and pricing work. Models are built to be updated, not handed over and left stale.",
    highlights: [
      "Integrated financial models and dashboards",
      "Budget planning and management",
      "Sensitivity, breakeven, and pricing analysis",
    ],
    ctaLabel: "Explore financial modeling",
    icon: CircleDollarSign,
    image: "/services/accounting-outsourcing.jpg",
    imageAlt: "Ledger, invoices, and financial records on a desk",
  },
  {
    slug: "investor-documentation",
    number: "03",
    category: "Advisory",
    title: "Investor Documentation",
    description:
      "Investor-ready plans, memos, valuations, teasers, and pitch materials.",
    headline: "Materials that stand up in a fundraising conversation.",
    statement: "Investors read the story only after the numbers hold.",
    body: "Investor-grade documentation for businesses seeking capital from venture firms, angels, and family offices — executive summaries, investment memoranda, valuations, teasers, business plans, pitch decks, and supporting financial models. The work is written to the standard professional investors expect.",
    highlights: [
      "Executive summaries and investment memoranda",
      "Business valuation and investment teasers",
      "Plans, decks, and due-diligence packs",
    ],
    ctaLabel: "Explore investor documentation",
    icon: Landmark,
    image: "/services/corporate-advisory.jpg",
    imageAlt: "Two professionals shaking hands in an office meeting room",
  },
];
