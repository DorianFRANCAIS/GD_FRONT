import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetClientById } from "@/pages/api/users/route";
import { IUser } from "@/types/IUser";
import { getServerSession } from "next-auth";

type Params = {
    params:  {
        clientId: string;
    }
}
async function ClientPage({params:{clientId}}:Params) {
    const session = await getServerSession(authOptions);
    const client: IUser = await GetClientById(session,clientId);
    return (
        <div>
            {client.firstname}
        </div>
    )
};

export default ClientPage;