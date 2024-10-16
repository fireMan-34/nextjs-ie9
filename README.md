# This is [Nextjs12] with base support ie9+ test repo.

## here is what feature

- fix framework next error
  - `node_modules\next\dist\compiled\web-vitals\web-vitals.js` T.type.replace Error in **ie10**(use patch to fix)
- add base history jump support
  - history.replaceState
  - history.pushState
- add `polyfills/core.js` load in `main.js`
  if you want to earily , there have two way to provide, one way is use `static href script` in `_document.js`(best way avoid next, because next config is hard, you may lose many greate time), , other way is use my

# Fix

## gsap react version no match

1. https://react.dev/warnings/invalid-hook-call-warning#mismatching-versions-of-react-and-react-dom
2. https://classic.yarnpkg.com/en/docs/selective-version-resolutions

# Usage

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
