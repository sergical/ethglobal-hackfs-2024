// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.snapshot = {
      ...(config.snapshot ?? {}),
      // Add all node_modules to managedPaths, EXCEPT wagmi-connector, next/swc (which show
      // warnings if added). Allows for hot refresh of changes
      managedPaths: [/^(.+?[\\/]node_modules[\\/](?!(@privy-io[\\/]wagmi-connector|@next|@swc))(@.+?[\\/])?.+?)[\\/]/],
    };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
