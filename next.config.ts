import path from "node:path";

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const googleScriptSrc = [
  "https://www.googletagmanager.com",
  "https://www.googleadservices.com",
  "https://www.google.com",
  "https://www.gstatic.com",
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://partner.googleadservices.com",
  "https://www.googletagservices.com",
  "https://adservice.google.com",
  "https://fundingchoicesmessages.google.com",
  // Multi-level hosts: *.doubleclick.net does not match googleads.g.doubleclick.net
  "https://googleads.g.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
  "https://*.adtrafficquality.google",
  "https://www.clarity.ms",
  "https://scripts.clarity.ms",
].join(" ");

const scriptSrc = isDev
  ? `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${googleScriptSrc}`
  : `script-src 'self' 'unsafe-inline' ${googleScriptSrc}`;

const googleConnectSrc = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://analytics.google.com",
  "https://*.analytics.google.com",
  "https://www.googletagmanager.com",
  "https://stats.g.doubleclick.net",
  "https://ad.doubleclick.net",
  "https://*.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://googleads.g.doubleclick.net",
  "https://www.google.com",
  "https://www.googleadservices.com",
  "https://adservice.google.com",
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
  "https://*.adtrafficquality.google",
  "https://www.gstatic.com",
  "https://csi.gstatic.com",
  "https://www.clarity.ms",
  "https://*.clarity.ms",
  "https://c.bing.com",
].join(" ");

const connectSrc = isDev
  ? `connect-src 'self' ws: wss: ${googleConnectSrc}`
  : `connect-src 'self' ${googleConnectSrc}`;

// Country Google hosts (e.g. google.com.pk) are not covered by *.google.com.
const googleCountryHosts = [
  "https://www.google.com.pk",
  "https://*.google.com.pk",
  "https://www.google.ae",
  "https://www.google.co.uk",
  "https://www.google.co.in",
  "https://www.google.com.sa",
  "https://www.google.com.sg",
  "https://www.google.com.au",
  "https://www.google.ca",
].join(" ");

const googleImgSrc = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://www.google.com",
  "https://*.google.com",
  googleCountryHosts,
  "https://www.googleadservices.com",
  "https://www.gstatic.com",
  "https://*.gstatic.com",
  "https://googleads.g.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://ad.doubleclick.net",
  "https://*.doubleclick.net",
  "https://pagead2.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://www.googletagservices.com",
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
  "https://*.adtrafficquality.google",
  "https://c.clarity.ms",
  "https://c.bing.com",
].join(" ");

const googleFrameSrc = [
  "https://googleads.g.doubleclick.net",
  "https://*.g.doubleclick.net",
  "https://*.doubleclick.net",
  "https://tpc.googlesyndication.com",
  "https://*.googlesyndication.com",
  "https://www.google.com",
  "https://pagead2.googlesyndication.com",
  "https://www.googletagmanager.com",
  "https://fundingchoicesmessages.google.com",
  "https://ep1.adtrafficquality.google",
  "https://ep2.adtrafficquality.google",
  "https://*.adtrafficquality.google",
].join(" ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      scriptSrc,
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: ${googleImgSrc}`,
      "font-src 'self'",
      connectSrc,
      `frame-src ${googleFrameSrc}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/main",
        destination: "/",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.quantarafinancial.info" }],
        destination: "https://quantarafinancial.info/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
