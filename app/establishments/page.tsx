'use client';
import { axiosClient } from "@/utils/apiClient";
import { useEffect, useState } from "react";

export interface IEstablishments {
    address: string;
    emailAddress: string;
    employees: [object];
    name: string;
    owner: [object];
    phoneNumber: string;
    schedules: [object];
}

export default function EtablishmentPage() {
    const establishments = [
        { id: 1, name: 'Dog Paradise', location: 'City A' },
        { id: 2, name: 'Paws Inn', location: 'City B' },
        { id: 3, name: 'Canine Haven', location: 'City C' },
        { id: 4, name: 'Bark Avenue', location: 'City D' },
        { id: 5, name: 'Woof World', location: 'City E' },
        { id: 6, name: 'Puppy Palace', location: 'City F' },
        { id: 7, name: 'Tail Waggers', location: 'City G' },
        { id: 8, name: 'Paw Prints', location: 'City H' },
        { id: 9, name: 'Doggie Delight', location: 'City I' },
    ];
    const [estasblishments, setEstablishments] = useState<IEstablishments[]>([]);

    useEffect(() => {
        const fetchEstablishments = async () => {
            try {
                const response = await axiosClient.get('/establishments')
                if (response) {
                    setEstablishments(response.data)
                }
                return response
            } catch (error) {
                throw error;
            }
        }
        fetchEstablishments()

    }, [])
    return (
        <div className="bg-primary min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full mx-auto">
                <h1 className="text-4xl font-bold mb-8">Vos établissements</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    {estasblishments && estasblishments.map((establishment, idx) => (
                        <div key={idx} className="bg-white rounded-lg shadow-lg px-6 py-4 w-full">
                            <h2 className="text-lg font-medium text-center text-gray-800">{establishment.name}</h2>
                            <p className="text-gray-500"></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}