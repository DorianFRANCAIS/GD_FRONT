import AgendaPage from "@/container/Agenda/AgendaPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { ISession } from "@/types/ISession";
import { GetSessions } from "@/pages/api/sessions/sessionsApi";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { IEstablishments } from "@/types/IEstablishments";

async function Agenda(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  const establishments: IEstablishments[] = await handleEstablishments(session);
  let sessions: ISession[] = [];
  if(establishments.length > 0) {
     sessions = await GetSessions(session, { establishmentId: establishments[0]._id });
  }

  return (
    <AgendaPage sessions={sessions}/>
  )
};

export default Agenda;