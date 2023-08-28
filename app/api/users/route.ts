import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const session = await getServerSession(authOptions);
    const establishmentId = searchParams.get('establishmentId');
    const role = searchParams.get('role');

    let url = process.env.SERVER_API + '/users';
    if (establishmentId) {
        url += `?establishmentId=${establishmentId}`;
    }
    if (role) {
        url += `${establishmentId ? '&' : '?'}role=${role}`;
    }

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    const users = await res.json();

    return NextResponse.json({ users })

}