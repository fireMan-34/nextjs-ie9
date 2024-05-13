import { useRouter } from "next/router";

export default function FallbackTrue({ title, desc, params }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading ...</div>;
  }

  return <main>
    <h1>{title}</h1>
    <p>{desc}</p>
    <hr />
    <p>{JSON.stringify(params)}</p>
  </main>;
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { fallback: "true" } },
      { params: { fallback: "true1" } },
      { params: { fallback: "true2" } },
      { params: { fallback: "true3" } },
      { params: { fallback: "true4" } },
    ],
    fallback: true,
  };
}
export async function getStaticProps(ctx) {
  return {
    props: {
      title: "fallback 为 true 时",
      desc: "构建时生成默认的页面，运行时第一次请求时生成请求也就是客户端渲染同时在后台展示静态页面，第二次访问则展示对应的静态页面， fallback true 并不会自动更新页面，如果需要请用 ISR 自动重渲染。https://dev.to/tomdohnal/blocking-fallback-for-getstaticpaths-new-next-js-10-feature-1727 这篇文章展示 fallback 在 社交媒体创建的预览无法使用 js 引擎导致的错误。所以如果非必要条件，用这个即可，无法转为 blocking 模式。",
      params: ctx.params,
    },
  };
}
