export const sitePaths = {
  home: "/",
  services: "/services",
  blogs: "/blogs",
  about: "/about",
  contact: "/contact",
  consultation: "/consultation",
  cpaOutsourcing: "/cpa-outsourcing",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}

export function blogPath(slug: string): string {
  return `/blogs/${slug}`;
}

export function consultationHref(options?: {
  readonly service?: string;
  readonly source?: string;
}): string {
  if (options === undefined) {
    return sitePaths.consultation;
  }

  const params = new URLSearchParams();

  if (options.service !== undefined && options.service !== "") {
    params.set("service", options.service);
  }

  if (options.source !== undefined && options.source !== "") {
    params.set("source", options.source);
  }

  const query = params.toString();
  return query === ""
    ? sitePaths.consultation
    : `${sitePaths.consultation}?${query}`;
}
