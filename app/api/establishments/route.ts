import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
    const session = await getServerSession(options);
    let ownerId: string = '';
    if (session) {
        ownerId = session.user.user._id;
    }
        const response = await fetch(process.env.SERVER_API + `/establishments?ownerId=${ownerId}`, {
            headers: {
                Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            },
        });
    const data = await response.json();

    return NextResponse.json(data,{status:200})
}