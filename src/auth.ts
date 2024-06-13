import NextAuth, { type DefaultSession } from "next-auth"

import authConfig from "@/auth.config"; 

export type ExtendedUser = DefaultSession["user"] & {
  access_token: any
}
declare module "next-auth" {
  interface Session{
    user: ExtendedUser
  }
}

export const { 
    handlers: { GET, POST }, 
    auth, 
    signIn,
    signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, user }){
      if (user) {
        token.accessToken = (user as any).token;
        token.token_type = (user as any).token_type
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.token_type = token.token_type as string
      return session
    },
  },
  ...authConfig,
  session: {strategy: "jwt"},
});