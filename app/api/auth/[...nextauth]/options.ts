import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const backendURL = process.env.SERVER_API;

async function refreshAccessToken(session: any) {
    try {

        const response = await fetch(backendURL + "/users/refresh", {
            headers: {
                Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            },
        })

        const refreshedTokens = await response.json()

        if (!response.ok) {
            throw refreshedTokens
        }

        return {
            ...session,
            accessToken: refreshedTokens.access_token,
            accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
            refreshToken: refreshedTokens.refresh_token ?? session.refreshToken, // Fall back to old refresh token
        }
    } catch (error) {
        console.log(error)

        return {
            ...session,
            error: "RefreshAccessTokenError",
        }
    }
}

export const options: NextAuthOptions = {
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

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Vérifiez si l'objet user existe et contient la propriété jwt
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    session: {
        strategy: "jwt",
    }
}