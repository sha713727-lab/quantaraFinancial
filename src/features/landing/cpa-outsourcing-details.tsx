"use client";

import { useEffect, useRef } from "react";

import { cpaOutsourcingPage } from "@/features/landing/cpa-outsourcing-content";

const summaryClassName =
  "text-brand-navy focus-visible:ring-brand-navy flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left text-base font-semibold tracking-[-0.02em] focus-visible:ring-2 focus-visible:outline-none [&::-webkit-details-marker]:hidden";

export function CpaOutsourcingDetails() {
  const { disclosures } = cpaOutsourcingPage;
  const scopeRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openScope = () => {
      if (window.location.hash !== `#${disclosures.scope.id}`) {
        return;
      }
      const node = scopeRef.current;
      if (!node) return;
      node.open = true;
      window.requestAnimationFrame(() => {
        node.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    };

    openScope();
    window.addEventListener("hashchange", openScope);

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest(`a[href="#${disclosures.scope.id}"]`);
      if (!anchor) return;
      window.setTimeout(openScope, 0);
    };

    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", openScope);
      document.removeEventListener("click", onClick);
    };
  }, [disclosures.scope.id]);

  return (
    <div className="mx-auto mt-12 w-full max-w-[min(100%-3rem,1320px)] px-[clamp(1.25rem,3vw,4rem)]">
      <details
        ref={scopeRef}
        id={disclosures.scope.id}
        className="border-brand-navy/15 scroll-mt-24 border-t"
      >
        <summary className={summaryClassName}>
          <span>{disclosures.scope.summary}</span>
          <span aria-hidden="true" className="text-brand-accent text-lg">
            +
          </span>
        </summary>
        <div className="pb-6">
          <p className="text-brand-muted text-sm leading-6">
            {disclosures.scope.intro}
          </p>
          <dl className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {disclosures.scope.items.map((item) => (
              <div key={item.title}>
                <dt className="text-brand-navy text-sm font-semibold">
                  {item.title}
                </dt>
                <dd className="text-brand-muted mt-2 text-sm leading-6">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </details>

      <details className="border-brand-navy/15 border-t">
        <summary className={summaryClassName}>
          <span>{disclosures.engagement.summary}</span>
          <span aria-hidden="true" className="text-brand-accent text-lg">
            +
          </span>
        </summary>
        <div className="pb-6">
          <ul className="space-y-3">
            {disclosures.engagement.options.map((option) => (
              <li key={option} className="text-brand-muted text-sm leading-6">
                {option}
              </li>
            ))}
          </ul>
          <p className="text-brand-muted mt-5 text-sm leading-6">
            {disclosures.engagement.note}
          </p>
        </div>
      </details>

      <details className="border-brand-navy/15 border-t border-b">
        <summary className={summaryClassName}>
          <span>{disclosures.faqs.summary}</span>
          <span aria-hidden="true" className="text-brand-accent text-lg">
            +
          </span>
        </summary>
        <div className="space-y-5 pb-6">
          {disclosures.faqs.items.map((item) => (
            <div key={item.question}>
              <h3 className="text-brand-navy text-sm font-semibold">
                {item.question}
              </h3>
              <p className="text-brand-muted mt-2 text-sm leading-6">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
