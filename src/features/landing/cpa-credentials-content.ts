export type CpaCredentialCard = {
  readonly title: string;
  readonly body: string;
};

export const cpaCredentialsSection = {
  eyebrow: "For U.S. CPA Firms",
  heading: "Why U.S. CPA Firms Should Partner With Quantara Financial",
  introduction:
    "Bring experienced accounting support into your firm's workflow. Quantara combines FCA-led management, a dedicated finance team and QuickBooks Online accounting capability to support bookkeeping, reconciliations and financial reporting.",
  cards: [
    {
      title: "20+ Years of Leadership Experience",
      body: "Our leadership brings more than two decades of accounting and taxation experience in Pakistan.",
    },
    {
      title: "FCA-Led Professional Management",
      body: "Accounting leadership from a Fellow Chartered Accountant, with a focus on clear scope and professional accountability.",
    },
    {
      title: "QuickBooks Online Certification",
      body: "Azadar Hussain holds QuickBooks Online Accountant Certification, awarded on 23 October 2026.",
    },
    {
      title: "Dedicated Accounting Support",
      body: "An established accounting and finance team supporting bookkeeping, account reconciliations and financial reporting.",
    },
  ] as const satisfies readonly CpaCredentialCard[],
  ctaLabel: "Explore CPA Outsourcing",
} as const;
