require("next-env")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  publicRuntimeConfig: {
    BACKEND_API: "http://localhost:3333",
  },
};

module.exports = nextConfig;
