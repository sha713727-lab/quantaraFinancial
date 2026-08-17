export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME !== "nodejs") {
    return;
  }

  const { loadEnv } = await import("@/lib/env");
  const { log } = await import("@/lib/logger");
  const env = loadEnv();
  log("info", "process_start", { nodeEnv: env.NODE_ENV });

  if (env.SMTP_PASS.trim() === "") {
    log("warn", "smtp_password_unset", { nodeEnv: env.NODE_ENV });
  }
}
