"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { sitePaths } from "@/constants/site-paths";

export function FloatingConsultationCta() {
  const pathname = usePathname();

  if (pathname === sitePaths.contact || pathname === sitePaths.consultation) {
    return null;
  }

  return (
    <Link
      href={sitePaths.contact}
      className="bg-brand-navy text-brand-cream hover:bg-brand-deep focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white fixed right-4 bottom-4 z-30 inline-flex min-h-12 items-center justify-center rounded-[4px] px-4 py-3 text-sm font-semibold tracking-[-0.01em] shadow-[0_12px_32px_-12px_rgba(7,20,38,0.55)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:right-6 sm:bottom-6"
    >
      Book a consultation
    </Link>
  );
}
