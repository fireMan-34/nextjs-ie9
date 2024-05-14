import { GetServerSideProps } from "next";
import Error from 'next/error';

const server = ({ title, query, params, resolvedUrl, errorCode }) => {

  if (errorCode) {
    return (
      <main>
        <Error statusCode={errorCode} />
        <h1>Has a server error with Code: {errorCode}</h1>
      </main>
    )
  }

  return (
    <main>
      <h1>{title}</h1>
      <p>query: {JSON.stringify(query)}</p>
      <p>params: {JSON.stringify(params)}</p>
      <p>resolvedUrl: {resolvedUrl}</p>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    params = null,
    query,
    req,
    res,
    resolvedUrl,
    preview,
    previewData,
  } = ctx;

  if (query.notFound === 'true') {
    return {
      notFound: true,
    }
  }
  if (query.redirect) {
    if (query.redirect === '/') {
      return {
        redirect: {
          destination: '/',
          permanent: true,
        }
      }
    } else if (typeof query.redirect === 'string') {
      return {
        redirect: {
          destination: query.redirect,
          // unstandering
          // 注意：您不应该使用fetch()来调用 API 路由getServerSideProps。相反，直接导入 API 路由中使用的逻辑。您可能需要针对此方法稍微重构代码。
          permanent: false,
        }
      }
    }
  }

  return {
    props: {
      title: "服务端渲染",
      query,
      params,
      resolvedUrl,
    },
  };
};

export default server;
