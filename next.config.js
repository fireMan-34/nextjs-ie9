const { writeFile } = require('fs/promises');
const { join, resolve } = require('path');
const _webpack = require('next/dist/compiled/webpack/webpack');
const nextConstants = require('next/dist/shared/lib/constants');
const { Compilation } = _webpack.webpack;

const PROJECT_POLYFILLS_NAME = 'project-polyfills';

const noop = (props) => props;

/**
 * 根据 polyfill 的构建逻辑尝试伪装进行 hack，遗憾的是暂时无法解决 2次引用的问题
 */
const UpdatePolyfillPlugin = {
  /**
   * 
   * @param {import('next/dist/compiled/webpack/webpack').webpack.Compiler} compiler 
   */
  apply(compiler) {
    compiler.hooks.make.tap('UpdatePolyfillPlugin', (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: 'UpdatePolyfillPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        async (assets) => {
          const keysFromAssets = Object.keys(assets);
          const keyAboutUpdatePolyfillAssets = keysFromAssets.find(key => key.includes(PROJECT_POLYFILLS_NAME));
          if (keyAboutUpdatePolyfillAssets) {
            compilation.updateAsset(keyAboutUpdatePolyfillAssets, noop, (assetInfo) => {
              return Object.assign({
                [nextConstants.CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL]: true
              }, assetInfo);
            })
          }
        }
      )
    })
  }
}

/** @type {'entry'|'import'|'script'|'plugin'} */
let PLOYFILL_MODE = 'entry';

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

function addPolyfillToEntry(config, options, entry = 'main.js') {
  const { isServer, } = options;
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry();
    if (isServer) {
      return entries;
    }
    const polfyillPath = './polyfills/core.js';
    // 会加入到 main-js 包内
    if (entry === 'main.js' && entries['main.js'] && !entries['main.js'].includes(polfyillPath)) {
      entries['main.js'].unshift(polfyillPath);
    } else {
      entries[entry] = polfyillPath;
    }
    return entries;
  }
}



function splitPolyfillChunk(config) {
  config.optimization.splitChunks.cacheGroups.projectPolyfills = {
    test: (filename) => {
      return [/[\\/]polyfills[\\/](core.js)/, /[\\/]node_modules[\\/](@babel|core-js)/].some(reg => reg.test(filename));
    },
    name: PROJECT_POLYFILLS_NAME,
    chunks: 'initial',
    enforce: true,
  };
}


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {

    config.resolve.alias.compoents = resolve(__dirname, 'components');
    config.resolve.alias.polyfills = resolve(__dirname, 'polyfills');

    const { isServer, } = options;
    // framework polyfill load from node_modules\next\dist\build\webpack-config.js, but not strong for project
    // ? {https://github.com/vercel/next.js/discussions/20992} this is issule about discord, and this has copy from here, not used, and debuging now, this is a question. html will load generate from ./next/server/pages/html static assets , so I have two way to solve it.
    if (!isServer) {

      switch (PLOYFILL_MODE) {
        case 'entry':
          // 会在 main.js 中生成，对于 frame.js 或者 polyfill 无法干涉
          addPolyfillToEntry(config, options);
          break;
        case 'import':
          // 在 app 导入无法对 main.js 以及之前的相关代码进行 polyfill
          break;
        case 'script':
          // 通过 document Head 进行添加，因无法生成对应的位置，所以只能用 polyfill.js 或者其它静态资源链接的方式
          break;
        case 'plugin':
          // 会在 polyfill.js 之前被引用，可以修复很多场景，但是会引用2次
          // 需要手动添加引用，且会生成 2次下载脚本
          splitPolyfillChunk(config);
          config.plugins.unshift(UpdatePolyfillPlugin);
          break;
      }
    }

    config.optimization.minimize = false;

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
