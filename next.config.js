/** @type {import('next').NextConfig} */

const BASE_PATH = process.env.BASE_PATH || '';

const nextConfig = {
  output: 'standalone',
  basePath: BASE_PATH,
  compress: true,
  reactStrictMode: true,
  env: {
    REPOSITORY_NAME: process.env.REPOSITORY_NAME,
  },
};

module.exports = nextConfig;
