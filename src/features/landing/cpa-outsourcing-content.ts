import { servicePath } from "@/constants/site-paths";

export const cpaConsultationQuery = {
  service: "cpa-outsourcing",
  source: "cpa-outsourcing",
} as const;

export type CpaPortraitFigure = {
  readonly title: string;
  readonly caption: string;
  readonly meaning: string;
  readonly imageSrc: string;
  readonly glowX: number;
  readonly glowY: number;
};

export type CpaRailCard =
  | {
      readonly kind: "visual";
      readonly height: "tall";
      readonly title: string;
      readonly caption: string;
      readonly imageSrc: string;
      readonly glowX: number;
      readonly glowY: number;
    }
  | {
      readonly kind: "dark";
      readonly height: "compact";
      readonly title: string;
      readonly body: string;
    }
  | {
      readonly kind: "light";
      readonly height: "medium";
      readonly title: string;
      readonly body: string;
      readonly actionLabel?: string;
      readonly actionHref?: string;
    };

export const cpaOutsourcingPage = {
  metaTitle: "Outsourced Bookkeeping for US CPA Firms",
  metaDescription:
    "FCA-led bookkeeping support from Pakistan for US CPA firms. Discuss reconciliations, month-end reporting, cleanup and year-end preparation with Quantara.",
  hero: {
    title: "Offshore bookkeeping support for US CPA firms",
    body: "Add bookkeeping capacity with an FCA-led accounting team in Pakistan. Agree the scope, required outputs and review responsibilities before work begins.",
  },
  heroArt: {
    imageSrc: "/services/cards/accounting-outsourcing.jpg",
    panelTitle: "CPA Outsourcing",
    panelLabel: "QUANTARA FINANCIAL",
    captionTitle: "Accounting support",
    captionLabel: "FOR US CPA FIRMS",
  },
  story: {
    heading: "About CPA outsourcing",
    paragraphs: [
      "Quantara helps US CPA firms add bookkeeping capacity through a Pakistan-based accounting team. Support can cover transaction work, reconciliations, reporting and year-end schedules, with your firm's review responsibilities agreed before work begins.",
      "Our leadership brings more than 20 years of accounting and taxation experience in Pakistan. FCA-led management provides a clear point of professional accountability for the engagement.",
      "Azadar Hussain holds QuickBooks Online Accountant Certification, dated 23 October 2026. This is an individual software credential; the service on this page covers accounting support for your firm's review.",
    ],
    linkLabel: "Explore support services",
    linkHref: "#cpa-service-scope",
  },
  portraitPairA: {
    left: {
      title: "Bookkeeping",
      caption: "TRANSACTIONS & RECORDS",
      meaning: "Support aligned with the firm's instructions",
      imageSrc: "/services/cards/accounting-outsourcing.jpg",
      glowX: 68,
      glowY: 38,
    },
    right: {
      title: "Reconciliation",
      caption: "BANK & CARD ACCOUNTS",
      meaning: "Account matching and documented open items",
      imageSrc: "/services/cards/audit-assurance.jpg",
      glowX: 74,
      glowY: 42,
    },
  } satisfies {
    readonly left: CpaPortraitFigure;
    readonly right: CpaPortraitFigure;
  },
  process: {
    heading: "How we work",
    steps: [
      {
        number: "01",
        title: "Define the scope",
        body: "Agree the client entities, tasks, software, deadlines and outputs your firm needs.",
      },
      {
        number: "02",
        title: "Set responsibilities",
        body: "Define preparation, review, confidentiality and any client-contact arrangements.",
      },
      {
        number: "03",
        title: "Arrange access",
        body: "Agree authorised software access, permissions and document-sharing arrangements before work starts.",
      },
      {
        number: "04",
        title: "Start with an assignment",
        body: "Scope an initial piece of work to align instructions, output and review expectations.",
      },
      {
        number: "05",
        title: "Prepare and review",
        body: "Complete the agreed work, record open questions and route the output for the agreed review.",
      },
      {
        number: "06",
        title: "Handover and refine",
        body: "Deliver the agreed schedules and discuss changes needed for the next cycle.",
      },
    ],
  },
  portraitPairB: {
    left: {
      title: "Reporting",
      caption: "MONTH-END SUPPORT",
      meaning: "Agreed reports and schedules for review",
      imageSrc: "/services/cards/taxation.jpg",
      glowX: 62,
      glowY: 44,
    },
    right: {
      title: "Year-end preparation",
      caption: "ORGANISED RECORDS",
      meaning: "Reconciled schedules and supporting information",
      imageSrc: "/services/cards/corporate-advisory.jpg",
      glowX: 78,
      glowY: 34,
    },
  } satisfies {
    readonly left: CpaPortraitFigure;
    readonly right: CpaPortraitFigure;
  },
  related: {
    heading: "Support across your accounting workflow.",
    body: "Explore related services, or discuss a scoped bookkeeping engagement for your CPA firm.",
    links: [
      { label: "Bookkeeping", href: servicePath("bookkeeping") },
      {
        label: "Accounting outsourcing",
        href: servicePath("accounting-outsourcing"),
      },
      {
        label: "Financial modeling",
        href: servicePath("financial-modeling"),
      },
    ],
  },
  creamBand: {
    eyebrow: "Experience & Engagement",
    heading: "Clear scope. Reviewable work.",
    body: "Bring experienced accounting support into your firm's workflow. Start with the work you need, the records available and the review process your team expects.",
  },
  railCards: [
    {
      kind: "visual",
      height: "tall",
      title: "Accounting support",
      caption: "QUANTARA FINANCIAL",
      imageSrc: "/services/cards/erp-solutions.jpg",
      glowX: 70,
      glowY: 36,
    },
    {
      kind: "dark",
      height: "compact",
      title: "20+ years of leadership experience",
      body: "Accounting and taxation experience in Pakistan.",
    },
    {
      kind: "light",
      height: "medium",
      title: "Start with a defined assignment.",
      body: "Discuss the workload, records and review requirements before agreeing an engagement.",
      actionLabel: "Request a consultation",
      actionHref: "consultation",
    },
    {
      kind: "visual",
      height: "tall",
      title: "Reviewable output",
      caption: "SCOPE AGREED WITH YOUR FIRM",
      imageSrc: "/services/cards/risk-advisory.jpg",
      glowX: 76,
      glowY: 40,
    },
    {
      kind: "dark",
      height: "compact",
      title: "QuickBooks Online Accountant Certification",
      body: "Azadar Hussain · 23 October 2026 · Individual credential",
    },
    {
      kind: "light",
      height: "medium",
      title: "Support matched to your workload.",
      body: "Ongoing bookkeeping, month-end support, or a defined cleanup and year-end project. Request a tailored proposal.",
    },
  ] as const satisfies readonly CpaRailCard[],
  disclosures: {
    scope: {
      id: "cpa-service-scope",
      summary: "What work can your firm delegate?",
      intro:
        "These support activities do not include independent US tax return signing, filing, or audit opinions.",
      items: [
        {
          title: "Ongoing bookkeeping",
          body: "Transaction recording and categorisation against your firm's agreed chart of accounts and instructions.",
        },
        {
          title: "Bank and card reconciliations",
          body: "Account reconciliations with unresolved items documented for your team's review.",
        },
        {
          title: "Receivables and payables support",
          body: "Invoice and bill recording, ageing schedules and tracking of outstanding items. Payment approval remains with authorised personnel.",
        },
        {
          title: "Month-end reporting support",
          body: "Preparation of agreed reporting schedules and financial reports for review by your firm.",
        },
        {
          title: "Catch-up and cleanup",
          body: "Review of historical bookkeeping, identification of discrepancies and agreed corrections with an issue log.",
        },
        {
          title: "Year-end preparation support",
          body: "Account schedules, reconciliations and organised supporting records for your firm's year-end work.",
        },
      ],
    },
    engagement: {
      summary: "Engagement options and responsibilities",
      options: [
        "Ongoing bookkeeping support: recurring bookkeeping and reconciliations with an agreed review schedule. Request a tailored proposal.",
        "Month-end support: reconciliations, agreed close tasks and reporting schedules, scoped to entity count, complexity and deadlines.",
        "Catch-up or year-end project: a defined period of cleanup or preparation with specific deliverables, quoted after an initial review.",
      ],
      note: "Agree the task list, preparation and review responsibilities, open-item handling, authorised access, confidentiality, document sharing and engagement-end access removal before work begins. Define white-label delivery and client-contact restrictions in the engagement where applicable. Present this as the scope to agree; do not claim unverified security certifications, operating controls or guarantees.",
    },
    faqs: {
      summary: "Questions CPA firms ask",
      items: [
        {
          question: "Where is your delivery team based?",
          answer:
            "Our accounting support team is based in Pakistan. We agree communication arrangements and delivery schedules with each firm.",
        },
        {
          question: "What does your QuickBooks certification cover?",
          answer:
            "Azadar Hussain holds QuickBooks Online Accountant Certification, dated 23 October 2026. This is an individual software credential.",
        },
        {
          question: "Can you work within our firm's processes?",
          answer:
            "We agree the chart of accounts, task instructions, required outputs and review process at the start of the engagement.",
        },
        {
          question: "Can the engagement be white-label?",
          answer:
            "White-label delivery, branding and any contact with your clients can be defined in the engagement scope.",
        },
        {
          question: "Can we start with a smaller assignment?",
          answer:
            "An initial assignment can be scoped around agreed bookkeeping or reconciliation tasks before considering ongoing work.",
        },
        {
          question: "Does this service include filing US tax returns?",
          answer:
            "The offer on this page covers bookkeeping, reconciliations, reporting and year-end preparation support. US tax return filing is outside this stated scope.",
        },
        {
          question: "How is pricing agreed?",
          answer:
            "Pricing is proposed after reviewing the workload, account structure, complexity, records available and delivery requirements.",
        },
      ],
    },
  },
  closingCta: {
    eyebrow: "Let's Discuss Your Workload",
    heading: "Accounting support for your firm's next step.",
    body: "Tell us what support you need, which software you use and when you need the work delivered. We will review the scope and discuss a suitable engagement.",
    buttonLabel: "Request a CPA Partnership Consultation",
  },
} as const;
