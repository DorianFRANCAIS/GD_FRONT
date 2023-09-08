import AgendaPage from "@/container/Agenda/AgendaPage";
import { getServerSession } from "next-auth";
import { ISession } from "@/types/ISession";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { options } from "../api/auth/[...nextauth]/options";

async function GetEstablishments(session: any) {
  let ownerId: string = '';
  if (session) {
      ownerId = session.user.user._id;
  }
      const response = await fetch(process.env.SERVER_API + `/establishments?ownerId=${ownerId}`, {
          headers: {
              Authorization: `Bearer ${session.user.tokens.accessToken}`,
          },
      });
      return await response.json();
}

async function GetStaff(session: any, establishmentId: string | null, role?: string) {
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
   return await response.json();
}

async function GetSessions(session: any, params: any) {
    let url = process.env.SERVER_API + `/sessions`;
    if (params.establishmentId) {
      url += `?establishmentId=${params.establishmentId}`;
    }
    if (params.clientId) {
      url += `?educatorId=${params.clientId}`;
    }
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.tokens.accessToken}`,
      },
    });
    return await response.json();
}

async function GetActivities(session: any, establishmentId: string) {
  const response = await fetch(process.env.SERVER_API + `/activities?establishmentId=${establishmentId}`, {
      headers: {
          Authorization: `Bearer ${session.user.tokens.accessToken}`,
      },
  });
  return await response.json();
}

async function Agenda(): Promise<JSX.Element> {
  const session = await getServerSession(options);
  const establishments: IEstablishments[] = await GetEstablishments(session);
  const educators: IUser[] = await GetStaff(session, null, "Educator");
  let sessions: ISession[] = [];
  let activities: IActivity[] = [];
  if (establishments.length > 0) {
    sessions = await GetSessions(session, { establishmentId: establishments[0]._id });
    activities = await GetActivities(session, establishments[0]._id);
  }
  

  return (
    <div className="h-screen">
      <AgendaPage sessions={sessions} educators={educators} activities={activities} establishments={establishments} />
    </div>
  )
};

export default Agenda;