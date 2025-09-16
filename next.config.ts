import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
},
  nodeMiddleware: true,
  output: "standalone",
};

export default nextConfig;
