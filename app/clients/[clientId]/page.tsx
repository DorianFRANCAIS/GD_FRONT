import ClientByIdPage from "@/container/Clients/client/ClientByIdPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/route";
import handleEstablishments from "@/pages/api/establishments/route";
import { GetSessions } from "@/pages/api/sessions/route";
import { GetClientById } from "@/pages/api/users/route";
import { IDogs } from "@/types/IDogs";
import { IEstablishments } from "@/types/IEstablishments";
import { ISession } from "@/types/ISession";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";

type Params = {
    params: {
        clientId: string;
    }
}
async function Client({ params: { clientId } }: Params) {
    const session = await getServerSession(authOptions);
    const clientData: Promise<IUser> = GetClientById(session, clientId);
    const dogsData: Promise<IDogs[]> = await handleDogs(session, null, clientId);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    const clientSessionsData: Promise<ISession[]> = await GetSessions(session, { clientId: clientId })
    const [client, dogs, clientSessions] = await Promise.all([clientData, dogsData, clientSessionsData]);

    return (
        <div>
            <ClientByIdPage client={client} dogs={dogs} establishments={establishments} clientSessions={clientSessions} />
        </div>
    )
};

export default Client;