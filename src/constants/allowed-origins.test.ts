import assert from "node:assert/strict";
import { test } from "node:test";

import { isAllowedRequestOrigin } from "./allowed-origins";

test("allows the apex and www HTTPS origins", () => {
  assert.equal(
    isAllowedRequestOrigin("https://quantarafinancial.info", null),
    true,
  );
  assert.equal(
    isAllowedRequestOrigin("https://www.quantarafinancial.info", null),
    true,
  );
});

test("allows localhost HTTP for development", () => {
  assert.equal(isAllowedRequestOrigin("http://localhost:3001", null), true);
});

test("rejects a foreign origin", () => {
  assert.equal(isAllowedRequestOrigin("https://evil.example", null), false);
  assert.equal(isAllowedRequestOrigin(null, null), false);
});
