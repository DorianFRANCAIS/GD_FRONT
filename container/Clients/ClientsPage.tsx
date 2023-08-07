'use client';
import { IUser } from "@/types/IUser";
import { Pagination } from "flowbite-react";
import Link from "next/link";
import { useState } from "react";

function ClientsPage(props: { clients: IUser[] }) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const onPageChange = (page: number) => setCurrentPage(page);
    return (
        <div className="container mx-auto p-6">
            <div className="bg-greyColor w-full p-6 rounded-md ">
                <h1 className="text-2xl font-bold mb-4">Mes clients</h1>
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
                <Pagination
                    currentPage={1}
                    layout="pagination"
                    nextLabel="Suivant"
                    onPageChange={page => { setCurrentPage(page) }}
                    previousLabel="Précèdent"
                    showIcons
                    totalPages={1000}
                    className="text-center mt-4"
                />
            </div>
        </div>
    );
};

export default ClientsPage;