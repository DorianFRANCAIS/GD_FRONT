import { getActivitiesById } from "@/pages/api/activities/activitiesApi";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { GetAllStaff } from "@/pages/api/users/route";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";
import Activities from "../activities/page";
import TeamPage from "@/container/Team/TeamPage";

async function Team() {
    const session = await getServerSession(authOptions);
    let employees: IUser[] = [];
    let activityTab: IActivity[] = [];
    const establishments: IEstablishments[] = await handleEstablishments(session);
    if (establishments.length > 0) {
        employees = await GetAllStaff(session, establishments[0]._id);
        employees.forEach(async employee => {

            activityTab = await getActivitiesById(session, employee._id);
            console.log(activityTab);
        });
    }

    return (
        <TeamPage employees={employees} activityTab={activityTab} />
    )
};

export default Team;