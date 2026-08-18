"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

import { sitePaths } from "@/constants/site-paths";

const navLinks = [
  { href: sitePaths.home, label: "Home" },
  { href: sitePaths.services, label: "Services" },
  { href: sitePaths.blogs, label: "Blogs" },
  { href: sitePaths.about, label: "About" },
  { href: sitePaths.contact, label: "Contact" },
] as const;

export const headerAdvisorClassName =
  "inline-flex items-center justify-center rounded-full bg-brand-cream font-sans text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-cream-soft focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-4 focus-visible:ring-offset-brand-navy focus-visible:outline-none";

const navLinkBaseClassName =
  "font-sans text-sm font-semibold tracking-[0.04em] transition-colors focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-4 focus-visible:ring-offset-brand-navy focus-visible:outline-none";

const navLinkClassName = `${navLinkBaseClassName} text-brand-cream/90 hover:text-brand-cream`;
const navLinkActiveClassName = `${navLinkBaseClassName} text-brand-cream underline decoration-brand-cream/70 underline-offset-8`;

function isNavActive(pathname: string, href: string): boolean {
  if (href === sitePaths.home) {
    return pathname === sitePaths.home;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderDesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
      aria-label="Primary"
    >
      <ul className="flex items-center gap-7 xl:gap-9">
        {navLinks.map((link) => {
          const active = isNavActive(pathname, link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={active ? navLinkActiveClassName : navLinkClassName}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function HeaderMobileNav() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuId = useId();
  const open = menuPath === pathname;

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuPath(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="text-brand-cream hover:bg-brand-cream/10 focus-visible:ring-brand-cream focus-visible:ring-offset-brand-navy grid size-12 place-items-center rounded-full transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() =>
          setMenuPath((current) => (current === pathname ? null : pathname))
        }
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="bg-brand-navy/55 fixed top-full right-0 left-0 z-40 h-screen"
            aria-label="Close menu"
            onClick={() => setMenuPath(null)}
          />
          <nav
            id={menuId}
            aria-label="Primary"
            className="border-brand-cream/10 bg-brand-navy fixed top-full right-0 left-0 z-50 border-t px-5 py-5 shadow-[0_24px_48px_-24px_rgba(2,7,18,0.65)]"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const active = isNavActive(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${
                        active ? navLinkActiveClassName : navLinkClassName
                      } border-brand-cream/8 hover:bg-brand-cream/8 flex min-h-12 items-center border-b px-1`}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuPath(null)}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={sitePaths.consultation}
              className={`${headerAdvisorClassName} mt-5 min-h-12 w-full px-5`}
              onClick={() => setMenuPath(null)}
            >
              Talk to an Advisor
            </Link>
          </nav>
        </>
      ) : null}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
