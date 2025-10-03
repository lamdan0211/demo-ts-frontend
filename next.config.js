/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/themes/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
