import { Html, Head, Main, NextScript } from "next/document";

export default function NextDocument () {
  return <Html>
    <Head>
      {/* 降级方案 */}
      {/*         
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <script src="https://polyfill.io/v3/polyfill.min.js?    features=es6%2Cdefault%2Ces5%2Ces2015%2Cdom4%2Ces2016%2Ces2017%2Ces2018%2Ces2019%2Ces2020%2Ces2021%2Ces2022" />
        */}
    </Head>
    <Main />
    <NextScript />
  </Html>
}