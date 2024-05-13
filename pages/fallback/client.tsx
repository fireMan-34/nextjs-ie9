import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import useSWR from "swr";
import { baseFetch } from "utils/fetch";

const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

const Client: InferGetServerSidePropsType<typeof getServerSideProps> = ({}) => {
  const { error, data } = useSWR("https://json.schemastore.org/nodemon.json", baseFetch, {});

  return (
    <main>
      <h1>用户端数据请求</h1>
      <hr />
      <p>数据: {JSON.stringify(data)}</p>
      <hr />
      <p>错误: {JSON.stringify(error)}</p>
    </main>
  )
};

export { getServerSideProps };
export default Client;
