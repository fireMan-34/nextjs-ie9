import { appWithTranslation, } from 'next-i18next';
import ErrorBoundary from 'compoents/DefaultErrorBoundary';
import Layout from 'layouts/layout';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return <ErrorBoundary>
    {/* this is page component */}
    <Layout>
      <Component
        {...pageProps}
        pageTime={Date.now().toLocaleString()}
      />
    </Layout>
    {/* @todo faild */}
    {/* {getLayout(<Component {...pageProps} pageTime={Date.now().toLocaleString()} />)} */}
  </ErrorBoundary>
}

export default appWithTranslation(MyApp);
