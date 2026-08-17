import { servicePath } from "@/constants/site-paths";

export type ServiceOffering = {
  readonly title: string;
  readonly description: string;
  readonly href?: string;
};

export const serviceOfferings: Readonly<
  Record<string, readonly ServiceOffering[]>
> = {
  "audit-assurance": [
    {
      title: "Independent financial statement audits",
      description:
        "Audits documented, risk-aware, and built to withstand scrutiny from leadership, lenders, and regulators.",
    },
    {
      title: "Risk and control observations",
      description:
        "Findings that show where controls hold and where exposure sits, written so management can act.",
    },
    {
      title: "Reporting prepared for scrutiny",
      description:
        "Assurance reporting that strengthens transparency and stakeholder confidence without theatre.",
    },
  ],
  taxation: [
    {
      title: "UAE tax and accounting",
      description:
        "VAT and corporate tax advisory, filings, bookkeeping, payroll, and support for business establishment in the UAE.",
      href: servicePath("uae-tax"),
    },
    {
      title: "UK tax and accounting",
      description:
        "VAT registration and filing, corporation tax planning and compliance, and bookkeeping aligned to UK rules.",
      href: servicePath("uk-tax"),
    },
    {
      title: "USA tax and accounting",
      description:
        "Federal, state, and entity filings including 1040, 1040NR, 1065, 1120, 1120S, 990, 5471, 5472, and FBAR.",
      href: servicePath("usa-tax"),
    },
  ],
  "erp-solutions": [
    {
      title: "Odoo implementation",
      description:
        "Deploy Odoo so finance, sales, inventory, payroll, and operations run on one connected system.",
    },
    {
      title: "Migration and integration",
      description:
        "Move from the current stack to Odoo with continuity of records and without disrupting daily work.",
    },
    {
      title: "Customization, training, and support",
      description:
        "Fit the modules to how the business actually runs, then train the team and stay for ongoing support.",
    },
    {
      title: "Odoo bookkeeping and consultancy",
      description:
        "Keep financial records inside Odoo with functional and technical consultants on the same engagement.",
    },
  ],
  "corporate-advisory": [
    {
      title: "Strategy and restructuring",
      description:
        "Frame the question, review the financial picture behind it, and set out options leadership can weigh.",
    },
    {
      title: "Mergers and acquisitions support",
      description:
        "Support on transactions and corporate governance so the numbers and the structure hold together.",
    },
    {
      title: "Investor-ready documentation",
      description:
        "Executive summaries, investment memoranda, valuations, teasers, business plans, and pitch materials.",
      href: servicePath("investor-documentation"),
    },
  ],
  "accounting-outsourcing": [
    {
      title: "Bookkeeping",
      description:
        "Daily records kept accurate and current, from ledgers through to organised source documents.",
      href: servicePath("bookkeeping"),
    },
    {
      title: "Financial statements and monthly reporting",
      description:
        "Statements and management reports that show performance and position so decisions are made with the numbers in view.",
    },
    {
      title: "Bank reconciliation, receivables, and payables",
      description:
        "Reconciliations, invoicing, and payments handled so cash flow stays visible and discrepancies are closed.",
    },
    {
      title: "Payroll and financial modeling",
      description:
        "Payroll processed to regulation, plus models and budgets for planning, fundraising, and internal control.",
      href: servicePath("financial-modeling"),
    },
  ],
  "risk-advisory": [
    {
      title: "Risk identification and assessment",
      description:
        "See exposure across reporting, compliance, and operations before it becomes a loss.",
    },
    {
      title: "Internal control design",
      description:
        "Controls that match how the business actually runs, not a generic checklist dropped onto the file.",
    },
    {
      title: "Mitigation leadership can apply",
      description:
        "Tailored strategies that sit with the people who have to operate them, reviewed as the business changes.",
    },
  ],
  "uae-tax": [
    {
      title: "VAT and corporate tax advisory",
      description:
        "VAT and corporate tax registration, filing, and planning for businesses operating in the UAE.",
    },
    {
      title: "Accounting, bookkeeping, and payroll",
      description:
        "Records, statements, and payroll kept to UAE standards so tax filings sit on current books.",
    },
    {
      title: "Business establishment",
      description:
        "Support on company registration and ongoing compliance when establishing or operating in the UAE.",
    },
  ],
  "uk-tax": [
    {
      title: "VAT services",
      description:
        "UK VAT registration, filing, and advisory so returns stay accurate and on time.",
    },
    {
      title: "Corporate tax services",
      description:
        "Corporation tax planning and compliance aligned to UK law and the group's position.",
    },
    {
      title: "Bookkeeping services",
      description:
        "UK bookkeeping that supports both management reporting and statutory filings.",
    },
  ],
  "usa-tax": [
    {
      title: "Individual and non-resident returns",
      description:
        "Forms 1040, 1040NR, and 1040X, with state filings where the engagement requires them.",
    },
    {
      title: "Entity filings",
      description:
        "Partnerships, C corporations, S corporations, NGOs, trusts, and estates — including 1065, 1120, 1120S, 990, and 1041.",
    },
    {
      title: "Cross-border reporting",
      description:
        "FBAR, 5471, 5472, and related international information returns where the facts require them.",
    },
  ],
  bookkeeping: [
    {
      title: "Bookkeeping and ledgers",
      description:
        "Transactions recorded and organised so the financial picture is available when it is needed.",
    },
    {
      title: "Financial statements",
      description:
        "Statements that reflect performance and position for decisions and compliance.",
    },
    {
      title: "Reconciliations, AR, AP, and payroll",
      description:
        "Bank recs, invoicing, payments, and payroll handled so cash and people stay current.",
    },
  ],
  "financial-modeling": [
    {
      title: "Financial modeling",
      description:
        "Integrated models for revenue, expenses, cash, and growth that leadership can update.",
    },
    {
      title: "Budget planning and management",
      description:
        "Budgets that allocate resources against objectives and can be reviewed as the year moves.",
    },
    {
      title: "Scenario and pricing analysis",
      description:
        "Sensitivity, breakeven, and pricing work so decisions are tested before capital is committed.",
    },
  ],
  "investor-documentation": [
    {
      title: "Executive summaries and teasers",
      description:
        "Short, accurate snapshots designed to open a conversation with the right investors.",
    },
    {
      title: "Investment memorandum and valuation",
      description:
        "The opportunity, risks, returns, and a supportable view of worth for informed decisions.",
    },
    {
      title: "Plans, decks, and diligence packs",
      description:
        "Business plans, pitch decks, models, feasibility work, and materials for due diligence.",
    },
  ],
};

export function getServiceOfferings(
  slug: string,
): readonly ServiceOffering[] | undefined {
  return serviceOfferings[slug];
}
