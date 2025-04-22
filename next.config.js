/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.shopify.com", "www.happydazegolf.com"],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
  },
  metadataBase: new URL("https://www.happydazegolf.com"),
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {key: "X-Content-Type-Options", value: "nosniff"},
          {key: "X-Frame-Options", value: "DENY"},
          {key: "X-XSS-Protection", value: "1; mode=block"},
          {
            key: "Cache-Control",
            value: "public, s-maxage=600, stale-while-revalidate=30",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
