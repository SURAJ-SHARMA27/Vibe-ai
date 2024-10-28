/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy for API requests
        source: '/api/:path*',
        destination: 'https://www.jiosaavn.com/:path*', // Proxy to the API
      },
      {
        // Proxy for media files from ac.cf.saavncdn.com
        source: '/media/ac/:path*',
        destination: 'https://ac.cf.saavncdn.com/:path*',
      },
      {
        // Proxy for media files from aac.saavncdn.com
        source: '/media/aac/:path*',
        destination: 'https://aac.saavncdn.com/:path*',
      },
      {
        // Proxy for media files from aac.saavncdn.com
        source: '/backend-api/:path*',
        destination: 'https://pulse-backend-production.up.railway.app/:path*',
      },
    ];
  },
};

export default nextConfig;
