import { z } from "zod";

export const contactFieldNames = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "message",
] as const;

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
    message: z.string().trim().min(10).max(4000),
  })
  .strict();

export type ContactEnquiryInput = z.infer<typeof contactEnquirySchema>;
