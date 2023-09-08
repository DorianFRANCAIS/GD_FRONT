import ClientsPage from "@/container/Clients/ClientsPage";
import { getServerSession } from "next-auth";
import { IEstablishments } from "../establishments/page";
import { IUser } from "@/types/IUser";
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

async function GetClients(session: any, establishmentId: string | null, role?: string) {
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



async function Clients(): Promise<JSX.Element> {
    const session = await getServerSession(options);
    const establishment: IEstablishments = await GetEstablishments(session);
    let clients: IUser[] = [];
    if (establishment) {
        clients = await GetClients(session, establishment._id, "Client");
    }

    return (
        <div className="h-screen">
            <ClientsPage clients={clients} />
        </div>
    )
}

export default Clients;