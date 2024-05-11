// SSR USE CASE
// USE SOME THING WITH RENDER DATA

import styles from "@styles/Doc.module.css";


async function sleep(seconds = 1000) {
  return new Promise(function(resolve, reject) {
      setTimeout(function (){
        resolve(null);
      }, seconds)
  });
}

export async function getStaticProps() {
  console.log('use build In data start >')
  await sleep(1000);
  console.log('use build In data end <')
  const staticProps = {
    props: {
      doc: {
        title: "构建标题",
        titleDesc: `构建时间: ${Date.now()}`,
        author: "fireMan-34",
        desc: "Et lorem diam nisl nonummy amet tempor tempor ipsum lorem ea ullamcorper sanctus dolor sit eos clita. Vel labore nonummy ea aliquyam nonummy est amet dolor wisi sed. Ad eos dolores vero amet dolor et et tempor kasd in amet liber gubergren te dolore. Amet duis clita ut erat te eu facilisis nulla dignissim magna ut diam. Diam nulla duo erat elitr accusam diam ipsum lorem.",
      }
    },
  };

  return staticProps;
}

// SSR

function Doc({ doc }) {
  const { title, titleDesc, author, desc } = doc ?? {
    title: "Init Title",
  };

  return (
    <main className={styles['main-container']}>
      <h2 className={styles["doc-title"]}>{title}</h2>
      <h3 className={styles["doc-title"]}>{titleDesc}</h3>
      <h4 className={styles.author}>{author}</h4>
      <p className={styles['doc-desc']} >{desc}</p>
    </main>
  );
}

export default Doc;
