export class CookieStorage {
  constructor(){
  }

  cookie2Map(){
    const chunks = document.cookie.split(";");
    const map = {};

    for (let chunk of chunks) {
      const [k, v] = chunk.split("=");
      map[k] = v;
    }
    return map;
  }

  map2Cookie(map: { [k:string]: string }) {
    return Object.entries(map).reduce((res, [k, v]) => {
      return(k && v)? res + `${k}=${v};`: res;
    }, `domain=${location.host};`);
  }

  set(key: string, value: string,) {
    const map = this.cookie2Map();
    map[key] = value;
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
  }
}