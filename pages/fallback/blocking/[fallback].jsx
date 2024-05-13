export default function FallbackBlocking({ title, params, desc }) {
  return (
    <main>
      <h1>{title}</h1>
      <p>{desc}</p>
      <hr />
      <p>{params}</p>
    </main>
  );
}

export async function getStaticPaths() {


  return {
    paths:[
      { params: { fallback: 'blocking' } },
      { params: { fallback: 'blocking1' } },
      { params: { fallback: 'blocking2' } },
      { params: { fallback: 'blocking3' } },
    ],
    fallback: 'blocking',
  }
}
export async function getStaticProps(ctx){


  return {
    props:{
      title: 'fallback 为 blocking 模式',
      desc: '第一次访问为服务端阻塞渲染模式',
      params: JSON.stringify(ctx.params),
    }
  }
}
