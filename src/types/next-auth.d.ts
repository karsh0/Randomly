import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email_verified: boolean;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email_verified: boolean;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    username: string;
    email_verified: boolean;
  }
}
