import type { ReactNode } from "react";

import { SiteFooter, SiteHeader } from "@/features/landing/header-footer";

export function PageShell({ children }: { readonly children: ReactNode }) {
  return (
    <div className="bg-brand-cream text-brand-navy min-h-screen font-sans">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
