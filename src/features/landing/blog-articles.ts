export type BlogSection =
  | { readonly type: "paragraph"; readonly text: string }
  | { readonly type: "heading"; readonly text: string }
  | { readonly type: "list"; readonly items: readonly string[] };

export type BlogArticle = {
  readonly slug: string;
  readonly title: string;
  readonly excerpt: string;
  readonly sections: readonly BlogSection[];
};

export type BlogPost = Pick<BlogArticle, "slug" | "title" | "excerpt">;

export const blogArticles: readonly BlogArticle[] = [
  {
    slug: "international-taxation",
    title: "International Taxation: Everything Businesses Need to Know",
    excerpt:
      "As businesses expand beyond domestic borders, understanding international taxation becomes essential — whether you sell overseas, serve international clients, or open foreign operations.",
    sections: [
      {
        type: "paragraph",
        text: "As businesses expand beyond domestic borders, understanding international taxation becomes essential. Whether you are selling products overseas, providing services to international clients, opening foreign offices, or managing global investments, tax obligations become significantly more complex.",
      },
      {
        type: "paragraph",
        text: "International taxation governs how income earned across different countries is taxed and helps businesses comply with local tax laws while avoiding unnecessary tax burdens. A strong understanding of these rules can reduce financial risk, improve compliance, and support successful global expansion.",
      },
      {
        type: "heading",
        text: "What is international taxation?",
      },
      {
        type: "paragraph",
        text: "International taxation is the set of rules that determine how businesses and individuals are taxed on income earned across multiple countries. It addresses corporate income tax, withholding tax, transfer pricing, tax treaties, indirect taxes, and reporting obligations for multinational operations.",
      },
      {
        type: "paragraph",
        text: "The primary objective is to prevent double taxation while ensuring businesses pay the appropriate amount of tax in each jurisdiction where they operate.",
      },
      {
        type: "heading",
        text: "Why it matters",
      },
      {
        type: "list",
        items: [
          "Prevents double taxation",
          "Keeps the business compliant across countries",
          "Supports international expansion",
          "Reduces tax-related financial risk",
          "Improves global financial planning",
          "Strengthens investor confidence",
        ],
      },
      {
        type: "heading",
        text: "How it works",
      },
      {
        type: "paragraph",
        text: "Each country has its own tax laws for income generated within its borders. Businesses operating internationally may be required to pay tax in both the home country and the country where income is earned. Many countries sign Double Taxation Agreements so businesses can claim credits or exemptions under stated conditions.",
      },
      {
        type: "heading",
        text: "Key components",
      },
      {
        type: "paragraph",
        text: "Corporate income tax applies to profits where there are taxable operations or a permanent establishment. Transfer pricing governs transactions between related companies in different countries and must reflect fair market value. Withholding tax can apply to dividends, royalties, and interest before funds move abroad. Indirect taxes such as VAT, GST, or sales tax apply according to local rules.",
      },
      {
        type: "heading",
        text: "Common challenges",
      },
      {
        type: "list",
        items: [
          "Understanding different tax laws",
          "Managing transfer pricing documentation",
          "Meeting international reporting requirements",
          "Handling multiple tax jurisdictions",
          "Keeping up with changing regulations",
        ],
      },
      {
        type: "heading",
        text: "Practices that hold up",
      },
      {
        type: "list",
        items: [
          "Maintain accurate financial records",
          "Review applicable tax treaties before expanding",
          "Document cross-border transactions",
          "Stay current with regulation in each market you enter",
          "Take advice before entering a new jurisdiction",
        ],
      },
      {
        type: "heading",
        text: "Final thoughts",
      },
      {
        type: "paragraph",
        text: "As companies expand, understanding tax obligations, transfer pricing, withholding taxes, and treaties becomes part of running the business. Planning and compliance reduce financial risk and support long-term profitability. Quantara works with businesses on UAE, UK, and USA tax so those obligations are handled with the same practice that keeps the books.",
      },
    ],
  },
  {
    slug: "financial-model-guide",
    title: "Beginner’s Guide to Building a Financial Model",
    excerpt:
      "A financial model helps business owners, entrepreneurs, investors, and finance professionals predict performance and evaluate decisions before capital is committed.",
    sections: [
      {
        type: "paragraph",
        text: "A financial model is one of the most valuable tools for business owners, entrepreneurs, investors, and finance professionals. It helps predict future financial performance, evaluate decisions, estimate funding needs, and understand profitability before capital is committed.",
      },
      {
        type: "heading",
        text: "What is a financial model?",
      },
      {
        type: "paragraph",
        text: "A financial model is a structured framework that represents a company’s financial performance. It combines historical data with future assumptions to forecast revenue, expenses, profits, cash flow, and growth.",
      },
      {
        type: "list",
        items: [
          "Will the business remain profitable?",
          "How much funding is required?",
          "When does the company become profitable?",
          "How will changing expenses affect profits?",
          "What happens if sales increase or decrease?",
        ],
      },
      {
        type: "heading",
        text: "Why modeling matters",
      },
      {
        type: "list",
        items: [
          "Supports business planning",
          "Forecasts future revenue",
          "Improves budgeting",
          "Assists investment decisions",
          "Helps secure loans and funding",
          "Identifies financial risk early",
        ],
      },
      {
        type: "heading",
        text: "Core components",
      },
      {
        type: "paragraph",
        text: "A complete model usually includes a revenue forecast, an expense forecast covering fixed and variable costs, a cash flow projection, a profit and loss statement, and a balance sheet that tracks assets, liabilities, and equity.",
      },
      {
        type: "heading",
        text: "How to build the first model",
      },
      {
        type: "paragraph",
        text: "Start with historical income statements, balance sheets, cash flow statements, sales reports, and expense records. Define realistic assumptions for sales growth, pricing, inflation, operating expenses, hiring, and marketing. Project revenue from price, volume, and customer growth. Categorise expenses. Forecast cash so liquidity is visible. Subtract expenses from revenue to estimate profit. Then test best-case, expected, and worst-case scenarios.",
      },
      {
        type: "heading",
        text: "Mistakes to avoid",
      },
      {
        type: "list",
        items: [
          "Using unrealistic assumptions",
          "Ignoring cash flow",
          "Overestimating sales growth",
          "Underestimating expenses",
          "Leaving the model stale",
          "Using inconsistent formulas",
        ],
      },
      {
        type: "heading",
        text: "Final thoughts",
      },
      {
        type: "paragraph",
        text: "A well-designed model gives a view of revenue, expenses, profitability, and cash flow so decisions are made with the numbers in view. Quantara builds investor-ready models and budgets as part of accounting, advisory, and fundraising work — not as a spreadsheet handed over and left behind.",
      },
    ],
  },
  {
    slug: "business-financial-plan",
    title: "How to Create a Business Financial Plan",
    excerpt:
      "A business financial plan outlines objectives, current position, projected income, expenses, cash flow, and growth so leadership can plan with the numbers in view.",
    sections: [
      {
        type: "paragraph",
        text: "Every successful business starts with a clear vision, but turning that vision into reality requires a structured financial plan. Whether you are launching, expanding, or seeking investment, the plan is the map for how resources are allocated, how shocks are absorbed, and how growth is funded.",
      },
      {
        type: "heading",
        text: "What is a business financial plan?",
      },
      {
        type: "paragraph",
        text: "A business financial plan outlines financial objectives, current position, projected income, anticipated expenses, cash flow, and growth strategy. It shows owners, investors, and lenders how the company intends to generate revenue, manage costs, and reach profitability.",
      },
      {
        type: "heading",
        text: "Why planning matters",
      },
      {
        type: "list",
        items: [
          "Supports better business decisions",
          "Improves cash flow management",
          "Identifies financial risk early",
          "Helps secure funding or investment",
          "Tracks performance",
          "Encourages sustainable growth",
        ],
      },
      {
        type: "heading",
        text: "The work, in order",
      },
      {
        type: "paragraph",
        text: "Define measurable goals — revenue, markets, products, hiring, margins, and cost. Evaluate the current position from income statements, balance sheets, cash flow, assets, liabilities, and debt. Forecast revenue from history, demand, pricing, seasonality, and customer growth. Split expenses into fixed and variable. Build a cash flow forecast covering receipts, payments, tax, payroll, loans, and capital. Set departmental budgets and an emergency reserve. Prepare for downturns, cost inflation, weaker sales, supply disruption, and regulatory change. Track margins, cash, operating expense ratios, acquisition cost, return on investment, and leverage. Review the plan monthly, quarterly, and annually.",
      },
      {
        type: "heading",
        text: "Mistakes to avoid",
      },
      {
        type: "list",
        items: [
          "Overestimating future revenue",
          "Ignoring cash flow",
          "Underestimating expenses",
          "Not preparing for emergencies",
          "Failing to review performance",
          "Operating without a realistic budget",
        ],
      },
      {
        type: "heading",
        text: "Final thoughts",
      },
      {
        type: "paragraph",
        text: "A financial plan is more than a collection of numbers. It is the foundation for decisions. Quantara prepares plans, models, and investor documentation so leadership can plan with the numbers in view — and stay with the business as those numbers change.",
      },
    ],
  },
];

export const blogPosts: readonly BlogPost[] = blogArticles.map((article) => ({
  slug: article.slug,
  title: article.title,
  excerpt: article.excerpt,
}));

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((article) => article.slug === slug);
}
