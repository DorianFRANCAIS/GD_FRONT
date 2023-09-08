import { IHolidays, IPutHolidays } from "@/types/IHolidays";
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
    const holidays = await response.json();

    return NextResponse.json({ holidays })
}

export async function POST(request: Request) {
    const newHoliday: IPutHolidays = await request.json();
    const session = await getServerSession(options);

    const response = await fetch(process.env.SERVER_API + `/holidays`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newHoliday),
    });
    const data = await response.json();

    return NextResponse.json({ data })
}

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const newHolidayValue: IPutHolidays = await request.json();
    const holidayId = searchParams.get('_id');
    const session = await getServerSession(options);

    const response = await fetch(process.env.SERVER_API + `/holidays/${holidayId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
        body: JSON.stringify(newHolidayValue),
    });
    const data = await response.json();

    return NextResponse.json({ data })
}