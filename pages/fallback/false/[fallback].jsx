

/**
 * @type {import("next").GetStaticPaths}
 */
export async function getStaticPaths() {
  return {
    paths: [
      { params: { fallback: 'false' } },
    ],
    fallback: false,
  }
}

export async function getStaticProps({
  params,
  preview,
  previewData,
  locale,
  locales,
  defaultLocale,
}) {
  return {
    props: {
      title: 'fallback false 时',
      desc: '只渲染 `getStaticPaths` 相关的页面，适用于少量的页面数据,仅在构建时构建',
      params,
    }
  }
}

function FallbackFalse({
  title,
  desc,
  params,
}) {
  return <main>
    <h1>{title}</h1>
    <p>{desc}</p>
    <hr />
    <p>{JSON.stringify(params)}</p>
  </main>
}

export default FallbackFalse;