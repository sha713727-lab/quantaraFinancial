import Script from "next/script";

import { googleAdsenseClient } from "@/constants/google-adsense-client";

export function GoogleAdsense() {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${googleAdsenseClient}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
