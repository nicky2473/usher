/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://keyescape.co.kr/:path*', // Proxy to Backend
      },
      {
        source: '/secretgarden/:path*',
        destination: 'http://www.secretgardenescape.com/:path*', // Proxy to Backend
      },
      {
        source: '/goldenkey/:path*',
        destination: 'http://xn--jj0b998aq3cptw.com/:path*', // Proxy to Backend
      },
      {
        source: '/point-nine/:path*',
        destination: 'http://point-nine.com/:path*', // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;
