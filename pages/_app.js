import { appWithTranslation } from "next-i18next";
import ErrorBoundary from "compoents/DefaultErrorBoundary";
import Layout from "layouts/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}

export default appWithTranslation(MyApp);
