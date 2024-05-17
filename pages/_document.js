import Document,{ Html, Head, Main, NextScript, } from "next/document";
import Script from "next/script";
import Jump from "layouts/Jump";

/**
 * @type {import("next/document").DocumentInitialProps}
 */
export const getInitialProps = async (ctx) => {
  const originRenderPage = ctx.renderPage;
  ctx.renderPage = () => originRenderPage({
    enhanceApp: (App) => App,
    enhanceComponent: (Component) => Component,
  });

  const initialProps = await Document.getInitialProps(ctx);
  return initialProps;
};

export default function NextDocument() {
  return <Html>
    <Head>
      {/* 降级方案 */}
      {/*         
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <script src="https://polyfill.io/v3/polyfill.min.js?    features=es6%2Cdefault%2Ces5%2Ces2015%2Cdom4%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022" />
        */}
    </Head>
    <body>
      <Jump />
      <Main />
      <NextScript />
      <Script 
        src="https://unpkg.com/jquery@3.7.1/dist/jquery.js"
        // 在交互之前触发 ,　在　polyfill.js 后插入
        // strategy="beforeInteractive"
        // 在交互式之后
        // strategy="afterInteractive"
        // 懒加载
        // strategy="lazyOnload"
        // 工作者线程
        // strategy="worker"
      />
    </body>
  </Html>
}