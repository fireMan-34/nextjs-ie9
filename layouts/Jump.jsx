import Link from "next/link";

function Jump({  }) {

  return <>
    <nav style={{ display: 'flex', columnGap: '2em'  }}>
      <Link href={"/"} >首页</Link>
      <Link href={"/doc"} >文档首页页</Link>
      <Link href={"/doc/about"} >文档关于页</Link>
      <Link href={"/settings"} >设置页</Link>
      <Link href={"/fallback/false/false"} >fallback false 页面</Link>
      <Link href={"/fallback/true/true"} >fallback true 页面</Link>
      <Link href={"/fallback/blocking/blocking"} >fallback blocking 页面</Link>
      <Link href={"/fallback/common"} >fallback common 页面</Link>
    </nav>
  </>
}

export default Jump;