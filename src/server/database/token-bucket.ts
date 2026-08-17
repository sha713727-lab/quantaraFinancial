export type TokenBucket = {
  readonly tokens: number;
  readonly lastRefillMs: number;
};

export type TokenBucketPolicy = {
  readonly capacity: number;
  readonly refillPerMs: number;
};

export type ConsumeResult =
  | { readonly ok: true; readonly bucket: TokenBucket }
  | {
      readonly ok: false;
      readonly bucket: TokenBucket;
      readonly retryAfterSeconds: number;
    };

export function refillBucket(
  bucket: TokenBucket,
  nowMs: number,
  policy: TokenBucketPolicy,
): TokenBucket {
  const elapsed = Math.max(0, nowMs - bucket.lastRefillMs);
  const tokens = Math.min(
    policy.capacity,
    bucket.tokens + elapsed * policy.refillPerMs,
  );

  return { tokens, lastRefillMs: nowMs };
}

export function consumeBucket(
  bucket: TokenBucket,
  nowMs: number,
  policy: TokenBucketPolicy,
): ConsumeResult {
  const refilled = refillBucket(bucket, nowMs, policy);

  if (refilled.tokens < 1) {
    const deficit = 1 - refilled.tokens;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil(deficit / policy.refillPerMs / 1000),
    );

    return { ok: false, bucket: refilled, retryAfterSeconds };
  }

  return {
    ok: true,
    bucket: {
      tokens: refilled.tokens - 1,
      lastRefillMs: nowMs,
    },
  };
}

export const enquiryRatePolicy: TokenBucketPolicy = {
  capacity: 5,
  refillPerMs: 5 / (15 * 60 * 1000),
};
