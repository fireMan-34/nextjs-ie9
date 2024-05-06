'use client';


if (typeof history !== 'undefined' && typeof history.replaceState !== 'function') {
  history.replaceState = function (state, unused, url) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('history.replaceState state: ', state);   
    }
    var link = url;
    
    if (link) {
      globalThis.location.href = link;
    }
  }
}