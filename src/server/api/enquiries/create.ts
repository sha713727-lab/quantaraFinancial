import { contactEmail } from "@/constants/contact-email";
import { services } from "@/features/landing/content";
import { smtpPassword } from "@/lib/env";
import { log } from "@/lib/logger";
import { sendTitanEmail } from "@/lib/send-titan-email";
import type { ContactEnquiryInput } from "@/schemas/contact-enquiry";

export type CreateEnquiryResult =
  { readonly ok: true } | { readonly ok: false; readonly code: "UNAVAILABLE" };

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
      `Practice area: ${
        input.service === ""
          ? "Not specified"
          : (services.find((service) => service.slug === input.service)
              ?.title ?? input.service)
      }`,
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
