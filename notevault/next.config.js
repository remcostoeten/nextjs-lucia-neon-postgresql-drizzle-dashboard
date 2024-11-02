const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... other config
  images: {
    domains: ['cdn.prod.website-files.com'],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 
