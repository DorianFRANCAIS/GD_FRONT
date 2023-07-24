import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { handleDogs } from "@/pages/api/dogs/dogsApi";
import { IEstablishments } from "../establishments/page";
import handleEstablishments from "@/pages/api/establishments/establishmentsApi";
import { IDogs } from "@/types/IDogs";



async function Dogs() {
    const session = await getServerSession(authOptions);
    const establishments: IEstablishments[] = await handleEstablishments(session);
    let dogs: IDogs[] = [];
    if (establishments.length > 0) {
        dogs = await handleDogs(session, establishments[0]._id);
    }
    console.log(dogs)
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <h3 className="text-mainColor text-3xl font-bold mb-2">Chiens de l'établissement</h3>
                <div className="flex max-sm:flex-col gap-x-8 w-full">
                    {dogs && dogs.map((dog, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-4 max-w-md">
                            <img
                                src={dog?.imageUrl ? dog?.imageUrl : "/img/avatar.svg"}
                                alt="Profile"
                                className="h-40 w-80 "
                            />
                            <p className="text-xl text-mainColor font-bold mb-2">Nom : {dog.name}</p>
                            <p className="text-xs text-mainColor font-bold">ID national : {dog.nationalId}</p>
                            <p className="text-xs text-mainColor font-bold">Sexe : {dog.gender}</p>
                            <p className="text-xs text-mainColor font-bold">Race : {dog.breed}</p>
                            <p className="text-xs text-mainColor font-bold">Poids : {dog.weight} kg</p>
                            <p className="text-xs text-mainColor font-bold mb-4">Taille : {dog.height} cm</p>
                            <button className="btn w-full text-white px-4 py-2">Voir la fiche client</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Dogs;