import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/options";
import { INewUser } from "@/types/IUser";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const session = await getServerSession(options);
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


export async function handleInfosUser(session: any) {
    try {
        const response = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();

        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function GetAllStaff(session: any, establishmentId: string | null, role?: string) {
    try {
        let url = process.env.SERVER_API + '/users';
        if (establishmentId) {
            url += `?establishmentId=${establishmentId}`;
        }

        if (role) {
            url += `${establishmentId ? '&' : '?'}role=${role}`;
        }
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export async function GetClientById(session: any, userId: string) {
    try {
        const response = await fetch(process.env.SERVER_API + `/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${session.user.tokens.accessToken}`,
            },
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log(data);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
export async function handleRegister(newUser: INewUser) {
    //const newUser: INewUser = await request.json();
    try {
        const response = await fetch(process.env.SERVER_API + `/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        const data = await response.json()
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
