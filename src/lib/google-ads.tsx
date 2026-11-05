import Script from "next/script";

import { googleAdsId } from "@/constants/google-ads-id";
import { googleAnalyticsId } from "@/constants/google-analytics-id";

export function GoogleAds() {
  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-gtag" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAdsId}');gtag('config','${googleAnalyticsId}');`}
      </Script>
    </>
  );
}
