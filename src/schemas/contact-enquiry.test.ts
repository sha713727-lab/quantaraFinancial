import assert from "node:assert/strict";
import { test } from "node:test";

import {
  contactEnquirySchema,
  resolveConsultationDefaults,
} from "./contact-enquiry";

test("contactEnquirySchema accepts a complete enquiry", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina@example.com",
    phone: "+971 50 123 4567",
    company: "Example Trading LLC",
    service: "taxation",
    source: "",
    message: "Please review our UAE VAT position for the next filing.",
  });

  assert.equal(parsed.success, true);
});

test("contactEnquirySchema accepts empty organisation and practice area", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina@example.com",
    phone: "+971501234567",
    company: "",
    service: "",
    source: "",
    message: "Please review our UAE VAT position for the next filing.",
  });

  assert.equal(parsed.success, true);
});

test("contactEnquirySchema accepts CPA outsourcing service and source", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Jordan",
    lastName: "Lee",
    email: "jordan@example.com",
    phone: "+1 555 010 2000",
    company: "Lee CPA LLC",
    service: "cpa-outsourcing",
    source: "cpa-outsourcing",
    message:
      "We need month-end bookkeeping support in QuickBooks for about 12 entities.",
  });

  assert.equal(parsed.success, true);
});

test("contactEnquirySchema rejects unknown keys and a short message", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina@example.com",
    phone: "+971501234567",
    company: "",
    service: "",
    source: "",
    message: "Hello",
    extra: true,
  });

  assert.equal(parsed.success, false);
});

test("contactEnquirySchema rejects unknown source values", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina@example.com",
    phone: "+971501234567",
    company: "",
    service: "cpa-outsourcing",
    source: "newsletter",
    message: "Please review our UAE VAT position for the next filing.",
  });

  assert.equal(parsed.success, false);
});

test("resolveConsultationDefaults allowlists service and source", () => {
  assert.deepEqual(
    resolveConsultationDefaults({
      service: "cpa-outsourcing",
      source: "cpa-outsourcing",
    }),
    { service: "cpa-outsourcing", source: "cpa-outsourcing" },
  );

  assert.deepEqual(
    resolveConsultationDefaults({
      service: "unknown",
      source: ["cpa-outsourcing", "other"],
    }),
    { service: "", source: "cpa-outsourcing" },
  );
});
