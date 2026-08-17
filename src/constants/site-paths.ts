export const sitePaths = {
  home: "/",
  services: "/services",
  blogs: "/blogs",
  about: "/about",
  contact: "/contact",
  consultation: "/consultation",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export function servicePath(slug: string): string {
  return `/services/${slug}`;
}

export function blogPath(slug: string): string {
  return `/blogs/${slug}`;
}
