import { getServerSession } from "next-auth";
import { IDogs } from "@/types/IDogs";
import DogsPage from "@/container/Dogs/DogsPage";
import { options } from "../api/auth/[...nextauth]/options";
import { IEstablishments } from "@/types/IEstablishments";

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

let establishmentIdWithoutQuotes: string;

async function GetDogs(session: any, establishmentId: string,ownerId?: string) {
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


async function Dogs() {
    const session = await getServerSession(options);
    const establishments: IEstablishments[] = await GetEstablishments(session);
    let dogs: IDogs[] = [];
    if (establishments.length > 0) {
        dogs = await GetDogs(session, establishments[0]._id);
    }
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <DogsPage dogs={dogs} establishments={establishments} />
        </div>
    )
};

export default Dogs;