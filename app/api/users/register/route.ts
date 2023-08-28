import { INewUser } from "@/types/IUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const newUser: INewUser = await request.json();

    const response = await fetch(process.env.SERVER_API + `/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    const data = await response.json()

    return NextResponse.json({ data })
}