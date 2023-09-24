import { IPutSession } from "@/types/ISession";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../../auth/[...nextauth]/options";

export async function PUT(request: Request, { params }: { params: { sessionId: string } }) {
    const newStatus: string = await request.json();
    const session = await getServerSession(options);
    const response = await fetch(process.env.SERVER_API + `/sessions/${params.sessionId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStatus),
    });
    const data = await response.json();

    return NextResponse.json({ data })
}