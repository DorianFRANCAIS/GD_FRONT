import { IPostActivity } from "@/types/IActivity";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET(session: any, establishmentId: string) {
    const response = await fetch(process.env.SERVER_API + `/activities?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    const data = await response.json();

    return NextResponse.json(data,{status:200})
}

export async function POST(request: Request) {
    const session = await getServerSession(options);
    const newActivity: IPostActivity = await request.json()
        const response = await fetch(process.env.SERVER_API + `/activities`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session?.user.tokens.accessToken}`,
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(newActivity),
        });
        const data = await response.json();
        
        return NextResponse.json(data,{status:200})
}