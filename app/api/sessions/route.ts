import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);
    const body = request.json()
    const res = await fetch(process.env.SERVER_API + `/sessions`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify({ body }),
    });

    const status = await res.json()

    return NextResponse.json({ status })
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const establishmentId = searchParams.get('establishmentId');
    const session = await getServerSession(authOptions);
    const res = await fetch(process.env.SERVER_API + `/sessions/daily?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const sessions = await res.json()

    return NextResponse.json({ sessions })
}
