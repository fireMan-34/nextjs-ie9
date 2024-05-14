/* eslint-disable @next/next/no-html-link-for-pages */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@styles/Home.module.css'

export default function Home({ pageTime }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs With Ie9 Index Page</title>
        <meta name="description" content="NextJs With Ie9 Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Fixable IE9+</span> <a href="https://nextjs.org">Next.js!</a>
          <span>Run time: {pageTime}</span>
        </h1>
        <button onClick={function () { console.log('ok') }} >Check Button If Ok</button>
        <div className={styles.routeNav}>
          <Link href={'/settings'}>Use NextLink to Settings </Link>
          <a href='/settings' >Use Browser A To Jump Link</a>
          <Link href={'/doc'}>Use NextLink to Doc </Link>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
