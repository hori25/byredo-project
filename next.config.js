/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
  },
  webpack: (config, { dev }) => {
    // Dev 환경에서 여러 next dev 실행/캐시 꼬임으로 .next 내부 chunk 누락(Cannot find module './xxx.js')이
    // 발생하는 케이스가 있어 filesystem cache를 비활성화합니다.
    if (dev) {
      config.cache = false
    }
    return config
  },
}

module.exports = nextConfig
