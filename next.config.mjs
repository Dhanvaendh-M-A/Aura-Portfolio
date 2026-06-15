/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.dribbble.com' },
      { protocol: 'https', hostname: 'assets.codepen.io' },
    ],
    unoptimized: true,
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
}

export default nextConfig