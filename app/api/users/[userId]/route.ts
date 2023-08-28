import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    const res = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const user = await res.json()

    return NextResponse.json({ user })
};