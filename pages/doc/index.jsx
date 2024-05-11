// SSR USE CASE
// USE SOME THING WITH RENDER DATA

import styles from "@styles/Doc.module.css";
import Link from "next/link";
import { sleep } from "utils/caller";

export async function getStaticProps() {
  console.log("use build In data start 构建生成静态页面 >");
  await sleep(1000);
  console.log("use build In data end 构建生成动态页面 <");
  const staticProps = {
    props: {
      doc: {
        title: "构建标题",
        titleDesc: `构建时间: ${Date.now()}`,
        author: "fireMan-34",
        desc: "Et lorem diam nisl nonummy amet tempor tempor ipsum lorem ea ullamcorper sanctus dolor sit eos clita. Vel labore nonummy ea aliquyam nonummy est amet dolor wisi sed. Ad eos dolores vero amet dolor et et tempor kasd in amet liber gubergren te dolore. Amet duis clita ut erat te eu facilisis nulla dignissim magna ut diam. Diam nulla duo erat elitr accusam diam ipsum lorem.",
      },
      reads: [
        {
          title: "推荐阅读1",
          linkId: "1",
          desc: "Sit ut consequat iriure in augue ipsum et feugait voluptua ipsum dolor facilisis amet sit rebum soluta rebum. Sed dolor consectetuer dolor takimata lorem. Dolor esse ut sed tempor nulla nostrud augue nonumy sed amet ipsum sit duo et nihil sea ut dignissim. Invidunt suscipit labore sed molestie eos illum at magna vel at diam ea et kasd ea lorem. Nonumy sed kasd magna sanctus sadipscing ipsum zzril minim sit.",
        },
        {
          title: "推荐阅读2",
          linkId: "2",
          desc: "Sit ut consequat iriure in augue ipsum et feugait voluptua ipsum dolor facilisis amet sit rebum soluta rebum. Sed dolor consectetuer dolor takimata lorem. Dolor esse ut sed tempor nulla nostrud augue nonumy sed amet ipsum sit duo et nihil sea ut dignissim. Invidunt suscipit labore sed molestie eos illum at magna vel at diam ea et kasd ea lorem. Nonumy sed kasd magna sanctus sadipscing ipsum zzril minim sit.",
        },
        {
          title: "推荐阅读(超出路径限制 404)3",
          linkId: "3",
          desc: "Sit ut consequat iriure in augue ipsum et feugait voluptua ipsum dolor facilisis amet sit rebum soluta rebum. Sed dolor consectetuer dolor takimata lorem. Dolor esse ut sed tempor nulla nostrud augue nonumy sed amet ipsum sit duo et nihil sea ut dignissim. Invidunt suscipit labore sed molestie eos illum at magna vel at diam ea et kasd ea lorem. Nonumy sed kasd magna sanctus sadipscing ipsum zzril minim sit.",
        },
      ],
    },
  };

  return staticProps;
}

// SSR

function Doc({ doc, reads }) {
  const { title, titleDesc, author, desc } = doc ?? {
    title: "Init Title",
  };
  if (!reads) {
    reads = [];
  }

  return (
    <main className={styles["main-container"]}>
      <div className={styles["main-doc"]}>
        <h2 className={styles["doc-title"]}>{title}</h2>
        <h3 className={styles["doc-title"]}>{titleDesc}</h3>
        <h4 className={styles.author}>{author}</h4>
        <h5 className={styles['doc-title']}>跳转 polyfill 禁用:{process.env.NEXT_PUBLIC_DEBUG_ROUTE}</h5>
        <p className={styles["doc-desc"]}>{desc}</p>
      </div>
      <div className={styles["main-doc"]}>
        {reads.map((read) => (
          <p
            key={"read - link" + " " + read.linkId}
            className={styles["doc-read-item-container"]}
          >
            <Link href={`/doc/${read.linkId}?desc=${read.desc}` }>{read.title}</Link>
          </p>
        ))}
        <p className={styles['doc-read-item-container']}>
          <Link href={"/doc/about"}>关于服务端渲染页面</Link>
        </p>
      </div>
    </main>
  );
}

export default Doc;
