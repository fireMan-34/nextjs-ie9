declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        /** 跳转 polyfill */
        NEXT_PUBLIC_DEBUG_ROUTE: boolean;
      }
    }
  }
}