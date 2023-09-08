import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
    const session = await getServerSession(options);

    const res = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const user = await res.json()

    return NextResponse.json({ user })
};