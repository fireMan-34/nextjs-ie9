const nextConstants = require('next/dist/shared/lib/constants');
const _webpack = require('next/dist/compiled/webpack/webpack');
const { Compilation } = _webpack.webpack;

const PROJECT_POLYFILLS_NAME = 'project-polyfills';

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

module.exports = {
  UpdatePolyfillPlugin,
  splitPolyfillChunk,
};