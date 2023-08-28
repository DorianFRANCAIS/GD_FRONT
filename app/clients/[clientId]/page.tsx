import ClientByIdPage from "@/container/Clients/client/ClientByIdPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/route";
import handleEstablishments from "@/pages/api/establishments/route";
import { GetClientById } from "@/pages/api/users/route";
import { IDogs } from "@/types/IDogs";
import { IEstablishments } from "@/types/IEstablishments";
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
    const [client, dogs] = await Promise.all([clientData, dogsData]);

    return (
        <div>
            <ClientByIdPage client={client} dogs={dogs} establishments={establishments} />
        </div>
    )
};

export default Client;