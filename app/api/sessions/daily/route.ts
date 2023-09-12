import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const establishmentId = searchParams.get('establishmentId');
    const date = searchParams.get('date');
    const session = await getServerSession(options);
    const res = await fetch(process.env.SERVER_API + `/sessions/daily?establishmentId=${establishmentId}&date=${date}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        }
    });
    const dailySessions = await res.json();

    return NextResponse.json({ dailySessions })
}