/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for catching potential issues in your app
  reactStrictMode: true,

  // Enable SWC for faster builds and better minification
  swcMinify: true,

  // Modify Webpack configuration
  webpack: (config, { isServer }) => {
      // Add support for .txt files
      config.module.rules.push({
          test: /\.txt$/,
          use: 'raw-loader',
      });

      // Example: Handle additional file types like .md or .csv
      config.module.rules.push({
          test: /\.(md|csv)$/,
          use: 'raw-loader',
      });

      // Example: Conditional server/client-specific configurations
      if (!isServer) {
          // Perform client-specific Webpack customizations if needed
      }

      return config;
  },
};

export default nextConfig;
