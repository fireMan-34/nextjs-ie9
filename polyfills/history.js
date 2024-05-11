"use client";

var isWinodw = !!(typeof window !== "undefined");
var hasHistory = !!(typeof history !== "undefined");

if (isWinodw) {
  function commonPolyfillJump(url, options = { name: '' }) {
    var { name } = options;
    if (!location.href || !location.pathname) {
      if (process.env.NEXT_PUBLIC_DEBUG_ROUTE) {
        console.log('unsupport localtion href to jump');
      }

      return;
    }

    var pathname = location.pathname;
    var pathnameReplace = pathname.replace("index.html", "");
    var urlReplace = url.replace("index.html", "");

    if (process.env.NEXT_PUBLIC_DEBUG_ROUTE) {
      console.log("will jump from this url", {
        name,
        url,
        pathname,
        urlReplace,
        pathnameReplace,
        isSame: urlReplace === pathnameReplace,
      });
    }

    if (urlReplace === pathnameReplace) {
      return;
    }

    if (!process.env.NEXT_PUBLIC_DEBUG_ROUTE) {
    }
    location.href = urlReplace;
  }
  if (hasHistory) {
    if (typeof history.replaceState !== "function") {
      history.replaceState = function (state, unused, url) {
        commonPolyfillJump(url, { name: 'history.replaceState' });
      }
    }
    if (typeof history.pushState !== "function") {
      history.pushState = function (state, unused, url) {
        commonPolyfillJump(url, { name: 'history.pushState' });
      };
    }
  }
}
