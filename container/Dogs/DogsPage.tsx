'use client';
import { IDogs } from "@/types/IDogs";
import { IEstablishmentsSelect } from "@/types/IEstablishments";
import { useSession } from "next-auth/react";
import Link from "next/link";

function DogsPage(props: { dogs: IDogs[], establishments: IEstablishmentsSelect[] }) {
    const {data:session} = useSession();
    return (
        <div className="flex justify-center items-start gap-x-12 w-full">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex justify-start">
                    <h3 className="text-mainColor text-3xl font-bold mb-2">{session?.user.user.role !== 'Client' ? "Chiens de l'établissement":"Mes chiens"}</h3>
                </div>
                <div className="flex max-sm:flex-col gap-x-8 w-full">
                    {props.dogs && props.dogs.map((dog, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-4 max-w-md">
                            <img
                                src={dog?.imageUrl ? dog?.imageUrl : "/img/avatar.svg"}
                                alt="Profile"
                                className="h-28 w-full"
                            />
                            <p className="text-xl text-mainColor font-bold mb-2">Nom : {dog.name}</p>
                            <p className="text-xs text-mainColor font-bold">ID national : {dog.nationalId}</p>
                            <p className="text-xs text-mainColor font-bold">Sexe : {dog.gender}</p>
                            <p className="text-xs text-mainColor font-bold">Race : {dog.breed}</p>
                            <p className="text-xs text-mainColor font-bold">Poids : {dog.weight} kg</p>
                            <p className="text-xs text-mainColor font-bold mb-4">Taille : {dog.height} cm</p>
                            {session?.user.user.role !== 'Client' &&
                            <Link href={"clients/" + dog.owner._id} className="btn w-full text-white px-4 flex justify-center py-2">Voir la fiche client</Link>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DogsPage;