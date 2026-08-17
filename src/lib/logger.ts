type LogLevel = "info" | "warn" | "error";

type LogFields = Readonly<Record<string, string | number | boolean>>;

export function log(
  level: LogLevel,
  event: string,
  fields: LogFields = {},
): void {
  process.stdout.write(
    `${JSON.stringify({
      level,
      event,
      timestamp: new Date().toISOString(),
      ...fields,
    })}\n`,
  );
}
