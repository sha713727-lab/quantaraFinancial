"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function scrollToTopInstant(): void {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

export function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    scrollToTopInstant();
  }, [pathname]);

  return null;
}
