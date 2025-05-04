import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [new URL('https://fakestoreapi.com/**')],
    formats:['image/webp'],

  }
};

export default nextConfig;
