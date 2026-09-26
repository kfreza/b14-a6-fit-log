import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.magnific.com",
        pathname: "/free-photo/**",
        search: "?w=740",
      },
    ],
  },
};

export default nextConfig;
