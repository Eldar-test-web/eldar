import type { NextConfig } from "next";

const isPages = process.env.PAGES === "true";

const nextConfig: NextConfig = {
  output: isPages ? "export" : undefined,
  basePath: isPages ? "/eldar" : undefined,
  assetPrefix: isPages ? "/eldar/" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
