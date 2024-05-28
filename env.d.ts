declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        /** 跳转 polyfill */
        NEXT_PUBLIC_DEBUG_ROUTE: string;
        
        AUTH_SECRET: string;
        AUTH_GITHUB_ID: string;
        AUTH_GITHUB_SECRET: string;
      }
    }
  }
}