export class CookieStorage {
  constructor() {}

  cookie2Map() {
    const chunks = document.cookie.split(";");
    const map = {};

    for (let chunk of chunks) {
      const [k, v] = chunk.split("=");
      map[k] = v;
    }
    return map;
  }

  map2Cookie(map: { [k: string]: string }) {
    return Object.entries(map).reduce((res, [k, v]) => {
      return k && v ? res + `${k}=${v};` : res;
    }, `domain=${location.host};Path=/;`);
  }

  setCookie(
    name: string,
    value: string,
    options: { domain?: string; path?: string, debug?: boolean } = {}
  ) {
    const { domain, path, debug } = options;
    let cookie = `${name}=${value}`;
    if (domain) {
      cookie += `;domain=${domain}`;
    }
    if (path) {
      cookie += `;path=${path}`;
    }
    document.cookie = cookie;
    if (debug) {
      console.log('set cookie: ', { cookie, documentCookie: document.cookie });  
    }
  }

  set(key: string, value: string) {
    const map = this.cookie2Map();
    map[key] = value;
    // document.cookie = this.map2Cookie(map);
     this.setCookie(key, value, {
      // domain: location.host ?? document.domain,
      path: '/',
      debug: process.env.NODE_ENV === 'development',
     });
  }

  get(key: string) {
    const map = this.cookie2Map();
    return map[key];
  }

  remove(key: string) {
    const map = this.cookie2Map();
    delete map[key];
    document.cookie = this.map2Cookie(map);
  }

  clear() {
    for (const key in this.cookie2Map()) {
      this.remove(key);
    }
  }
}
