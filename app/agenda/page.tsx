import AgendaPage from "@/container/Agenda/AgendaPage";
import { getServerSession } from "next-auth";
import { ISession } from "@/types/ISession";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { IActivity } from "@/types/IActivity";
import { options } from "../api/auth/[...nextauth]/options";

async function GetEstablishments(session: any) {
  let url: string = '';
  if (session.user.user.role === "Manager") {
    url = process.env.SERVER_API + `/establishments?ownerId=${session.user.user._id}`
  } else {
    url = process.env.SERVER_API + `/establishments?clientId=${session.user.user._id}`
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.tokens.accessToken}`,
    },
  });
  return await response.json();
}

async function GetStaff(session: any, role?: string) {
  let url = process.env.SERVER_API + '/users';
  let establishmentId = session.user.user.establishments[0];
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

async function GetSessions(session: any) {
  let url = process.env.SERVER_API + `/sessions`;
  let establishmentId = session.user.user.establishments[0];
  if (session.user.user.role === 'Manager' || session.user.user.role === 'Educator') {
    url += `?establishmentId=${establishmentId}`;
  }
  if (session.user.user.role === 'Client') {
    url += `?educatorId=${establishmentId}`;
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.user.tokens.accessToken}`,
    },
  });
  return await response.json();
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

async function Agenda(): Promise<JSX.Element> {
  const session = await getServerSession(options);
  const establishments: IEstablishments[] = await GetEstablishments(session);
  let educators: IUser[] = [];
  if(session?.user.user.role === 'Manager') {
    educators = await GetStaff(session,"Educator");
  }
  let sessions: ISession[] = [];
  let activities: IActivity[] = [];
  sessions = await GetSessions(session);
  activities = await GetActivities(session);
  
  return (
    <div className="h-screen">
      <AgendaPage sessions={sessions} educators={educators} activities={activities} establishments={establishments} />
    </div>
  )
};

export default Agenda;