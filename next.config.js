const { writeFile } = require('fs/promises');
const path = require('path');

/**
 * out webpack config for debuging config work
 * @param {*} config 
 * @param {import('next/dist/server/config-shared').WebpackConfigContext} options 
 */
function webpackConfigOuter(config, options) {
  const nextDirPath = path.join(__dirname, '.next');

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

  writeFile(path.join(nextDirPath, `config.${options.isServer ? 'server' : 'client'}.json`), jsonObj, 'utf-8');
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {

    config.resolve.alias.compoents = path.resolve(__dirname, 'components');
    config.resolve.alias.polyfills = path.resolve(__dirname, 'polyfills');

    webpackConfigOuter(config,options);

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
