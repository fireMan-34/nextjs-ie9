'use client';


if (typeof history !== 'undefined' && typeof history.replaceState !== 'function') {
  history.replaceState = function (state, unused, url) {

    if (process.env.NODE_ENV !== 'production') {
      console.log('history.replaceState state: ', state);   
    }
    var link = url;
    var pathname = location.pathname;
    var formatGo = [ pathname.replace('index.html', ''), link.replace('index.html', '') ]
    if (formatGo[0] === formatGo[1]) {
      // skip same go
      return;
    }
    if (link) {
      // wait to add temp state
      globalThis.location.href = link;
    }
  }
}

if (typeof history !== 'undefined' && typeof history.pushState !== 'function') {
  // wait to add temp state
  history.pushState = function (state, unused, url) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('history.push state: ', state);   
    }
    var link = url;
    var pathname = location.pathname;
    var formatGo = [ pathname.replace('index.html', ''), link.replace('index.html', '') ]
    if (formatGo[0] === formatGo[1]) {
      // skip same go
      return;
    }
    if (link) {
      // wait to add temp state
      globalThis.location.href = link;
    }
  }
}