import { options } from "@/app/api/auth/[...nextauth]/options";
import { IEstablishmentsNewEmployee } from "@/types/IEstablishments";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: { establishmentId: string } }) {
    const session = await getServerSession(options);

    const newEmployee: IEstablishmentsNewEmployee = await request.json()
    console.log(newEmployee)
    const response = await fetch(process.env.SERVER_API + `/establishments/${params.establishmentId}/newEmployee`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(newEmployee),
    });
    const data = await response.json();
    return NextResponse.json(data, { status: 200 })
}