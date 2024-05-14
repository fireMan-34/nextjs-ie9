import ErrorBoundary from 'compoents/DefaultErrorBoundary';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <ErrorBoundary>
    {/* this is page component */}
    <Component 
      {...pageProps} 
      pageTime={Date.now().toLocaleString()}
    />
  </ErrorBoundary>
}

export default MyApp
