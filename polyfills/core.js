'use client'

import './history';
import './performance'

if (typeof window !== 'undefined') {
  //? issue https://github.com/vercel/next.js/discussions/49771
  // globalThis polyfill
  !function(t){function e(){var e=this||self;e.globalThis=e,delete t.prototype._T_}"object"!=typeof globalThis&&(this?e():(t.defineProperty(t.prototype,"_T_",{configurable:!0,get:e}),_T_))}(Object);


  window.addEventListener('error',  function (ev) {
    console.log('error happened: ');
    console.error(ev);
    console.log('end of error');
  });
  window.onerror = function (ev) {
    console.log('error happened: ');
    console.error(ev);
    console.log('end of error');
  }
  
  console.log('核心垫片模块已加载');
}