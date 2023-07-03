/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    SERVER_API: 'https://dev.api.gestidogs.ianlcz.io/v0',
  },
}

module.exports = nextConfig
