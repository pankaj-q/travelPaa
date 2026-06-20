import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  ...(process.env.NODE_ENV === "development"
    ? { turbopack: { root: "/Users/pankaj/Frontend_Project" } }
    : {}),
};

export default nextConfig;
