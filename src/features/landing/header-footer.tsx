import Image from "next/image";
import Link from "next/link";

import { parentFirmName } from "@/constants/parent-firm";
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
  { href: sitePaths.cpaOutsourcing, label: "For CPA Firms" },
  { href: sitePaths.about, label: "About" },
  { href: sitePaths.blogs, label: "Blogs" },
  { href: sitePaths.contact, label: "Contact" },
] as const;

const legalLinks = [
  { href: sitePaths.privacy, label: "Privacy Policy" },
  { href: sitePaths.terms, label: "Terms of Use" },
] as const;

const footerLinkClassName =
  "inline-flex min-h-11 items-center text-brand-cream/80 transition-colors hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-4 focus-visible:ring-offset-brand-navy focus-visible:outline-none";

const footerHeadingClassName =
  "text-[0.65rem] font-bold tracking-[0.22em] uppercase text-brand-cream";

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
          ? "focus-visible:ring-brand-navy focus-visible:ring-offset-brand-white focus-visible:ring-2 focus-visible:ring-offset-4"
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
      <div className="relative mx-auto grid w-full max-w-[1360px] gap-10 px-5 py-16 sm:gap-12 md:grid-cols-2 md:px-8 lg:grid-cols-[1.35fr_0.75fr_1fr_0.75fr]">
        <div className="md:col-span-2 lg:col-span-1">
          <QuantaraMark tone="dark" />
          <p className="text-brand-cream/80 mt-6 max-w-md text-sm leading-7">
            Expert financial and accounting solutions from a specialized
            strategic partner of {parentFirmName} — audit, tax, advisory,
            bookkeeping, outsourcing, and ERP for lasting financial success.
          </p>
          <div className="mt-6">
            <ContactChannels tone="navy" />
          </div>
        </div>

        <div>
          <h2 className={footerHeadingClassName}>Navigation</h2>
          <ul className="mt-5 space-y-1 text-sm">
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
          <h2 className={footerHeadingClassName}>Services</h2>
          <ul className="mt-5 space-y-1 text-sm">
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

        <div>
          <h2 className={footerHeadingClassName}>Legal</h2>
          <ul className="mt-5 space-y-1 text-sm">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLinkClassName}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={sitePaths.consultation}
                className={footerLinkClassName}
              >
                Talk to an Advisor
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-brand-cream/10 relative border-t px-5 py-6 md:px-8">
        <div className="text-brand-cream/70 mx-auto flex max-w-[1360px] flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Quantara Financial. All rights
            reserved.
          </p>
          <p className="sm:text-right">
            Specialized strategic partner of {parentFirmName}
          </p>
        </div>
      </div>
    </footer>
  );
}
