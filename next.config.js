/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    return config;
  },
  compiler: {
    
  },
  experimental: {
    // browsersListForSwc: true,
    // legacyBrowsers: true,
  }
}

module.exports = nextConfig
