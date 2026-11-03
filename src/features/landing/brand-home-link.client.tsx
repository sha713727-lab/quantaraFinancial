"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { sitePaths } from "@/constants/site-paths";
import { scrollToTopInstant } from "@/features/landing/route-scroll-reset.client";

export function BrandHomeLink({
  className,
  children,
  "aria-label": ariaLabel,
}: {
  readonly className: string;
  readonly children: ReactNode;
  readonly "aria-label": string;
}) {
  const pathname = usePathname();

  return (
    <Link
      href={sitePaths.home}
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        if (pathname === sitePaths.home) {
          scrollToTopInstant();
        }
      }}
    >
      {children}
    </Link>
  );
}
