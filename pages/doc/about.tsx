import styles from '@styles/Doc.module.css';

// cannot with get ServerSideProps
// export async function getStaticProps() {
//   return {
//     props: {
//       buildTimeStamp: Date.now(),
//     }
//   }
// }

export async function getServerSideProps() {
  return {
    props: {
      title: 'About Page',
      serverTimeStamp: Date.now(),
    }
  }
}

function About({
  title,
  serverTimeStamp,
}) {
  return <main
    className={styles['main-container']}
  >
    <h1 className={styles['doc-title']} >{title}</h1>
    <h2>服务处理时间 {serverTimeStamp}</h2>
  </main>
}

export default About;