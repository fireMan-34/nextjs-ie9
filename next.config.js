const { resolve } = require('path');
const addPolyfillToEntry = require('./webpack/addPolyfillToEntries');
const { UpdatePolyfillPlugin, splitPolyfillChunk } = require('./webpack/UpdatePolyfillPlugin');
const webpackConfigOuter = require('./webpack/webpackConfigOuter');
const withTM = require('next-transpile-modules')([ 'react-i18next', 'i18next' ]);


/** @type {'entry'|'import'|'script'|'plugin'} */
let PLOYFILL_MODE = 'entry';



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, options) => {

    config.resolve.alias.compoents = resolve(__dirname, 'components');
    config.resolve.alias.polyfills = resolve(__dirname, 'polyfills');
    config.resolve.alias['@styles'] = resolve(__dirname, 'styles');

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
  },
  // 添加构建超时界限
  staticPageGenerationTimeout: 300,
  // 请注意，useFileSystemPublicRoutes禁用来自 SSR 的文件名路由；客户端路由仍然可以访问这些路径。使用此选项时，您应该防止以编程方式导航到您不想要的路线
  // useFileSystemPublicRoutes:false,
  i18n: require('./next-i18next.config').i18n,

  /**
   * https://www.nextjs.cn/docs/advanced-features/security-headers
   * @returns 
   */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // {
            // key: 'Content-Security-Policy',
            // value: // Your CSP Policy
          // }
          
        ]
      }
    ]
  }
}

module.exports = withTM(nextConfig);
