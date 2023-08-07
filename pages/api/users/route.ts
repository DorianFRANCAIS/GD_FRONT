// pages/api/getData.js

import middleware from "@/middleware";
import { INewUser, IUser } from "@/types/IUser";
import { NextRequest, NextResponse } from "next/server";

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
        const response = await fetch(`users/${userId}`, {
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
    console.log('laaa', newUser.emailAddress)
    try {
        const response = await fetch(process.env.SERVER_API + `/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        console.log(response)
        const data = await response.json()
        console.log("new", data)
        return NextResponse.json(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
