import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { sessionId: string } }) {
    const session = await getServerSession(options);
    console.log(params.sessionId)
    const response = await fetch(process.env.SERVER_API + `/sessions/${params.sessionId}/remaining-places`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const remainingPlaces = await response.json();

    console.log(remainingPlaces)
    return NextResponse.json({ remainingPlaces })
}