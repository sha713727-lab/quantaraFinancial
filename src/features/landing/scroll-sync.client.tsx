"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

const LAYOUT_EVENT = "quantara:layout";

export function requestScrollSync(): void {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new Event(LAYOUT_EVENT));
}

/**
 * Keeps GSAP ScrollTrigger measurements aligned after fonts, images,
 * and late layout (fan measure, reveals) settle on the homepage.
 */
export function LandingScrollSync() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let frame = 0;
    let timer = 0;

    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    const refreshSoon = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(refresh, 80);
    };

    refreshSoon();
    window.addEventListener("load", refresh);
    window.addEventListener(LAYOUT_EVENT, refreshSoon);
    window.addEventListener("resize", refreshSoon, { passive: true });

    void document.fonts?.ready.then(refreshSoon);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      window.removeEventListener(LAYOUT_EVENT, refreshSoon);
      window.removeEventListener("resize", refreshSoon);
    };
  }, []);

  return null;
}
