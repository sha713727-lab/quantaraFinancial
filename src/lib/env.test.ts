import assert from "node:assert/strict";
import { test } from "node:test";

import { parseEnv } from "./env";

test("parseEnv accepts a valid mailbox and empty SMTP password", () => {
  const env = parseEnv({
    NEXT_PUBLIC_CONTACT_EMAIL: "team@quantarafinancial.info",
    SMTP_PASS: "",
    NODE_ENV: "development",
  });

  assert.equal(env.NEXT_PUBLIC_CONTACT_EMAIL, "team@quantarafinancial.info");
  assert.equal(env.SMTP_PASS, "");
});

test("parseEnv rejects a missing contact mailbox", () => {
  assert.throws(() =>
    parseEnv({
      SMTP_PASS: "secret",
      NODE_ENV: "development",
    }),
  );
});
