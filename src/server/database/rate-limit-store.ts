import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  consumeBucket,
  enquiryRatePolicy,
  type TokenBucket,
} from "@/server/database/token-bucket";

type StoreShape = {
  readonly buckets: Record<string, TokenBucket>;
};

const storeDirectory = path.join(process.cwd(), "data");
const storePath = path.join(storeDirectory, "rate-limit.json");
const tempPath = `${storePath}.tmp`;

let writeChain: Promise<void> = Promise.resolve();

function emptyStore(): StoreShape {
  return { buckets: {} };
}

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await readFile(storePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("buckets" in parsed)
    ) {
      return emptyStore();
    }

    const buckets = parsed.buckets;

    if (typeof buckets !== "object" || buckets === null) {
      return emptyStore();
    }

    return { buckets: buckets as Record<string, TokenBucket> };
  } catch {
    return emptyStore();
  }
}

async function writeStore(store: StoreShape): Promise<void> {
  await mkdir(storeDirectory, { recursive: true });
  await writeFile(tempPath, JSON.stringify(store), "utf8");
  await rename(tempPath, storePath);
}

export type RateLimitDecision =
  | { readonly allowed: true }
  | { readonly allowed: false; readonly retryAfterSeconds: number };

export function consumeIdentityToken(
  identity: string,
  nowMs: number = Date.now(),
): Promise<RateLimitDecision> {
  const run = writeChain.then(async () => {
    const store = await readStore();
    const existing = store.buckets[identity] ?? {
      tokens: enquiryRatePolicy.capacity,
      lastRefillMs: nowMs,
    };
    const result = consumeBucket(existing, nowMs, enquiryRatePolicy);
    const next: StoreShape = {
      buckets: {
        ...store.buckets,
        [identity]: result.bucket,
      },
    };

    await writeStore(next);

    if (!result.ok) {
      return {
        allowed: false as const,
        retryAfterSeconds: result.retryAfterSeconds,
      };
    }

    return { allowed: true as const };
  });

  writeChain = run.then(
    () => undefined,
    () => undefined,
  );

  return run;
}
