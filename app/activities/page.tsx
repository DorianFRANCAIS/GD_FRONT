import { getServerSession } from "next-auth";
import { IEstablishments } from "../establishments/page";
import { IActivity } from "@/types/IActivity";
import ActivitiesPage from "@/container/Activities/ActivitiesPage";
import { options } from "../api/auth/[...nextauth]/options";

async function GetEstablishments(session: any) {
    let url:string = '';
    if (session.user.user.role === "Administrator") {
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

async function GetActivities(session: any, establishmentId: string) {
    const response = await fetch(process.env.SERVER_API + `/activities?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function Activities(): Promise<JSX.Element> {
    const session = await getServerSession(options);
    const establishments: IEstablishments[] = await GetEstablishments(session);
    let activities: IActivity[] = [];
    if (establishments.length > 0) {
        activities = await GetActivities(session, establishments[0]._id);
    }
    return (
        <div className="h-screen">
            <ActivitiesPage activities={activities} establishments={establishments} />
        </div>
    )
};

export default Activities;