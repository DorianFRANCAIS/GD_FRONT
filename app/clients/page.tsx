import ClientsPage from "@/container/Clients/ClientsPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { getServerSession } from "next-auth";
import { IEstablishments } from "../establishments/page";
import { GetAllStaff } from "@/pages/api/users/route";
import { IUser } from "@/types/IUser";

async function Clients(): Promise<JSX.Element> {
    const session = await getServerSession(authOptions);
    const establishment: IEstablishments = await handleEstablishments(session);
    let clients: IUser[] = [];
    if (establishment) {
        clients = await GetAllStaff(session, establishment._id, "Client");
    }

    console.log(clients)
    return (
        <div className="h-screen">
            <ClientsPage clients={clients} />
        </div>
    )
}

export default Clients;