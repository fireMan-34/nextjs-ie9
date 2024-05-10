import 'polyfills/history';
import ErrorBoundary from 'compoents/DefaultErrorBoundary';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ErrorBoundary>
    <Component {...pageProps} />
  </ErrorBoundary>
}

export default MyApp
