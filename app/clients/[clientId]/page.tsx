import ClientByIdPage from "@/container/Clients/client/ClientByIdPage";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetClientById } from "@/pages/api/users/route";
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

    const client = await clientData;
    console.log(client)
    return (
        <div>
            <ClientByIdPage client={client} />
        </div>
    )
};

export default Client;