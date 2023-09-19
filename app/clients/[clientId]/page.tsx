import { options } from "@/app/api/auth/[...nextauth]/options";
import ClientByIdPage from "@/container/Clients/client/ClientByIdPage";
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
async function GetClient(session: any, userId: string) {
    const response = await fetch(process.env.SERVER_API + `/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();

}
let establishmentIdWithoutQuotes: string;
async function GetDogs(session: any, establishmentId?: string | null, ownerId?: string) {
    let url = process.env.SERVER_API + `/dogs`;
    if (establishmentId) {
        establishmentIdWithoutQuotes = establishmentId.replace(/"/g, "");
        url += `?establishmentId=${establishmentIdWithoutQuotes}`;
    }
    if (ownerId) {
        url += `?ownerId=${ownerId}`;
    }
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session?.user.tokens.accessToken}`,
        },
    });
    return await response.json();
};
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

async function GetSessions(session: any, params: any) {
    let url = process.env.SERVER_API + `/sessions`;
    if (params.establishmentId) {
        url += `?establishmentId=${params.establishmentId}`;
    }
    if (params.clientId) {
        url += `?educatorId=${params.clientId}`;
    }
    console.log("url", url)
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}

async function Client({ params: { clientId } }: Params) {
    const session = await getServerSession(options);
    const clientData: Promise<IUser> = GetClient(session, clientId);
    const dogsData: Promise<IDogs[]> = await GetDogs(session, null, clientId);
    const establishments: IEstablishments[] = await GetEstablishments(session);
    const clientSessionsData: Promise<ISession[]> = await GetSessions(session, { clientId: clientId })
    const [client, dogs, clientSessions] = await Promise.all([clientData, dogsData, clientSessionsData]);

    return (
        <div>
            <ClientByIdPage client={client} dogs={dogs} establishments={establishments} clientSessions={clientSessions} />
        </div>
    )
};

export default Client;