import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IEstablishments } from "../establishments/page";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { getActivities } from "@/pages/api/activities/activitiesApi";
import { IActivity } from "@/types/IActivity";
import ActivitiesPage from "@/container/Activities/ActivitiesPage";


async function Activities(): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    let activities: IActivity[] = [];
    if (establishments.length > 0) {
        activities = await getActivities(session, establishments[0]._id);
    }
    return (
        <div className="h-screen">
            <ActivitiesPage activities={activities} establishments={establishments} />
        </div>
    )
};

export default Activities;