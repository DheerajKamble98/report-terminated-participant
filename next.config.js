const NextFederationPlugin = require('@module-federation/nextjs-mf');

module.exports = {
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'reportTerminatedParticipant',
          filename: 'static/chunks/remoteEntry.js',
          remotes: {
            home: `home@http://localhost:3000/_next/static/chunks/remoteEntry.js`,
            reportTerminatedParticipant: 'reportTerminatedParticipant@http://localhost:3001/_next/static/chunks/remoteEntry.js',
            reportLoginActivity: 'reportLoginActivity@http://localhost:3002/_next/static/chunks/remoteEntry.js',
          },
          exposes: {
            './reportTerminatedParticipant': './pages/index.tsx',
            './pages-map': './pages-map.tsx',
          },
          shared: {},
        }),
      );
    }

    return config;
  },
};
