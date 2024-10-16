/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "@styles/Home.module.css";
import Head from "next/head";

export default function Home({  }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs With Ie9 Index Page</title>
        <meta name="description" content="NextJs With Ie9 Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
