'use client';
import NewClientModal from "@/components/modal/NewClientModal";
import { IEstablishments } from "@/types/IEstablishments";
import { IUser } from "@/types/IUser";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

function ClientsPage(props: { clients: IUser[], establishments: IEstablishments[] }) {
    const [isModalClientOpen, setIsModalClientOpen] = useState<boolean>(false);
    const { data: session } = useSession();

    const openModalClient = (e: any) => {
        e.preventDefault()
        setIsModalClientOpen(true)
    }

    const closeModalClient = () => {
        setIsModalClientOpen(false);
    };
    return (
        <div className="container mx-auto p-6">
            {isModalClientOpen && <NewClientModal isModalClientOpen={isModalClientOpen} closeModalClient={closeModalClient} establishments={props.establishments} />}
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <div className="flex justify-between mb-2">
                    <h1 className="text-3xl text-mainColor font-bold mb-6">Mes clients</h1>
                    {session && session.user.user.role === "Manager" &&
                        <button onClick={openModalClient} className="btn text-white px-4 py-2" type="button">
                            Ajouter un client
                        </button>
                    }
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="text-left font-bold">
                                <th className="px-6 py-4">Nom</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Téléphone</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {props.clients && props.clients.map((client, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">

                                    <td className="px-6 py-4">{client.firstname} {client.lastname}</td>
                                    <td className="px-6 py-4">{client.emailAddress}</td>
                                    <td className="px-6 py-4">{client.phoneNumber}</td>
                                    <td><Link className="text-mainColor font-bold" href={`/clients/${client._id}`}>Voir la fiche</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientsPage;