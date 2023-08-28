import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/route";
import { IEstablishments } from "../establishments/page";
import handleEstablishments from "@/pages/api/establishments/route";
import { IDogs } from "@/types/IDogs";
import DogsPage from "@/container/Dogs/DogsPage";



async function Dogs() {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    let dogs: IDogs[] = [];
    if (establishments.length > 0) {
        dogs = await handleDogs(session, establishments[0]._id);
    }
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <DogsPage dogs={dogs} establishments={establishments} />
        </div>
    )
};

export default Dogs;