import type { ReactNode } from "react";

import { FloatingConsultationCta } from "@/features/landing/floating-consultation-cta.client";
import { SiteFooter, SiteHeader } from "@/features/landing/header-footer";
import { RouteScrollReset } from "@/features/landing/route-scroll-reset.client";

export function PageShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className="bg-brand-white text-brand-navy min-h-screen font-sans">
      <RouteScrollReset />
      <a
        href="#main-content"
        className="bg-brand-navy text-brand-cream focus-visible:ring-brand-cream sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-3 focus-visible:left-3 focus-visible:z-50 focus-visible:rounded-sm focus-visible:px-4 focus-visible:py-3 focus-visible:text-sm focus-visible:font-semibold focus-visible:ring-2 focus-visible:outline-none"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
      <FloatingConsultationCta />
    </div>
  );
}
