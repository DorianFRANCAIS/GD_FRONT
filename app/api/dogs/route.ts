import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { IPostDog } from "@/types/IDogs";

let establishmentIdWithoutQuotes: string;

export async function GET(request: Request) {
    const session = await getServerSession(options);
    const { searchParams } = new URL(request.url);
    const establishmentId = searchParams.get('establishmentId');
    const ownerId = searchParams.get('ownerId');

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

export async function POST(request: Request) {
    const session = await getServerSession(options);
    const newDog: IPostDog = await request.json()
    const response = await fetch(process.env.SERVER_API + `/dogs`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDog),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 })
}