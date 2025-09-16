import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // The `remotePatterns` array is where you define the external domains
    // that are allowed to serve images in your application.
    // This is a security measure to prevent arbitrary image URLs from being used.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.postimg.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*",
        port: "",
        pathname: "/**",
      },
      // You can add more patterns for other image hosts here, like:
      // {
      //   protocol: "https",
      //   hostname: "cdn.example.com",
      // },
      // To allow all subdomains, use a wildcard like this:
      // {
      //   protocol: "https",
      //   hostname: "*.example.com",
      // },
    ],
  },
};

export default nextConfig;
