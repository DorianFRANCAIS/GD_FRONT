/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_API: process.env.SERVER_API,
    FRONT_SERVER: process.env.LOCAL_FRONT_SERVER
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/client/registration',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
