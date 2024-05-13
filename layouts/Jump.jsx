import Link from "next/link";

function Jump({  }) {

  return <>
    <nav style={{ display: 'flex', columnGap: '2em'  }}>
      <div role="button"  onClick={Back} >返回div按钮</div>
      <button onClick={Back}>返回button</button>
      <Link href={"/"} >首页</Link>
      <Link href={"/doc"} >文档首页页</Link>
      <Link href={"/doc/about"} >文档关于页</Link>
      <Link href={"/settings"} >设置页</Link>
    </nav>
  </>
}

export default Jump;