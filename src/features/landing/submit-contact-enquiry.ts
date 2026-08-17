"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";

import { isAllowedRequestOrigin } from "@/constants/allowed-origins";
import { log } from "@/lib/logger";
import { createEnquiry } from "@/server/api/enquiries/create";
import { consumeIdentityToken } from "@/server/database/rate-limit-store";
import {
  contactEnquirySchema,
  contactFieldNames,
} from "@/schemas/contact-enquiry";
import type {
  ContactActionState,
  ContactFieldErrors,
  ContactFieldName,
} from "@/types/contact-enquiry";

const fieldMessages: Record<ContactFieldName, string> = {
  firstName: "Enter your first name.",
  lastName: "Enter your last name.",
  email: "Enter a valid email address.",
  phone: "Enter a valid phone number.",
  message: "Enter a message of at least 10 characters.",
};

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function isContactFieldName(value: unknown): value is ContactFieldName {
  return (
    typeof value === "string" &&
    (contactFieldNames as readonly string[]).includes(value)
  );
}

function requestIdentity(requestHeaders: Headers): string {
  const forwarded = requestHeaders.get("x-forwarded-for");
  const forwardedClient = forwarded?.split(",")[0]?.trim();

  if (forwardedClient) {
    return forwardedClient;
  }

  const realIp = requestHeaders.get("x-real-ip")?.trim();

  if (realIp) {
    return realIp;
  }

  return "unknown";
}

export async function submitContactEnquiry(
  _previous: ContactActionState | null,
  formData: FormData,
): Promise<ContactActionState> {
  const correlationId = randomUUID();
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const referer = requestHeaders.get("referer");

  if (!isAllowedRequestOrigin(origin, referer)) {
    log("warn", "enquiry_origin_rejected", { correlationId });
    return {
      ok: false,
      error: {
        code: "FORBIDDEN",
        message: "This enquiry could not be submitted from that origin.",
      },
    };
  }

  if (readField(formData, "website").trim() !== "") {
    log("info", "enquiry_honeypot_blocked", { correlationId });
    return { ok: true };
  }

  const limit = await consumeIdentityToken(requestIdentity(requestHeaders));

  if (!limit.allowed) {
    log("warn", "enquiry_rate_limited", {
      correlationId,
      retryAfterSeconds: limit.retryAfterSeconds,
    });
    return {
      ok: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many enquiries were sent. Try again shortly.",
        retryAfterSeconds: limit.retryAfterSeconds,
      },
    };
  }

  const parsed = contactEnquirySchema.safeParse({
    firstName: readField(formData, "firstName"),
    lastName: readField(formData, "lastName"),
    email: readField(formData, "email"),
    phone: readField(formData, "phone"),
    message: readField(formData, "message"),
  });

  if (!parsed.success) {
    const fields: {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      message?: string;
    } = {};

    for (const issue of parsed.error.issues) {
      const key = issue.path[0];

      if (!isContactFieldName(key) || fields[key] !== undefined) {
        continue;
      }

      fields[key] = fieldMessages[key];
    }

    return {
      ok: false,
      error: {
        code: "INVALID_INPUT",
        message: "Check the highlighted fields and try again.",
        fields: fields as ContactFieldErrors,
      },
    };
  }

  const created = await createEnquiry(parsed.data, correlationId);

  if (!created.ok) {
    return {
      ok: false,
      error: {
        code: "UNAVAILABLE",
        message: "The enquiry could not be sent. Email the team directly.",
      },
    };
  }

  return { ok: true };
}
