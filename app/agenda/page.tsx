import AgendaPage from "@/container/Agenda/AgendaPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ISession } from "@/types/ISession";
import { GetSessions } from "@/pages/api/sessions/sessionsApi";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { IEstablishments } from "@/types/IEstablishments";
import { GetAllStaff } from "@/pages/api/users/getUserInformations";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { getActivities } from "@/pages/api/activities/activitiesApi";

async function Agenda(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  const establishments: IEstablishments[] = await handleEstablishments(session);
  const educators: IUser[] = await GetAllStaff(session, null, "Educator");
  let sessions: ISession[] = [];
  const activities: IActivity[] = await getActivities(session);
  if (establishments.length > 0) {
    sessions = await GetSessions(session, { establishmentId: establishments[0]._id });

  }

  return (
    <div className="h-screen">
      <AgendaPage sessions={sessions} educators={educators} activities={activities} establishments={establishments} />
    </div>
  )
};

export default Agenda;