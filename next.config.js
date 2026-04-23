/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security: no admin routes exposed here
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  async redirects() {
    // Block any attempt to access admin-like paths on public site
    return [
      { source: '/admin', destination: '/', permanent: false },
      { source: '/admin/:path*', destination: '/', permanent: false },
      { source: '/dashboard', destination: '/', permanent: false },
    ];
  },
  images: {
    domains: ['cdn.velawear.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
