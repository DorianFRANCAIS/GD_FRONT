import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { IPostSession } from "@/types/ISession";

export async function POST(request: Request) {
    const session = await getServerSession(options);
    const newSession: IPostSession = await request.json()
    const res = await fetch(process.env.SERVER_API + `/sessions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSession),
    });
    const data: IPostSession = await res.json()

    return NextResponse.json(data, { status: 200 })
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const establishmentId = searchParams.get('establishmentId');
    const session = await getServerSession(options);
    const res = await fetch(process.env.SERVER_API + `/sessions/daily?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const sessions = await res.json()

    return NextResponse.json({ sessions })
}
