import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    logger: {
      warn: function(message) {
        // Suppress specific deprecation warning
        if (message.includes('Deprecation')) return
        console.warn(message)
      }
    }
  },
  images: {
    domains: [
      'avatars.githubusercontent.com',
      // ... any other domains you need
    ],
  },
  // ... any other config options
}

export default nextConfig
