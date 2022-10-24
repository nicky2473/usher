/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://keyescape.co.kr/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
