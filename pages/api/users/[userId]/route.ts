import { NextResponse } from "next/server";

export async function GET(session: any) {
    const res = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    const userInformations = await res.json();

    return NextResponse.json({ userInformations })
}