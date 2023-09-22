import { getServerSession } from "next-auth";
import { options } from "../../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";
import { ISessionReport } from "@/types/ISession";

export async function POST(request: Request, { params }: { params: { sessionId: string } }) {
    const session = await getServerSession(options);
    const report: ISessionReport = await request.json()
    console.log("report", JSON.stringify(report))
    const res = await fetch(process.env.SERVER_API + `/sessions/${params.sessionId}/report`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
    });
    const data: ISessionReport = await res.json()
    console.log("data", data)

    return NextResponse.json(data, { status: 200 })
}