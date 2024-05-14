import Link from "next/link";

/**
 * maybe no match some routes
 */
export default function Custom404(props) {
  return (
    <main
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        rowGap: "2em",
      }}
    >
      <p>Props: Json {JSON.stringify(props, null, 2)}</p>
      <p>This Page is 404 Not Found.</p>
      <Link href={"/"}>Index Page</Link>
    </main>
  );
}

export async function getStaticProps(ctx) {
  return {
    props: {
      data: null,
      current: 404,
    },
  };
}
