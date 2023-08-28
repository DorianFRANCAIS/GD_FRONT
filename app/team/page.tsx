import { getActivitiesById } from "@/pages/api/activities/route";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import handleEstablishments from "@/pages/api/establishments/route";
import { GetAllStaff } from "@/pages/api/users/route";
import { IActivity } from "@/types/IActivity";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";
import TeamPage from "@/container/Team/TeamPage";

async function GetStaff(session: any, establishmentId: string) {
    const res = await fetch(process.env.SERVER_API + `/users?establishmentId=${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return res.json();
}
async function Team() {
    const session = await getServerSession(authOptions);
    let employees: IUser[] = [];
    let activityTab: IActivity[] = [];
    const establishments: IEstablishments[] = await handleEstablishments(session);
    if (establishments.length > 0) {
        employees = await GetStaff(session, establishments[0]._id);
        employees.forEach(async employee => {

            activityTab = await getActivitiesById(session, employee._id);
        });
    }

    return (
        <TeamPage employees={employees} activityTab={activityTab} />
    )
};

export default Team;