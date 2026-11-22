import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Same URLs as the original site (ritzautocare.ae uses trailing slashes, e.g. /service/jump-start/)
  trailingSlash: true,
  transpilePackages: ["three"],
  serverExternalPackages: ["mongodb"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      // Linked from the original footer but 404 on ritzautocare.ae — send visitors to the gallery instead.
      { source: "/our-works-portfolio/", destination: "/our-work-gallery/", permanent: true },
      // The old /ar/ pages are gone (Arabic now comes from Google Translate) — keep saved links working.
      { source: "/ar", destination: "/", permanent: true },
      { source: "/ar/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
