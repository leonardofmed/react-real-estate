/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bayut-production.s3.eu-central-1.amazonaws.com',
        port: ''
      }
    ]
  },
  env: {
    BAYUT_API_KEY: 'a34d19b454msha88cf41bca3a42ap1e1244jsnd1d375cc711b'
  }
}

module.exports = nextConfig
