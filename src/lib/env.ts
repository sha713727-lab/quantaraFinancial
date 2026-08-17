import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_CONTACT_EMAIL: z.email(),
  SMTP_PASS: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
});

export type AppEnv = z.infer<typeof envSchema>;

let cached: AppEnv | undefined;

export function parseEnv(source: {
  readonly NEXT_PUBLIC_CONTACT_EMAIL?: string | undefined;
  readonly SMTP_PASS?: string | undefined;
  readonly NODE_ENV?: string | undefined;
}): AppEnv {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_CONTACT_EMAIL: source.NEXT_PUBLIC_CONTACT_EMAIL,
    SMTP_PASS: source.SMTP_PASS ?? "",
    NODE_ENV: source.NODE_ENV ?? "development",
  });

  if (!parsed.success) {
    throw new Error("Environment configuration is invalid.");
  }

  return parsed.data;
}

export function loadEnv(): AppEnv {
  if (cached !== undefined) {
    return cached;
  }

  cached = parseEnv(process.env);
  return cached;
}

export function smtpPassword(): string | undefined {
  const value = loadEnv().SMTP_PASS.trim();
  return value === "" ? undefined : value;
}
