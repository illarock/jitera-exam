/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
      },
    ],
  },
};

module.exports = nextConfig;
