# 這是 [Nextjs12] 版本的項目，最低支持至 IE9.

## 補丁改動

1. 修復 `web-vitals` 含有框架某個對象在`IE10` 下空異常導致編譯失敗問題

- fix framework next error
  - `node_modules\next\dist\compiled\web-vitals\web-vitals.js` T.type.replace Error in **ie10**(use patch to fix)

2. 添加簡易功能墊片

- add base history jump support
  - history.replaceState
  - history.pushState
- add `polyfills/core.js` load in `main.js`
  if you want to earily , there have two way to provide, one way is use `static href script` in `_document.js`(best way avoid next, because next config is hard, you may lose many greate time), , other way is use my

## 修復

### 修復 GSAP 動畫問題

1. https://react.dev/warnings/invalid-hook-call-warning#mismatching-versions-of-react-and-react-dom
2. https://classic.yarnpkg.com/en/docs/selective-version-resolutions

## 用例

1. animation

```tsx
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export function () {
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to([
      box1.current,
    ], { x: 500, duration: 3 });
    gsap.to([
      box2.current,
    ], { x: -500, duration: 3 });
  }, {});

  return (
    <div className="container">
      <div ref={box1} />
      <div ref={box2} />
    </div>
  )
}
```

## 庫類型

### 兼容性
- next-transpile-modules 重新編譯 module 代碼
- postcss-flexbugs-fixes CSS 代碼嘗試兼容
- eslint-plugin-compat JS 代碼兼容性校驗
- stylelint-no-unsupported-browser-features CSS 代碼兼容性校驗
- core-js 語法墊片
- patch-package 源碼改動


## 文档

### Next.js
1. [Next.js 中文网](https://www.nextjs.cn/)
2. [Next.js](https://nextjs.org/)

### Auth
1. [Auth](https://authjs.dev/) (待定)

### GSAP
1. [动画框架](https://gsap.com/)