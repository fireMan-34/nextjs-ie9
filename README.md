# This is [Nextjs12] with base support ie9+ test repo.

## here is what feature

- fix framework next error
  - `node_modules\next\dist\compiled\web-vitals\web-vitals.js` T.type.replace Error in **ie10**(use patch to fix)
- add base history jump support
  - history.replaceState
  - history.pushState
- add `polyfills/core.js` load in `main.js`
  if you want to earily , there have two way to provide, one way is use `static href script` in `_document.js`(best way avoid next, because next config is hard, you may lose many greate time), , other way is use my 