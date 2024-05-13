import { GetStaticPaths, GetStaticProps } from "next";
import { readdir } from "fs/promises";
import { join } from "path";

const FallbackCommon = ({ title, desc, time, pages }) => {
  return (
    <main>
      <h1>{title}</h1>
      <p>{desc}</p>
      <p>time: {time}</p>
      <dd>
        <dt>文章列表</dt>
        {pages.map(({ name, path, pageName }) => <dd key={name + path} >{pageName}</dd>)}
      </dd>
    </main>
  );
};

const paths = [{ params: { common: "common" } }];

const TIME = 2;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  const dirInfos = await readdir(
    join(process.cwd(), ".next", "server", "pages", "fallback", "true"),
    { withFileTypes: true, recursive: false }
  ).catch(err => {
    return [];
  });

  const pages = dirInfos.filter(d => d.isFile() && /^[^\[].*[^\]].html$/.test(d.name)).map(({ path, name }) => ({ name, path, pageName: name.split(".").shift() }));

  return {
    props: {
      title: "补充静态渲染模式一些内容",
      time: Date.now().toLocaleString("zh-ch"),
      desc: `
      ISR 自增渲染，在请求第 ${TIME} s触发渲染，当渲染完成会替代新的页面
      支持 ts true
      nextJs 执行路径 ${process.cwd()}
      `,
      pages,
    },
    // 2s 重渲染一次
    revalidate: TIME,
  };
};

export default FallbackCommon;
