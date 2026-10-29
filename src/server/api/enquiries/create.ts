import { contactEmail } from "@/constants/contact-email";
import { services } from "@/features/landing/content";
import { smtpPassword } from "@/lib/env";
import { log } from "@/lib/logger";
import { sendTitanEmail } from "@/lib/send-titan-email";
import type { ContactEnquiryInput } from "@/schemas/contact-enquiry";

export type CreateEnquiryResult =
  { readonly ok: true } | { readonly ok: false; readonly code: "UNAVAILABLE" };

function practiceAreaLabel(service: ContactEnquiryInput["service"]): string {
  if (service === "") {
    return "Not specified";
  }

  if (service === "cpa-outsourcing") {
    return "CPA Firm Outsourcing";
  }

  return services.find((item) => item.slug === service)?.title ?? service;
}

function sourceLabel(source: ContactEnquiryInput["source"]): string {
  if (source === "") {
    return "Not specified";
  }

  if (source === "cpa-outsourcing") {
    return "cpa-outsourcing";
  }

  return source;
}

export async function createEnquiry(
  input: ContactEnquiryInput,
  correlationId: string,
): Promise<CreateEnquiryResult> {
  const password = smtpPassword();

  if (password === undefined) {
    log("error", "enquiry_mail_unconfigured", { correlationId });
    return { ok: false, code: "UNAVAILABLE" };
  }

  const sent = await sendTitanEmail({
    user: contactEmail,
    pass: password,
    to: contactEmail,
    replyTo: input.email,
    subject: `Website enquiry from ${input.firstName} ${input.lastName}`,
    text: [
      `First name: ${input.firstName}`,
      `Last name: ${input.lastName}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      `Organisation: ${input.company === "" ? "Not provided" : input.company}`,
      `Practice area: ${practiceAreaLabel(input.service)}`,
      `Source: ${sourceLabel(input.source)}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });

  if (!sent) {
    log("error", "enquiry_mail_failed", { correlationId });
    return { ok: false, code: "UNAVAILABLE" };
  }

  log("info", "enquiry_mail_sent", { correlationId });
  return { ok: true };
}
