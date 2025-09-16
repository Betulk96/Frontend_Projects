/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "icons.iconarchive.com",
        pathname: "/**", // tüm yolları kapsa
      },
    ],
  },
};

export default nextConfig;
