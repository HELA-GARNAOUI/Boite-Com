/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  i18n: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr'
  }
};

module.exports = nextConfig;
