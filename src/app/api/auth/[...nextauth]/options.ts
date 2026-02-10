import { prisma } from "@prisma/index";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare, compareSync } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    //@ts-ignore
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials || !credentials.username || !credentials.password) {
                    throw new Error("Missing credentials")
                }

                const user = await prisma.user.findFirst({
                    where: {
                        username: credentials.username,
                    }
                })

                if (!user) {
                    throw Error("User not found")
                }

                if (!user.email_verified) {
                    throw Error("Please verify user before loggin in")
                }
                
                const passwordMatch = await compare(credentials.password, user.password)

                if(!passwordMatch){
                    throw Error("Wrong password")
                }

                return user
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id.toString();
                token.email_verified = user.email_verified;
                token.username = user.username;
            }
            return token
        },

        async session({ token, session }) {
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.email_verified = token.email_verified as boolean;
                session.user.username = token.username as string;
            }

            return session
        },
    },
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/signin'
    }
}