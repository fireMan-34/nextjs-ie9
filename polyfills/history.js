"use client";

var isWinodw = !!(typeof window !== "undefined");
var hasHistory = !!(typeof history !== "undefined");

if (isWinodw) {
  function commonPolyfillJump(url, options = { name: '' }) {
    var { name } = options;

    if (!location.href) {
      if (process.env.NEXT_PUBLIC_DEBUG_ROUTE) {
        console.log('unsupport localtion href to jump');
      }

      return;
    }

    if (/^(https?)/.test(url)) {
      location.href = url;
      return;
    }

    var href = location.href;
    var protocol = location.protocol;
    var host = location.host;
    var target = protocol + '//' + host + url;

    if (process.env.NEXT_PUBLIC_DEBUG_ROUTE) {
      console.log("will jump from this url", {
        name,
        url,
        href,
        target,
        isSame: target === href,
        env: process.env.NEXT_PUBLIC_DEBUG_ROUTE,
      });
    }

    if (target === href) {
      // if will build change true
      if (process.env.NEXT_PUBLIC_DEBUG_ROUTE === 'true') {
        // debugger;
      }
      return;
    }

    if (!process.env.NEXT_PUBLIC_DEBUG_ROUTE) {
    }
    location.href = target;
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
