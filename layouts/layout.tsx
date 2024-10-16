import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Layout</title>
      </Head>
      {children}
    </>
  )
}