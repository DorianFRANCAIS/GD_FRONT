import ClientsPage from "@/container/Clients/ClientsPage";
import { getServerSession } from "next-auth";
import { IUser } from "@/types/IUser";
import { options } from "../api/auth/[...nextauth]/options";
import { IEstablishments } from "@/types/IEstablishments";

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
    return response.json();
}

async function GetClients(session: any) {
    let establishmentId = session.user.user.establishments[0];
    const response = await fetch(process.env.SERVER_API + `/users/establishments/${establishmentId}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
    return await response.json();
}



async function Clients(): Promise<JSX.Element> {
    const session = await getServerSession(options);
    const establishmentsData: Promise<IEstablishments[]> = await GetEstablishments(session);
    const clientsData: Promise<IUser[]> = await GetClients(session);
    const [establishment, clients] = await Promise.all([establishmentsData, clientsData]);
    return (
        <div className="h-screen">
            <ClientsPage clients={clients} establishments={establishment} />
        </div>
    )
}

export default Clients;