function addPolyfillToEntry(config, options, entry = 'main.js', polyfillPath = './polyfills/core.js') {
  const { isServer, } = options;
  const originalEntry = config.entry;
  config.entry = async () => {
    const entries = await originalEntry();
    if (isServer) {
      return entries;
    }
    const polfyillPath = polyfillPath ?? './polyfills/core.js';
    // 会加入到 main-js 包内
    if (entry === 'main.js' && entries['main.js'] && !entries['main.js'].includes(polfyillPath)) {
      entries['main.js'].unshift(polfyillPath);
    } else {
      entries[entry] = polfyillPath;
    }
    return entries;
  }
};

module.exports = addPolyfillToEntry;