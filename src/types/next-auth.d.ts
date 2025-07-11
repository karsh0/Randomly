import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email_verified: boolean;
    };
  }

  interface User {
    id: string;
    username: string;
    email_verified: boolean;
  }

  interface JWT {
    id: string;
    username: string;
    email_verified: boolean;
  }

  interface Token{
    
  }

}
