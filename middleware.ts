import { NEXT_LOCALE } from "constants/index";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.cookies.get(NEXT_LOCALE)) {
    // console.log('国际语法字符串', req.cookies.get(NEXT_LOCALE));
    // console.log('请求数据', req.nextUrl);
    // console.log('请求语法', req.nextUrl.locale);
  }
}