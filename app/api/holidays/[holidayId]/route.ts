import { IPutHolidays } from "@/types/IHolidays";
import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { holidayId: string } }) {
    const newHolidayValue: IPutHolidays = await request.json();
    const session = await getServerSession(options);
    const response = await fetch(process.env.SERVER_API + `/holidays/${params.holidayId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHolidayValue),
    });
    const data = await response.json();

    return NextResponse.json({ data })
}