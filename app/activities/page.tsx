import { getServerSession } from "next-auth";
import { IEstablishments } from "../establishments/page";
import handleEstablishments from "@/pages/api/establishments/route";
import { getActivities } from "@/pages/api/activities/route";
import { IActivity } from "@/types/IActivity";
import ActivitiesPage from "@/container/Activities/ActivitiesPage";
import { options } from "../api/auth/[...nextauth]/options";


async function Activities(): Promise<JSX.Element> {
    const session = await getServerSession(options);
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