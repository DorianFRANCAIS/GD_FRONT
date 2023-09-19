import { IHolidays, IPostHolidays, IPutHolidays } from "@/types/IHolidays";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const establishmentId = searchParams.get('establishmentId');
    const session = await getServerSession(options);

    const response = await fetch(process.env.SERVER_API + `/holidays?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const holidays: IHolidays = await response.json();

    return NextResponse.json(holidays, { status: 200 })
}

export async function POST(request: Request) {
    const newHoliday: IPostHolidays = await request.json();
    const session = await getServerSession(options);

    const response = await fetch(process.env.SERVER_API + `/holidays`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHoliday),
    });
    const data: IPostHolidays = await response.json();

    return NextResponse.json(data, { status: 200 })
}