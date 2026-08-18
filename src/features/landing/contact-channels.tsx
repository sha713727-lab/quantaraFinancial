import { Mail, Phone } from "lucide-react";

import {
  contactEmail,
  contactPhone,
  phoneHref,
} from "@/constants/contact-email";

const creamLinkClassName =
  "inline-flex min-h-12 items-center justify-center gap-2 font-semibold text-brand-navy underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-4 focus-visible:ring-offset-brand-cream focus-visible:outline-none";

const navyLinkClassName =
  "inline-flex min-h-12 items-center gap-2 transition-colors hover:text-brand-cream focus-visible:ring-2 focus-visible:ring-brand-cream focus-visible:ring-offset-4 focus-visible:ring-offset-brand-navy focus-visible:outline-none";

export function ContactChannels({ tone }: { readonly tone: "cream" | "navy" }) {
  const linkClassName =
    tone === "cream" ? creamLinkClassName : navyLinkClassName;

  return (
    <ul
      className={
        tone === "cream"
          ? "text-brand-muted mt-8 space-y-4 text-center text-sm leading-7 sm:text-base"
          : "text-brand-cream/80 mt-4 space-y-1 text-sm leading-7"
      }
    >
      <li>
        <a href={`mailto:${contactEmail}`} className={linkClassName}>
          <Mail className="size-4 shrink-0" aria-hidden="true" />
          {contactEmail}
        </a>
      </li>
      <li>
        <a href={phoneHref(contactPhone)} className={linkClassName}>
          <Phone className="size-4 shrink-0" aria-hidden="true" />
          {contactPhone}
        </a>
      </li>
    </ul>
  );
}
