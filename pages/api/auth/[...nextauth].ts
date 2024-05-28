import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      async authorize(credentials, req) {
        return {
          id: Date.now().toString(),
          email: 'test@gmail.com',
        }
      },
    }),
  ],
  debug: true,
  pages: {
    // 自定義登錄頁
    // signIn: '/Login',
  }
};

export default NextAuth(authOptions);