/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    SERVER_API: 'https://dev.api.gestidogs.ianlcz.io/v0',
    LOCAL_API:'http://localhost:3000',
    NEXTAUTH_SECRET:'gestidogs'
  },
}

module.exports = nextConfig
