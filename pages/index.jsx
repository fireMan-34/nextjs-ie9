/* eslint-disable @next/next/no-html-link-for-pages */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "@styles/Home.module.css";
import useForceUpdate from "hooks/useForceUpdate";

export default function Home({ pageTime }) {
  const [animationUpdate, updateAnimation] = useForceUpdate();
  /**
   * @type {import("react").MutableRefObject<HTMLDivElement>}
   */
  const container = useRef(null);
  /**
   * @type {import("react").MutableRefObject<HTMLDivElement>}
   */
  const box = useRef(null);

  useGSAP(
    () => {
      gsap.to([container.current], { x: () => 500, duration: 3 });
      gsap.to([box.current], { x: -500, rotate: "+=360", duration: 3 });
    },
    { 
      dependencies: [animationUpdate], 
      // 恢复初始动画
      revertOnUpdate: true,
      // 查询后代类名，如果不是生成类名可以使用减少 DOM 的使用
      // scope: container,
     }
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJs With Ie9 Index Page</title>
        <meta name="description" content="NextJs With Ie9 Index Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span>Fixable IE9+</span>{" "}
          <a href="https://nextjs.org">Next.js!</a>
          <span>Run time: {pageTime}</span>
        </h1>
        <button
          onClick={function () {
            console.log("ok");
          }}
        >
          Check Button If Ok
        </button>
        <div className={styles.routeNav}>
          <Link href={"/settings"}>Use NextLink to Settings </Link>
          <a href="/settings">Use Browser A To Jump Link</a>
          <Link href={"/doc"}>Use NextLink to Doc </Link>
        </div>
        <button onClick={updateAnimation}>触发动画{animationUpdate}</button>
        <div className={styles["ani-container"]}>
          <div ref={container} className={`${styles["ani-box"]} ani-box`}></div>
          <div ref={box} className={`${styles.box} box`}></div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
