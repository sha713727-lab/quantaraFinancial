import { z } from "zod";

export const contactFieldNames = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "company",
  "service",
  "source",
  "message",
] as const;

export const contactServiceValues = [
  "",
  "accounting-outsourcing",
  "audit-assurance",
  "taxation",
  "erp-solutions",
  "corporate-advisory",
  "risk-advisory",
  "cpa-outsourcing",
] as const;

export const contactSourceValues = ["", "cpa-outsourcing"] as const;

export type ContactServiceValue = (typeof contactServiceValues)[number];
export type ContactSourceValue = (typeof contactSourceValues)[number];

export const contactEnquirySchema = z
  .object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    email: z.email().max(254),
    phone: z
      .string()
      .trim()
      .min(8)
      .max(24)
      .regex(/^[+0-9() .\-]+$/),
    company: z.string().trim().max(120),
    service: z.enum(contactServiceValues),
    source: z.enum(contactSourceValues),
    message: z.string().trim().min(10).max(4000),
  })
  .strict();

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;

function firstParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function resolveConsultationDefaults(searchParams: {
  readonly service?: string | string[] | undefined;
  readonly source?: string | string[] | undefined;
}): {
  readonly service: ContactServiceValue;
  readonly source: ContactSourceValue;
} {
  const serviceRaw = firstParam(searchParams.service) ?? "";
  const sourceRaw = firstParam(searchParams.source) ?? "";

  const service = (contactServiceValues as readonly string[]).includes(
    serviceRaw,
  )
    ? (serviceRaw as ContactServiceValue)
    : "";
  const source = (contactSourceValues as readonly string[]).includes(sourceRaw)
    ? (sourceRaw as ContactSourceValue)
    : "";

  return { service, source };
}
