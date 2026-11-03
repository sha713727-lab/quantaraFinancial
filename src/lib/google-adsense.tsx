"use client";

import { useEffect } from "react";

import { googleAdsenseClient } from "@/constants/google-adsense-client";

export function GoogleAdsense() {
  useEffect(() => {
    const selector = `script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]`;
    if (document.querySelector(selector)) {
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseClient}`;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }, []);

  return null;
}
