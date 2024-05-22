/**
 * @type {import('next-i18next').UserConfig}
 */
module.exports = {
  i18n: {
    defaultLocale: 'zh_CN',
    locales: [ 'en_US', 'zh_CN' ],
  },
  fallbackLng: {
    default: [ 'zh_CN' ],
  },
  // 用于开发环境热重载国际化 map ，对性能有一定影响
  // https://github.com/i18next/next-i18next/issues/2109
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}