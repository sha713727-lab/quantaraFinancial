import assert from "node:assert/strict";
import { test } from "node:test";

import { consumeBucket, enquiryRatePolicy, refillBucket } from "./token-bucket";

test("consumeBucket allows a full bucket and decrements a token", () => {
  const now = 1_000_000;
  const result = consumeBucket(
    { tokens: 5, lastRefillMs: now },
    now,
    enquiryRatePolicy,
  );

  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.bucket.tokens, 4);
  }
});

test("consumeBucket rejects an empty bucket and returns retry-after", () => {
  const now = 2_000_000;
  const result = consumeBucket(
    { tokens: 0, lastRefillMs: now },
    now,
    enquiryRatePolicy,
  );

  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.ok(result.retryAfterSeconds >= 1);
  }
});

test("refillBucket restores tokens over elapsed time", () => {
  const start = 0;
  const fifteenMinutes = 15 * 60 * 1000;
  const refilled = refillBucket(
    { tokens: 0, lastRefillMs: start },
    start + fifteenMinutes,
    enquiryRatePolicy,
  );

  assert.equal(refilled.tokens, enquiryRatePolicy.capacity);
});
