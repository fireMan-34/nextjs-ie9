import { appWithTranslation, } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import ErrorBoundary from 'compoents/DefaultErrorBoundary';
import Layout from 'layouts/layout';
import '../styles/globals.css'
  
function MyApp({ Component, pageProps: { session, ...pageProps } }) {

  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return <ErrorBoundary>
    <SessionProvider session={session} >
      <Layout>
        <Component
          {...pageProps}
          pageTime={Date.now().toLocaleString()}
        />
      </Layout>
    </SessionProvider>
  </ErrorBoundary>
}

export default appWithTranslation(MyApp);
