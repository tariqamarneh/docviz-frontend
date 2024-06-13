import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    token_type: string;
  }

  interface User {
    token: string;
    token_type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    token_type: string;
  }
}
