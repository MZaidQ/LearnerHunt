/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   webVitalsAttribution: ["CLS", "LCP", "FCP", "FID", "TTFB", "INP"],
  // },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "/",
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: '/sepratecollege/NA',
        destination: '/',
        permanent: true,
      },
      {
        source: '/sepratecollege/[college]',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact@learnerhunt.com',
        destination: '/',
        permanent: true,
      }
    ]
  },
};

module.exports = nextConfig;
