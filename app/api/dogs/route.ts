import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";

let establishmentIdWithoutQuotes: string;
export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const establishmentId = searchParams.get('establishmentId');
    const ownerId = searchParams.get('ownerId');
    console.log("establishmentId", establishmentId);
    let url = process.env.SERVER_API + `/dogs`;
    if (establishmentId) {
        establishmentIdWithoutQuotes = establishmentId.replace(/"/g, "");
        url += `?establishmentId=${establishmentIdWithoutQuotes}`;
    }
    if (ownerId) {
        url += `?ownerId=${ownerId}`;
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const dogs = await response.json();
    return NextResponse.json({ dogs })
}