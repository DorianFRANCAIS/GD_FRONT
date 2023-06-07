/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    SERVER_API: 'https://dev.api.gestidogs.ianlcz.io',
  },
}

module.exports = nextConfig
