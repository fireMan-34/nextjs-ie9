import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs With Ie9 Index Page</title>
        <meta name="description" content="NextJs With Ie9 Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={function () { console.log('ok') }} >Check Button If Ok</button>
        <Link href={'/settings'}> Settings </Link>
        <h1 className={styles.title}>
          Welcome to <span>Fixable IE9+</span> <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
