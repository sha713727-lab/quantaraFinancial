import Link from "next/link";
import type { ReactNode } from "react";

import { brandColors } from "@/constants/brand-colors";
import { servicePath } from "@/constants/site-paths";
import { services, type Service } from "@/features/landing/content";

function primaryService(slug: string): Service {
  const service = services.find((item) => item.slug === slug);
  if (service === undefined) {
    throw new Error("A primary service is missing from content.");
  }
  return service;
}

const audit = primaryService("audit-assurance");
const tax = primaryService("taxation");
const advisory = primaryService("corporate-advisory");
const outsourcing = primaryService("accounting-outsourcing");
const risk = primaryService("risk-advisory");
const erp = primaryService("erp-solutions");

const floatCardClassName =
  "hero-navy-panel outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-4 focus-visible:ring-offset-brand-white";

function ServiceFloatCard({
  service,
  label,
  heading,
  className,
  detail,
  graphic,
}: {
  readonly service: Service;
  readonly label: string;
  readonly heading: string;
  readonly className: string;
  readonly detail?: string;
  readonly graphic?: ReactNode;
}) {
  const Icon = service.icon;

  return (
    <Link
      href={servicePath(service.slug)}
      className={`${floatCardClassName} ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-brand-cream/85 text-[0.65rem] font-medium tracking-[0.12em] uppercase">
          {label}
        </p>
        <span className="bg-brand-cream/10 grid size-7 place-items-center rounded-full">
          <Icon className="text-brand-cream size-3.5" aria-hidden="true" />
        </span>
      </div>
      <p className="text-brand-cream mt-4 text-xl font-semibold tracking-tight">
        {heading}
      </p>
      {detail !== undefined ? (
        <p className="text-brand-cream/85 mt-2 line-clamp-2 text-xs leading-5">
          {detail}
        </p>
      ) : null}
      {graphic}
    </Link>
  );
}

export function FinancialVisual() {
  const AdvisoryIcon = advisory.icon;
  const ErpIcon = erp.icon;

  return (
    <div
      className="relative mx-auto h-[27rem] w-full max-w-4xl sm:h-[26rem]"
      aria-label="Quantara Financial practice areas"
    >
      <Link
        href={servicePath(advisory.slug)}
        className={`${floatCardClassName} absolute inset-x-6 top-10 bottom-16 z-10 rounded-[1.5rem] p-5 sm:inset-x-16 sm:top-12 sm:bottom-16 sm:rounded-[1.75rem] sm:p-7`}
      >
        <div className="flex items-center justify-between">
          <p className="text-brand-cream/85 text-[0.65rem] font-medium tracking-[0.16em] uppercase">
            {advisory.category}
          </p>
          <AdvisoryIcon
            className="text-brand-cream size-4"
            aria-hidden="true"
          />
        </div>

        <div className="mt-4 flex justify-center">
          <span className="bg-brand-cream text-brand-navy rounded-full px-4 py-1 text-[0.65rem] font-semibold">
            Corporate
          </span>
        </div>

        <p className="text-brand-cream mt-5 text-center text-3xl font-semibold tracking-tight sm:mt-6 sm:text-4xl">
          Advisory
        </p>
        <p className="text-brand-cream/85 mx-auto mt-2 max-w-[16rem] text-center text-xs leading-5">
          {advisory.description}
        </p>

        <svg
          viewBox="0 0 280 72"
          className="mx-auto mt-5 h-12 w-full max-w-md sm:mt-6 sm:h-14"
          aria-hidden="true"
        >
          <path
            d="M8 52 C 48 52, 56 18, 98 24 C 140 30, 148 56, 188 40 C 228 24, 236 12, 272 16"
            fill="none"
            stroke={brandColors.cream}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M8 58 C 52 58, 64 34, 104 38 C 144 42, 156 60, 196 48 C 236 36, 244 28, 272 30"
            fill="none"
            stroke={brandColors.cream}
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="188" cy="40" r="3.5" fill={brandColors.cream} />
        </svg>
      </Link>

      <ServiceFloatCard
        service={audit}
        label="Audit"
        heading="Assurance"
        className="absolute top-2 left-1 z-30 w-[10rem] rounded-2xl p-4 sm:top-4 sm:left-4 sm:w-[12rem] sm:p-5"
        graphic={
          <div className="mt-4 flex h-9 items-end gap-1.5">
            <span className="bg-brand-cream/30 h-3 w-2 rounded-sm" />
            <span className="bg-brand-cream/45 h-5 w-2 rounded-sm" />
            <span className="bg-brand-cream/65 h-6 w-2 rounded-sm" />
            <span className="bg-brand-cream h-9 w-2 rounded-sm" />
            <span className="bg-brand-cream/55 h-5 w-2 rounded-sm" />
            <span className="bg-brand-cream/80 h-7 w-2 rounded-sm" />
          </div>
        }
      />

      <ServiceFloatCard
        service={tax}
        label="Tax"
        heading="Taxation"
        detail={tax.description}
        className="absolute top-2 right-1 z-30 w-[9.5rem] rounded-2xl p-4 sm:top-4 sm:right-4 sm:w-[11.5rem] sm:p-5"
      />

      <ServiceFloatCard
        service={outsourcing}
        label="Outsourcing"
        heading="Accounting & Bookkeeping"
        detail={outsourcing.description}
        className="absolute top-[14.5rem] left-2 z-30 w-[10rem] rounded-2xl p-4 sm:top-[13.5rem] sm:left-8 sm:w-[12rem] sm:p-5"
      />

      <ServiceFloatCard
        service={risk}
        label="Risk"
        heading="Risk Advisory"
        detail={risk.highlights[0]}
        className="absolute top-[14.5rem] right-2 z-30 w-[10.5rem] rounded-2xl p-4 sm:top-[13.5rem] sm:right-8 sm:w-[12rem] sm:p-5"
        graphic={
          <svg
            viewBox="0 0 140 28"
            className="mt-3 h-6 w-full"
            aria-hidden="true"
          >
            <path
              d="M2 22 L 24 16 L 46 18 L 68 10 L 90 12 L 112 6 L 138 4"
              fill="none"
              stroke={brandColors.cream}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
      />

      <Link
        href={servicePath(erp.slug)}
        className={`${floatCardClassName} absolute bottom-0 left-1/2 z-40 w-[min(18rem,86%)] -translate-x-1/2 translate-y-[28%] rounded-2xl p-5 text-left sm:w-[min(19rem,70%)]`}
      >
        <div className="flex items-start gap-3">
          <span className="bg-brand-cream/10 grid size-9 shrink-0 place-items-center rounded-full">
            <ErpIcon className="text-brand-cream size-4" aria-hidden="true" />
          </span>
          <div>
            <p className="text-brand-cream text-sm font-semibold">
              {erp.title}
            </p>
            <p className="text-brand-cream/85 mt-1.5 text-xs leading-5">
              {erp.description}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
