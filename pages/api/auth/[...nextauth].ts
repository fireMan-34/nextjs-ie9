import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: '',
      clientSecret: '',
    })
  ],
};

export default NextAuth(authOptions);