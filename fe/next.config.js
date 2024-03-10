/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "static.parastorage.com",
      "static.wixstatic.com",
      "www.facebook.com",
    ],
  },
};

// const dotenv = require('dotenv');
// dotenv.config();

// module.exports = nextConfig;
module.exports = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  },
  nextConfig
};