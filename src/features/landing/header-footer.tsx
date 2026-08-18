import Image from "next/image";
import Link from "next/link";

import { servicePath, sitePaths } from "@/constants/site-paths";
import { ContactChannels } from "@/features/landing/contact-channels";
import { services } from "@/features/landing/content";
import {
  HeaderDesktopNav,
  HeaderMobileNav,
  headerAdvisorClassName,
} from "@/features/landing/header-nav";

const logoLockup = {
  width: 977,
  height: 313,
  cream: "/brand/quantara-logo-navy.png",
  dark: "/brand/quantara-logo-cream.png",
} as const;

const footerNav = [
  { href: sitePaths.home, label: "Home" },
  { href: sitePaths.services, label: "Services" },
  { href: sitePaths.about, label: "About" },
  { href: sitePaths.blogs, label: "Blogs" },
  { href: sitePaths.contact, label: "Contact" },
] as const;

const legalLinks = [
  { href: sitePaths.privacy, label: "Privacy Policy" },
  { href: sitePaths.terms, label: "Terms of Use" },
] as const;

const footerLinkClassName =
  "inline-flex min-h-12 items-center transition-colors hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-4 focus-visible:ring-offset-brand-navy focus-visible:outline-none";

function FooterLegalMenu() {
  return (
    <details className="group">
      <summary className="focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy flex min-h-12 w-fit cursor-pointer list-none items-center gap-2 text-[0.65rem] font-bold tracking-[0.22em] uppercase focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none [&::-webkit-details-marker]:hidden">
        Legal
        <svg
          viewBox="0 0 12 12"
          className="size-3 transition-transform group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path
            d="M2.5 4.5L6 8l3.5-3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <ul className="text-brand-cream/80 mt-2 space-y-1 text-sm">
        {legalLinks.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={footerLinkClassName}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}

function QuantaraMark({
  tone = "cream",
  priority = false,
}: {
  readonly tone?: "cream" | "dark";
  readonly priority?: boolean;
}) {
  const isCream = tone === "cream";

  return (
    <Link
      href={sitePaths.home}
      className={`inline-flex shrink-0 items-center outline-none ${
        isCream
          ? "focus-visible:ring-brand-navy focus-visible:ring-offset-brand-cream focus-visible:ring-2 focus-visible:ring-offset-4"
          : "focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy focus-visible:ring-2 focus-visible:ring-offset-4"
      }`}
      aria-label="Quantara Financial home"
    >
      <Image
        src={isCream ? logoLockup.cream : logoLockup.dark}
        alt=""
        width={logoLockup.width}
        height={logoLockup.height}
        className="h-8 w-auto sm:h-9 lg:h-11"
        unoptimized
        priority={priority}
      />
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-brand-cream/10 bg-brand-navy sticky top-0 z-40 border-b font-sans">
      <div className="relative mx-auto flex min-h-16 w-full max-w-[1360px] items-center justify-between px-4 md:px-8 lg:min-h-20">
        <QuantaraMark tone="dark" priority />
        <HeaderDesktopNav />
        <div className="flex items-center gap-3">
          <Link
            href={sitePaths.consultation}
            className={`${headerAdvisorClassName} hidden min-h-12 px-5 py-2.5 lg:inline-flex`}
          >
            Talk to an Advisor
          </Link>
          <HeaderMobileNav />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="stage-dark text-brand-cream relative overflow-hidden">
      <span className="stage-grain" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1360px] gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.3fr_0.8fr_1fr_0.8fr]">
        <div>
          <QuantaraMark tone="dark" />
          <p className="text-brand-cream/80 mt-6 max-w-md text-sm leading-7">
            Expert financial and accounting solutions from a specialized
            strategic practice of Shahbaz Hannan &amp; Co. Chartered Accountants
            — audit, tax, advisory, outsourcing, and ERP for lasting financial
            success.
          </p>
          <ContactChannels tone="navy" />
        </div>
        <div>
          <h2 className="text-[0.65rem] font-bold tracking-[0.22em] uppercase">
            Navigation
          </h2>
          <ul className="text-brand-cream/80 mt-5 space-y-1 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLinkClassName}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[0.65rem] font-bold tracking-[0.22em] uppercase">
            Services
          </h2>
          <ul className="text-brand-cream/80 mt-5 space-y-1 text-sm">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={servicePath(service.slug)}
                  className={footerLinkClassName}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <FooterLegalMenu />
      </div>
      <div className="border-brand-cream/10 relative border-t px-5 py-6 md:px-8">
        <p className="text-brand-cream/80 mx-auto max-w-[1360px] text-xs">
          &copy; Quantara Financial. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
