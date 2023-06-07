import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const backendURL = process.env.SERVER_API;

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                emailAddress: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { emailAddress, password } = credentials as any;

                const res = await fetch(backendURL + "/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        emailAddress,
                        password
                    }),
                });
                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {

            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token as any;

            return session;
        },
    },
    pages: {
        signIn: '/login',
    },
};

export default NextAuth(authOptions);