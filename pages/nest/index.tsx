import Layout from "layouts/layout";

const NestedLayout = ({ children }) => {
  return (
    <>
      <header>
        <h2>
          Nest Layout use for page
        </h2>
        <h3>
          Check if Exist
        </h3>
      </header>
      {children}
    </>
  )
};

function NestPage () {
  return <>
    <h2>
      This is Nest Page. Here what
    </h2>
  </>
}

NestPage.getLayout = (page) => {
  <Layout>
    <NestedLayout>
      {page}
    </NestedLayout>
  </Layout>
}

export default NestPage;