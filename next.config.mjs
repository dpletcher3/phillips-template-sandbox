/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [{
      source: '/studio/:path*',
      headers: [{ key: 'Cache-Control', value: 'no-store' }],
    }]
  },
}
export default nextConfig
