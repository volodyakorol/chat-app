const { withSentryConfig } = require('@sentry/nextjs');

const moduleExports = {
  eslint: {
    dirs: ['src'],
  },

  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],

  //^ SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },

  sentry: {
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  silent: true,
};

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
