import { getServerSession } from "next-auth";
import { IActivity } from "@/types/IActivity";
import ActivitiesPage from "@/container/Activities/ActivitiesPage";
import { options } from "../api/auth/[...nextauth]/options";
import { IEstablishments } from "@/types/IEstablishments";

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

async function GetActivities(session: any) {
    let establishmentId = session.user.user.establishments[0];
    const response = await fetch(process.env.SERVER_API + `/activities?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function Activities(): Promise<JSX.Element> {
    const session = await getServerSession(options);
    let establishments: IEstablishments[] = [];
    let activities: IActivity[] = [];
    activities = await GetActivities(session);
    if(session?.user.user.role === 'Manager') {
        establishments = await GetEstablishments(session);
    }
    return (
        <div className="h-screen">
            <ActivitiesPage activities={activities} establishments={establishments} />
        </div>
    )
};

export default Activities;