import ClientsPage from "@/container/Clients/ClientsPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import handleEstablishments from "@/pages/api/establishments/route";
import { getServerSession } from "next-auth";
import { IEstablishments } from "../establishments/page";
import { GetAllStaff } from "@/pages/api/users/route";
import { IUser } from "@/types/IUser";

async function GetClients(session: any, establishmentId: string) {
    const res = await fetch(process.env.SERVER_API + `/users/${session?.user.user._id}`, {
        headers: {
            Authorization: `Bearer ${session.user.tokens.accessToken}`,
        },
    });
}

async function Clients(): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);
    const establishment: IEstablishments = await handleEstablishments(session);
    let clients: IUser[] = [];
    if (establishment) {
        clients = await GetAllStaff(session, establishment._id, "Client");
    }

    return (
        <div className="h-screen">
            <ClientsPage clients={clients} />
        </div>
    )
}

export default Clients;