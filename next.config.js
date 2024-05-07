const { writeFile } = require('fs/promises');
const { join, resolve } = require('path');

/**
 * out webpack config for debuging config work
 * @param {*} config 
 * @param {import('next/dist/server/config-shared').WebpackConfigContext} options 
 */
function webpackConfigOuter(config, options) {
  const nextDirPath = join(__dirname, '.next');

  let jsonObj = {
    config,
    options,
  };

  jsonObj = JSON.stringify(jsonObj, (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    } else if (typeof value === 'function') {
      return value.toString();
    }
    return value;
  }, 2);

  writeFile(join(nextDirPath, `config.${options.isServer ? 'server' : 'client'}.json`), jsonObj, 'utf-8');
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {

    config.resolve.alias.compoents = resolve(__dirname, 'components');
    config.resolve.alias.polyfills = resolve(__dirname, 'polyfills');

    const { isServer, dev } = options;
    // framework polyfill load from node_modules\next\dist\build\webpack-config.js, but not strong for project
    // ? {https://github.com/vercel/next.js/discussions/20992} this is issule about discord, and this has copy from here, not used, and debuging now, this is a question. html will load generate from ./next/server/pages/html static assets , so I have two way to solve it.

    if (!isServer) {

      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = await originalEntry();
        // if (entries['main.js'] && !entries['main.js'].includes(polfyillPath)) {
          // entries['main.js'].unshift(polfyillPath);
        // }
        const polfyillPath = './polyfills/core.js';
        if (entries['main.js'] && !entries['main.js'].includes(polfyillPath)) {
          entries['main.js'].unshift(polfyillPath);
        }
        return entries;
      }

      // config.optimization.splitChunks.cacheGroups.projectPolyfills = {
      //   test: /[\\/]node_modules[\\/](@babel|core-js)/,
      //   name: 'project-polyfills',
      //   chunks: 'initial',
      //   enforce: true,
      // };
    }

    webpackConfigOuter(config, options);

    return config;
  },
  compiler: {

  },
  experimental: {
    // browsersListForSwc: true,
    legacyBrowsers: true,
  }
}

module.exports = nextConfig
