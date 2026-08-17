const trustedHosts = new Set([
  "quantarafinancial.info",
  "www.quantarafinancial.info",
  "localhost",
  "127.0.0.1",
]);

export function isAllowedRequestOrigin(
  origin: string | null,
  referer: string | null,
): boolean {
  return isTrustedUrl(origin) || isTrustedUrl(referer);
}

export function isTrustedUrl(value: string | null): boolean {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);

    if (!trustedHosts.has(url.hostname)) {
      return false;
    }

    if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
      return url.protocol === "http:" || url.protocol === "https:";
    }

    return url.protocol === "https:";
  } catch {
    return false;
  }
}
