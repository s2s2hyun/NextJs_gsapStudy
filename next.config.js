/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const webpackConfig = (config, options) => {
  if (!options.dev) {
    config.devtool = options.isServer ? false : "your-custom-devtool";
  }
  return config;
};

module.exports = {
  ...nextConfig,
  webpack: webpackConfig,
};

// 내일 webpackConfig 관해서 공부
