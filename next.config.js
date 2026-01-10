/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      // {
      //   source: '/api/analytics/:path*',
      //   destination: `${process.env.UMAMI_HOST_URL || 'https://mtgibbs-tracking.herokuapp.com'}/:path*`,
      // },
    ]
  },
}

module.exports = nextConfig
