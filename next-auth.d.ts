import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            tokens: {
                accessToken: string;
                refreshToken: string;
            },
            user: {
                _id: string;
                firstname: string;
                role: string;
                emailAddress: string;
                phoneNumber: string;
                birthDate: string;
                activities: [],
                registeredAt: string;
                lastConnectionAt: string;
                __v: 0,
                refreshToken: string;
                accessToken: string;
            }
        }
    }
}