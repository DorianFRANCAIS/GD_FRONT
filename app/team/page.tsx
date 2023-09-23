import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";
import TeamPage from "@/container/Team/TeamPage";
import { options } from "../api/auth/[...nextauth]/options";

async function GetStaff(session: any, establishmentId: string) {
    const res = await fetch(process.env.SERVER_API + `/users?establishmentId=${establishmentId}&role=Educator`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return res.json();
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

async function GetActivity(session: any, activityId: string) {
    const response = await fetch(process.env.SERVER_API + `/activities?activityId=${activityId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}
async function Team() {
    const session = await getServerSession(options);
    let employees: IUser[] = [];
    let activityTab: IActivity[] = [];
    const establishments: IEstablishments[] = await GetEstablishments(session);
    if (establishments.length > 0) {
        employees = await GetStaff(session, establishments[0]._id);
        employees.forEach(async employee => {

            activityTab = await GetActivity(session, employee._id);
        });
    }

    return (
        <TeamPage employees={employees} activityTab={activityTab} establishments={establishments} />
    )
};

export default Team;