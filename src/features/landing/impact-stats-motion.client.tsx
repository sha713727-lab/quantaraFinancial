"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { bindImpactStatsMotion } from "@/features/landing/impact-stats-motion-controller";
import { requestScrollSync } from "@/features/landing/scroll-sync.client";

export function ImpactStatsMotion({
  children,
}: {
  readonly children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      return;
    }
    const cleanup = bindImpactStatsMotion(root);
    requestScrollSync();
    return cleanup;
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
