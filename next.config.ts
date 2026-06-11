import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
