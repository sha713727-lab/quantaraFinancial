import assert from "node:assert/strict";
import { test } from "node:test";

import { contactEnquirySchema } from "./contact-enquiry";

test("contactEnquirySchema accepts a complete enquiry", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina@example.com",
    phone: "+971 50 123 4567",
    message: "Please review our UAE VAT position for the next filing.",
  });

  assert.equal(parsed.success, true);
});

test("contactEnquirySchema rejects unknown keys and a short message", () => {
  const parsed = contactEnquirySchema.safeParse({
    firstName: "Amina",
    lastName: "Hassan",
    email: "amina@example.com",
    phone: "+971501234567",
    message: "Hello",
    extra: true,
  });

  assert.equal(parsed.success, false);
});
