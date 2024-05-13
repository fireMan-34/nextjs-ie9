import { sleep } from "utils/caller";
import styles from "@styles/Doc.module.css";

/**
 * @type {import("next").GetStaticPaths}
 */
export async function getStaticPaths() {
  await sleep(300);
  const paths = [1, 2].map((id) => ({
    params: { id: `${id}` },
    // linkId: id,
  }));

  return {
    paths,
    // if fallback false,will 404 no path in paths
    // static html page will generate like hexo page creator
    fallback: false,
  };
}

/**
 * 
 * @type {import("next").GetStaticProps}
 */
export async function getStaticProps(props) {
  // get route dynamically param
  const { params } = props;
  const { id } = params;

  await sleep(300);
  return {
    props: {
      linkId: id,
      fromProps: JSON.stringify(props),
    },
  };
}
/**
 * no catch variable
 * @type {import('next').InferGetStaticPropsType<typeof getStaticPaths>}
 */
function DocId({ linkId, fromProps }) {
  return (
    <main className={styles["main-doc"]}>
      <h1 className={styles["doc-title"]}>Doc Id : {linkId ?? "none"}</h1>
      <p className={styles["doc-desc"]}>{fromProps}</p>
    </main>
  );
}

export default DocId;