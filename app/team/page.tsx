import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";
import TeamPage from "@/container/Team/TeamPage";
import { options } from "../api/auth/[...nextauth]/options";

async function GetStaff(session: any) {
    let url = process.env.SERVER_API + '/users';
    let establishmentId = session.user.user.establishments[0];
    if (establishmentId) {
        url += `?establishmentId=${establishmentId}`;
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function GetEstablishments(session: any) {
    let url:string = '';

    if (session.user.user.role === "Manager") {
        url = process.env.SERVER_API + `/establishments?ownerId=${session.user.user._id}`
    }else {
        url = process.env.SERVER_API + `/establishments?clientId=${session.user.user._id}`
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return response.json();
}

async function Team() {
    const session = await getServerSession(options);
    let employees: IUser[] = [];
    const establishments: IEstablishments[] = await GetEstablishments(session);
    if (session?.user.user.role === 'Manager') {
        employees = await GetStaff(session);
    }
    
    return (
        <TeamPage employees={employees} establishments={establishments} />
    )
};

export default Team;