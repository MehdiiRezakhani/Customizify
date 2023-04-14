/**
 * @type {import('next').NextConfig}
 */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
 
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    unoptimized : true
  },
  output: 'export',
  distDir: 'dist',
});
 
module.exports = nextConfig;