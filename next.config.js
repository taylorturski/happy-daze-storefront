/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ["cdn.shopify.com", "www.happydazegolf.com"],
  },
  env: {
    SHOPIFY_STORE_DOMAIN: process.env.SHOPIFY_STORE_DOMAIN,
    SHOPIFY_API_VERSION: process.env.SHOPIFY_API_VERSION,
  },
  metadataBase: new URL("https://www.happydazegolf.com"),
};

module.exports = nextConfig;
