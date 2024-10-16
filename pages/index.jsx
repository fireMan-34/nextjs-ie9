/* eslint-disable @next/next/no-html-link-for-pages */
import styles from "@styles/Home.module.css";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...serverSideTranslations(locale, ["common"]),
    },
  };
}

export default function Home({}) {
  const { t, } = useTranslation("common");

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs With Ie9 Index Page</title>
        <meta name="description" content="NextJs With Ie9 Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div style={{ color: "white" }}>{t("lib")}</div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
