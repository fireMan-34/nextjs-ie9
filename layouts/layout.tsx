import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />  
      </Head>
      {children}
      <footer style={{ textAlign: 'center' }} >
        <h5>Next Ie9+</h5>
        <h6>FireMan 34</h6>
      </footer>
    </>
  )
}